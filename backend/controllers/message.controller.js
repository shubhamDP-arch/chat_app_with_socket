import AsyncHandler from "express-async-handler";
import { Message } from "../models/message.model";
import { Chat } from "../models/chat.model";
import { User } from "../models/user.model";
import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";

//@description     Get all Messages
//@route           GET /api/Message/:chatId
const allMessage = AsyncHandler(async(req, res)=>{
  const {chatId} = req.params 
  
  const messages = Message.findOne({chatId}).populate("chat").populate("name pic email")
  if(messages){
    return res.send(ApiResponse(200, messages, "message sent successfully"))
  }
  else{
    throw new ApiError(404, "chatId Error")
  }

})

//@description     Create New Message
//@route           POST /api/Message/

const sendMessage = AsyncHandler(async(req, res)=>{
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic")
    message = await message.populate("chat")
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
}
})

export {sendMessage, allMessage}