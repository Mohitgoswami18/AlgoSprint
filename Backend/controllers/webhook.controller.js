import { Webhook } from "svix";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { set } from "mongoose";

const secret = process.env.WEBHOOK_SECRET;

const genrateRandomUsername = () => {
  return `user-${Math.floor(1000 + Math.random() * 9000)}`;
}

const webhookHandler = async (req, res) => {
  try {
    console.log("The webhook is beign prepared")
    const payload = req.body.toString();
    console.log("Webhook payload:", payload);
    const header = req.headers;

    const headers = {
      "svix-id": header["svix-id"],
      "svix-timestamp": header["svix-timestamp"],
      "svix-signature": header["svix-signature"],
    };

    const wh = new Webhook(secret);
    const evt = wh.verify(payload, headers);

    const { data, type } = evt;
    console.log("Event type:", type);

    if (type === "user.created") {
      const { email_addresses, id, image_url} = data;
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

      await User.create({
        clerkId: id,
        email: email,
        profilePicture: image_url || null,
        username: genrateRandomUsername()
      });

      return res
        .status(200)
        .json(new ApiResponse("success", "Webhook processed successfully"));
    }

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
