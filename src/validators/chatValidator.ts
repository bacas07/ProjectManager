import { z } from 'zod';

const messagesJSONSchema = z.object({
  sender: z.string().min(1, 'Sender message is required').max(100),
  content: z.string().min(1, 'Content message is required').max(2000),
});

const stagesContentJSONSchema = z.object({
  name: z.string().min(1, 'Name stage is required').max(100),
  description: z.string().min(1, 'Description stage is required').max(1000),
  estimatedTime: z.number().positive(),
  status: z.enum(['pending', 'in-progress', 'done']),
});

const technologiesJSONSchema = z.object({
  name: z.string().min(1, 'technologies context is required').max(100),
});

const contextJSONSchema = z.object({
  projectOverview: z
    .string()
    .min(1, 'ProjectOverview context is required')
    .max(1000),
  stages: z.array(stagesContentJSONSchema),
  technologies: z.array(technologiesJSONSchema),
  lastUpdated: z.union([z.date(), z.string().datetime()]),
  conversationSummary: z
    .string()
    .min(1, 'ConversationSumary context is required')
    .max(1500),
});

export const chatInputSchema = z.object({
  project: z.string().min(1, 'Project reference ID chat is required').max(100),
  messages: z.array(messagesJSONSchema),
  context: contextJSONSchema,
});
