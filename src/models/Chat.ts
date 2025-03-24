import Chat, { IChat } from '../schemas/chatSchema.js';
import { FilterQuery } from 'mongoose';

class ChatModel {
  async findAll(): Promise<IChat[] | null> {
    try {
      return await Chat.find();
    } catch (error) {
      console.error();
    }
  }
}
