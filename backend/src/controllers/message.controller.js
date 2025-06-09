import messageModels from "../models/message.models.js";

export const sendMessage = async (req, res) => {
  try {
    const sender = req.user.id;
    const { receiver } = req.params;
    const { content } = req.body;

    if (!sender || !receiver) {
      return res
        .status(400)
        .json({ message: "Both sender and receiver IDs are required." });
    }

    if (!content || content.trim() === "") {
      return res
        .status(400)
        .json({ message: "Message content cannot be empty." });
    }

    const message = await messageModels.create({
      sender,
      receiver,
      content,
    });

    return res.status(201).json({
      message: "Message sent successfully.",
      data: message,
    });
  } catch (error) {
    console.error("Send Message Error:", error);
    return res.status(500).json({
      message: "Internal server error while sending message.",
      error: error.message,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const sender = req.user.id;
    const { receiver } = req.params;

    if (!sender || !receiver) {
      return res
        .status(400)
        .json({ message: "Both sender and receiver IDs are required." });
    }

    const messages = await messageModels
      .find({
        $or: [
          { sender: sender, receiver: receiver },
          { sender: receiver, receiver: sender },
        ],
      })
      .sort({ createdAt: 1 });
    return res.status(200).json({
      message: "Messages fetched successfully.",
      data: messages,
    });
  } catch (error) {
    console.error("Get Messages Error:", error);
    return res.status(500).json({
      message: "Internal server error while fetching messages.",
      error: error.message,
    });
  }
};
