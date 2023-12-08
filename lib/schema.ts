import { z } from 'zod'

export const FormDataSchema = z.object({
  LikeTo: z.string().min(1, 'This field is required'),
  SpecifyType: z.string().min(1, 'Type is required'),
  //SpecifyRegion: z.string().min(1, 'Email is required').email('Invalid email address'),
  SpecifyRegion: z.string().min(1, 'Region is required'),
  Country: z.string().min(1, 'Country is required'),
  District: z.string().min(1, 'District is required'),
  state: z.string().min(1, 'State is required'),
  GovernateOrState : z.string().min(1, 'Governate or State is required')
})
