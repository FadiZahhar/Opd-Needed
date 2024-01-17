import { z } from 'zod'

export const FormDataSchema = z.object({
  FirstName: z.string().min(1, 'Your Name is required'),
  LastName: z.string().min(1, 'Your Last Name is required'),
  Email: z.string().min(1, 'Email is required').email('Invalid email address'),
  PhoneNumber: z.string().min(1, 'Your Phone Number is Required'),
  Type: z.string(),
  honeypot: z.string()
})
