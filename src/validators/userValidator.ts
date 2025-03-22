import {
  object,
  pipe,
  string,
  trim,
  minLength,
  maxLength,
  email,
  optional,
  union,
  toLowerCase,
  literal,
  boolean,
} from 'valibot'

export const userInputSchema = object({
  // Puro sufrimiento pasar de zod a valibot :|
  username: pipe(
    // Implementar pipe para encapsular y transformar los datos
    string(),
    toLowerCase(),
    trim(),
    minLength(5, 'username requires minimum 5 characters'),
    maxLength(50, 'username requires maximun 5 characters')
  ),

  email: pipe(
    // Numero maximo es igual al maximo que se permite para crear un email
    string(),
    toLowerCase(),
    trim(),
    email('Input a valid email'),
    minLength(5, 'email requires minimum 5 characters'),
    maxLength(320, 'email requires miximum 320 characters')
  ),

  password: pipe(
    string(),
    minLength(8, 'password requires minimum 8 characters'),
    maxLength(255, 'password required maximun 255 characters')
  ),

  role: optional(
    // Optional para dolores de cabeza
    pipe(
      string(),
      union([literal('admin'), literal('user'), literal('dev')], 'Invalid role')
    ),
    'user'
  ),

  status: optional(pipe(boolean()), true),
})

console.log('esta vaina no sirve')

/*
export const userInputSchema = z.object({
    username: z.string().min(1, 'Username required').max(50),
    email: z.string().email('Must be a valid email'),
    password: z.string().min(1, 'Password is required').max(255),
    role: z.string().default('user'),
    status: z.boolean().default(true)
});*/
