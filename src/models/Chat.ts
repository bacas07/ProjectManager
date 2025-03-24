import Chat, { IChat } from '../schemas/chatSchema.js';
import { FilterQuery } from 'mongoose';

class ChatModel {
  async findAll(): Promise<IChat[] | null> {
    try {
      return await Chat.find();
    } catch (error) {
      console.error('Error Chat find: ', error);
      return null;
    }
  }

  async findByID(chatID: String): Promise<IChat[] | null> {
    try {
      return await Chat.findById(chatID);
    } catch (error) {
      console.error('Error Chat findOne: ', error);
      return null;
    }
  }

  async findByProjectID(
    projectID: FilterQuery<IChat>
  ): Promise<IChat[] | null> {
    try {
      return await Chat.findOne(projectID);
    } catch (error) {
      console.error('Error Chat findByProjectID: ', error);
      return null;
    }
  }

  async findOne(filter: FilterQuery<IChat>): Promise<IChat[] | null> {
    try {
      return await Chat.findOne(filter);
    } catch (error) {
      console.error('Error Chat findOne', error);
      return null;
    }
  }

  async create(data: Partial<IChat>): Promise<IChat | null> {
    try {
      const newChat = new Chat(data);
      return await newChat.save();
    } catch (error) {
      console.error('Error Chat create: ', error);
      return null;
    }
  }
}
