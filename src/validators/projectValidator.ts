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
  description,
  optional,
  literal,
} from 'valibot';

const stagesJsonSchema = object({
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
    minLength(1, 'Technologie requires minimun 5 characters'),
    maxLength(100, 'Technologies requires maximum 50 characters')
  ),
});

export const projectInputSchema = object({
  name: pipe(
    string(),
    minLength(1, 'Project name required minimun 5 characters')
  ),

  description: pipe(),

  technologies: pipe(),

  stages: pipes(),

  createdBy: pipes(),

  deadline: pipes(),
});

/*const stagesJSONSchema = z.object({
  name: z.string().min(1, 'Name stage is required').max(100),
  description: z.string().min(1, 'Description stage is required').max(1000),
  estimatedTime: z.number().positive(),
  status: z.enum(['pending', 'in-progress', 'done']),
});

const technologiesJSONSchema = z.object({
  name: z.string().min(1, 'Name technologies is required').max(50),
});

export const projectInputSchema = z.object({
  name: z.string().min(1, 'Name project is required').max(100),
  description: z.string().min(1, 'Description project is required').max(2000),
  technologies: z.array(technologiesJSONSchema),
  stages: z.array(stagesJSONSchema),
  createdBy: z.string().min(1, 'User ID project is required').max(100),
  deadline: z.union([z.date(), z.string().datetime()]),
});*/
