import Chat, { IChat } from '../schemas/chatSchema.js';
import { FilterQuery } from 'mongoose';

class ChatModel {
  async findAll(): Promise<IChat[] | null> {
    try {
      return await Chat.find({ status: true });
    } catch (error) {
      console.error('Error Chat find: ', error);
      return null;
    }
  }

  async findAllUnactive(): Promise<IChat[] | null> {
    try {
      return await Chat.find({ status: false });
    } catch (error) {
      console.error('Error Chat find: ', error);
      return null;
    }
  }

  async findByID(chatID: String): Promise<IChat | null> {
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
      return await Chat.find({ projectID });
    } catch (error) {
      console.error('Error Chat findByProjectID: ', error);
      return null;
    }
  }

  async findOne(filter: FilterQuery<IChat>): Promise<IChat[] | null> {
    try {
      return await Chat.findOne(filter);
    } catch (error) {
      console.error('Error Chat findOne: ', error);
      return null;
    }
  }

  // Crear funcion para agregar nuevos mensajes a un chat
  async addMessage(
    chatID: string,
    sender: string,
    content: string
  ): Promise<IChat | null> {
    try {
      const message = {
        sender: sender,
        content: content,
      };
      return await Chat.findByIdAndUpdate(
        chatID,
        { $push: { messages: message } },
        { new: true }
      );
    } catch (error) {
      console.error('Error Chat addMessage: ', error);
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

  async update(chatID: String, data: Partial<IChat>): Promise<IChat | null> {
    try {
      return await Chat.findByIdAndUpdate(chatID, data, { new: true });
    } catch (error) {
      console.error('Error Chat update: ', error);
      return null;
    }
  }

  async softDelete(chatID: String): Promise<IChat | null> {
    try {
      return await Chat.findByIdAndUpdate(
        chatID,
        { status: false },
        { new: true }
      );
    } catch (error) {
      console.error('Error Chat delete: ', error);
      return null;
    }
  }

  // Metodo de eliminacion real
  async delete(chatID: string): Promise<IChat | null> {
    try {
      return await Chat.findByIdAndDelete(chatID);
    } catch (error) {
      console.error('Error User delete: ', error);
      return null;
    }
  }
}

export default new ChatModel();
