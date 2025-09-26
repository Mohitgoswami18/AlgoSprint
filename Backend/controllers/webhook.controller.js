import { Webhook } from "svix";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const secret = process.env.WEBHOOK_SECRET;

const generateRandomUsername = () => {
  return `user-${Math.floor(1000 + Math.random() * 9000)}`;
};

const webhookHandler = async (req, res) => {
  try {
    console.log("The webhook is being prepared");
    const payload =
      typeof req.body === "string" ? req.body : JSON.stringify(req.body);
    console.log("Webhook payload:", payload);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const wh = new Webhook(secret);
    const evt = wh.verify(payload, headers);

    const { data, type } = evt;
    console.log("Event type:", type);

    if (type === "user.created") {
      const { email_addresses, id, image_url, username } = data;
      console.log("Username:", username);

      const email = email_addresses?.[0]?.email_address;

      if (!email || !id) {
        return res
          .status(400)
          .json(new ApiResponse("error", "Missing required user information"));
      }

      const existingUser = await User.findOne({ clerkId: id });
      if (existingUser) {
        return res
          .status(200)
          .json(new ApiResponse("success", "User already exists"));
      }

      const user = await User.create({
        clerkId: id,
        email: email,
        profilePicture: image_url || null,
        username: username || generateRandomUsername(),
      });

      return res
        .status(200)
        .json(new ApiResponse("success", "User created successfully", {user}));
    }

    if (type === "user.updated") {
      const {
        id: clerkId,
        username,
        email_addresses,
        image_url,
      } = data;

      console.log("Processing user.updated:", { clerkId, username });

      try {
        const updateFields = {};

        if (username !== undefined) updateFields.username = username;
        if (email_addresses?.[0]?.email_address)
          updateFields.email = email_addresses[0].email_address;
        if (image_url !== undefined) updateFields.profilePicture = image_url;

        updateFields.updatedAt = new Date();

        const updatedUser = await User.findOneAndUpdate(
          { clerkId },
          { $set: updateFields },
          {
            new: true,
            upsert: false, // Don't create if doesn't exist - user.created should handle creation
          }
        );

        if (!updatedUser) {
          console.log("⚠️ User not found for update:", clerkId);
          return res
            .status(404)
            .json(new ApiResponse("error", "User not found"));
        }

        console.log("✅ User updated in database:", {
          clerkId,
          username: updatedUser.username,
        });

        return res
          .status(200)
          .json(new ApiResponse("success", "User updated successfully"));
      } catch (error) {
        console.error("❌ Error updating user:", error);
        throw error;
      }
    }

    // Handle other event types
    return res
      .status(200)
      .json(new ApiResponse("success", "Event received but not processed"));
  } catch (error) {
    console.error("Webhook error:", error);

    if (error.message?.includes("Webhook signature verification failed")) {
      return res
        .status(400)
        .json(new ApiResponse("error", "Invalid webhook signature"));
    }

    return res
      .status(500)
      .json(new ApiResponse("error", "Internal Server Error"));
  }
};

export default webhookHandler;
