import { Schema, Document, model } from 'mongoose';

interface IMessages extends Document {
  sender: string;
  content: string;
}

interface IStages extends Document {
  name: string;
  description: string;
  estimatedTime: number;
  status: 'pending' | 'in-progress' | 'done';
}

interface IContext extends Document {
  projectOverview: string;
  stages: [IStages];
  technologies: [string];
  lastUpdated: Date;
  conversationSummary: string;
}

interface IChat extends Document {
  project: string;
  messages: [IMessages];
  context: IContext;
}

const messagesSchema = new Schema<IMessages>({
  sender: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  content: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 2000,
  },
});

const stagesSchema = new Schema<IStages>({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1000,
  },
  estimatedTime: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'in-progress', 'done'],
  },
});

const contextSchema = new Schema<IContext>({
  projectOverview: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1000,
  },
  stages: {
    type: [stagesSchema],
    required: true,
  },
  technologies: {
    type: [String],
    required: true,
  },
  lastUpdated: {
    type: Date,
    required: true,
  },
  conversationSummary: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1500,
  },
});

const chatSchema = new Schema<IChat>({
  project: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  messages: {
    type: [messagesSchema],
    required: true,
  },
  context: {
    type: contextSchema,
    required: true,
  },
});

const Chat = model<IChat>('Chat', chatSchema);
