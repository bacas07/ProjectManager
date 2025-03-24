import {
  object,
  pipe,
  string,
  number,
  minLength,
  maxLength,
  array,
  union,
  date,
  optional,
  literal,
} from 'valibot';

const messagesJSONSchema = object({
  sender: pipe(
    string(),
    minLength(1, 'Sender message requires minimum 1 characters'),
    maxLength(100, 'Sender message requires maximum 100 characters')
  ),

  content: pipe(
    string(),
    minLength(1, 'Content message requires minimum 1 characters'),
    maxLength(2000, 'Content message requires maximum 2000 characters')
  ),
});

const stagesContentJsonSchema = object({
  name: pipe(
    string(),
    minLength(5, 'Project name requires minimun 5 characters'),
    maxLength(100, 'Project name requires maximum 100 characters')
  ),

  description: pipe(
    string(),
    minLength(5, 'Project description requires minimum 5 characters'),
    maxLength(1000, 'Project description requires maximum 1000 characters')
  ),

  estimatedTime: pipe(number('Project estimated time must be in hours')),

  status: optional(
    pipe(
      string(),
      union(
        [literal('peding'), literal('in-progress'), literal('done')],
        'Invalid stage'
      )
    ),
    'pending'
  ),
});

const technologiesJsonSchema = object({
  name: pipe(
    string(),
    minLength(1, 'Technologies requires minimun 1 characters'),
    maxLength(100, 'Technologies requires maximum 100 characters')
  ),
});

const contextJSONSchema = object({
  projectOverview: pipe(
    string(),
    minLength(5, 'Project overview context requires minimum 5 characters'),
    maxLength(1000, 'Project overview context requires maximum 2000 characters')
  ),

  stages: pipe(array(stagesContentJsonSchema)),

  technologies: pipe(array(technologiesJsonSchema)),

  lastUpdated: pipe(date()),

  conversationSummary: pipe(
    string(),
    minLength(5, 'Conversation summary context requires minimum 5 characters'),
    maxLength(
      1500,
      'Conversation summary context requires maximum 1500 characters'
    )
  ),
});

export const chatInputSchema = object({
  project: pipe(
    string(),
    minLength(1, 'Project reference ID requires minimum 1 character'),
    maxLength(100, 'Project reference ID requires maximum 100 characters')
  ),

  messages: pipe(array(messagesJSONSchema)),

  context: pipe(contextJSONSchema),
});

/*
export const chatInputSchema = z.object({
  project: z.string().min(1, 'Project reference ID chat is required').max(100),
  messages: z.array(messagesJSONSchema),
  context: contextJSONSchema,

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
});*/
