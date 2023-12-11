import { z } from 'zod'

export const FormDataSchema = z.object({
  LikeTo: z.string().min(1, 'This field is required'),
  SpecifyType: z.string().min(1, 'Type is required'),
  //SpecifyRegion: z.string().min(1, 'Email is required').email('Invalid email address'),
  SpecifyRegion: z.string().min(1, 'Region is required'),
  Country: z.string().min(1, 'Country is required'),
  District: z.string().min(1, 'District is required'),
  state: z.string().min(1, 'State is required'),
  GovernateOrState : z.string().min(1, 'Governate or State is required'),
  LivableArea: z.string().min(1,'This field is required, please put 0 as minimum value'),
  BathRoomsMin: z.string().min(1,'This field is required, please put 0 as minimum value'),
  DesiredFloor: z.string().min(1,'This field is required, please put 0 as minimum value'),
  NumberOfSalons: z.string().min(1,'This field is required, please put 0 as minimum value'),
  NumberOfLivingRooms: z.string().min(1,'This field is required, please put 0 as minimum value'),
  NumberOfBathrooms: z.string().min(1,'This field is required, please put 0 as minimum value'),
  NumberOfDiningRooms: z.string().min(1,'This field is required, please put 0 as minimum value'),
  MaidsRoomWithBathroom: z.string().min(1,'This field is required, please put 0 as minimum value'),
  StorageRoom: z.string().min(1,'This field is required, please put 0 as minimum value'),
  Generator: z.boolean(),
  NumberOfParkingLots: z.string().min(1,'This field is required, please put 0 as minimum value'),
  OtherHomeSize: z.string().min(1,'This field is required, please describe in breif what you are looking for'),
})
