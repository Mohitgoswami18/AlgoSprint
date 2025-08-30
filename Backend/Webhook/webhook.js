import { Webhook } from "svix";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const secret = process.env.WEBHOOK_SECRET;

const webhookHandler = async (req, res) => {
  try {
    const headers = req.headers;
    const payload = req.body;

    const wh = new Webhook(secret);
    const evt = wh.verify(JSON.stringify(payload), headers);

    const { data, type } = evt;

    if (type === "user.created") {
      const { email_addresses, id, image_url, first_name, last_name } = data;

      const email = email_addresses?.[0]?.email_address;

      if (!email || !id || !image_url || !first_name || !last_name) {
        return res
          .status(400)
          .json(new ApiResponse("error", "Missing required user information"));
      }

      await User.create({
        clerkId: id,
        email: email,
        profilePicture: image_url,
        username: `${first_name} ${last_name}`,
      });

      return res
        .status(200)
        .json(new ApiResponse("success", "Webhook processed successfully"));
    }

    return res
      .status(400)
      .json(new ApiResponse("error", "Unhandled event type"));
  } catch (error) {
    console.error("Webhook error:", error);
    return res
      .status(500)
      .json(new ApiResponse("error", "Internal Server Error"));
  }
};

export default webhookHandler;
