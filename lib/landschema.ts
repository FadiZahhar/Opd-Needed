import { z } from 'zod'

export const FormDataSchema = z.object({
  FirstName: z.string().min(1, 'Your Name is required'),
  LastName: z.string().min(1, 'Your Last Name is required'),
  Email: z.string().min(1, 'Email is required').email('Invalid email address'),
  PhoneNumber: z.string().min(1, 'Your Phone Number is Required'),
  LikeTo: z.string().min(1, 'This field is required'),
  SpecifyType: z.string().min(1, 'Type is required'),
  SpecifyRegion: z.string().min(1, 'Region is required'),
  Country: z.string().min(1, 'Country is required'),
  District: z.string().min(1, 'District is required'),
  GovernateOrState : z.string().min(1, 'Governate or State is required'),
  Financials: z.string().min(1,'This field is required, please put 0 as minimum value'),
  MaximumPricePerSquareMetre: z.string().min(1,'This field is required, please put 0 as minimum value'),
  LandClassification: z.string().min(1,'This field is required, please put 0 as minimum value'),
  MoreDetails: z.array(z.string()),
  OtherMoreDetails : z.string(),
  MaximumOverallInvestmentZone: z.string().min(1,'This field is required, please put 0 as minimum value'),
  NatureAndLocation: z.string().min(1,'This field is required'),
  OtherNatureAndLocation : z.string(),
  IsItNearA: z.array(z.string()),
  OtherIsItNearA : z.string(),
  IsItPossibleTo: z.array(z.string()),
  DoesAnyoneHaveARight : z.array(z.string()),
  OtherDoesAnyoneHaveARight : z.string(),
  honeypot: z.string()
})
