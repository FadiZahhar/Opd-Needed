'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

import { z } from 'zod'
import { FormDataSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import Input from './input'
import Heading from './heading'

type Inputs = z.infer<typeof FormDataSchema>


const steps = [
  {
    id: 'Step 1',
    name: 'Specifications of the required property',
    fields: [
      'LikeTo', 'SpecifyType', 'Country','District','GovernateOrState','PriceRangeMax', 'BedRoomsMin', 'BathRoomsMin', 'DesiredFloor', 'NumberOfSalons',
      'NumberOfLivingRooms',
      'NumberOfBathrooms',
      'NumberOfDiningRooms',
      'MaidRoomWithBathroom',
      'StorageRoom',
      'WaterWell',
      'Generator',
      'NumberOfParkingLots',
      'OtherHomeSize']
  },
  {
    id: 'Step 2',
    name: 'Location And Neighborhood',
    fields: ['CloseToWork',
      'CloseToSchool',
      'CloseToHospital',
      'CloseToSupermarket',
      'CloseToParksRecreation',
      'CloseToRestaurants',
      'CloseToHighways',
      'PublicTransportation',
      'OtherLocation','NoTraffic',
      'VeryQuiet',
      'YoungerNeighbors',
      'OlderNeighbors',
      'ChildFriendly',
      'OtherNeighborhood']
  },
  {
    id: 'Step 3',
    name: 'Schools And Home Systems',
    fields: ['CloseToHome',
      'GoodReputation',
      'SmallClassSize',
      'SolidCurriculum',
      'OtherSchools','CentralAC',
      'WoodStove',
      'Fireplace',
      'TanklessWaterHeater',
      'CopperPlumbing',
      'SolarPower',
      'Generator',
      'SecuritySystem',
      'HomeAutomation',
      'Cable',
      'SatelliteDish',
      'FiberOpticCable',
      'OtherHomeSystems']
  },
  {
    id: 'Step 4',
    name: 'Home Features - Exterior and Interior',
    fields: ['Garage',
      'WalkOutBasement',
      'Driveway',
      'FencedYard',
      'Gardens',
      'Pool',
      'OtherHomeFeaturesExterior','WoodFlooring',
      'MaidRoom',
      'LaundryRoom',
      'FinishedBasement',
      'EatInKitchen',
      'GameRoom',
      'Office',
      'MasterBedroom',
      'MasterBathroom',
      'WalkInCloset',
      'OtherHomeFeaturesInterior']
  },
  { id: 'Step 5', name: 'Complete' }
]

export default function Form() {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const delta = currentStep - previousStep

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema)
  })

  const processForm: SubmitHandler<Inputs> = data => {
    console.log(data)
    reset()
  }

  type FieldName = keyof Inputs

  const next = async () => {
    const fields = steps[currentStep].fields
    const output = await trigger(fields as FieldName[], { shouldFocus: true })

    if (!output) return

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)()
      }
      setPreviousStep(currentStep)
      setCurrentStep(step => step + 1)
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step - 1)
    }
  }

  return (
    <section className='absolute inset-0 flex flex-col  p-24'>
      {/* steps */}
      <nav aria-label='Progress'>
        <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
          {steps.map((step, index) => (
            <li key={step.name} className='md:flex-1'>
              {currentStep > index ? (
                <div className='group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-sky-600 transition-colors '>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className='flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                  aria-current='step'
                >
                  <span className='text-sm font-medium text-sky-600'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : (
                <div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-gray-500 transition-colors'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>
<br/>
      {/* Form */}
      <form className='' onSubmit={handleSubmit(processForm)}>
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Heading title='Specifications of the required property'>
              Provide more details about the required property.
            </Heading>
            <div className='mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              {/* LikeTo */}
              <div className='sm:col-span-1'>
                <label
                  htmlFor='wouldliketo'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  I would like to:
                </label>
                <div className='mt-2'>
                  <select
                    id='LikeTo'
                    {...register('LikeTo')}
                    autoComplete='LikeTo'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6'
                  >
                    <option>Buy</option>
                    <option>Rent</option>
                    <option>Lease to buy</option>
                  </select>
                  {errors.LikeTo?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.LikeTo.message}
                    </p>
                  )}
                </div>
              </div>
              {/* SpecifyType */}
              <div className='sm:col-span-1'>
                <label
                  htmlFor='SpecifyType'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Specify Type
                </label>
                <div className='mt-2'>
                <select
                    id='SpecifyType'
                    {...register('SpecifyType')}
                    autoComplete='SpecifyType'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6'
                  >
                    <option>House</option>
                    <option>Apartment</option>
                  </select>
                  {errors.SpecifyType?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.SpecifyType.message}
                    </p>
                  )}
                </div>
              </div>
              {/* SpecifyRegion */}
              <div className='sm:col-span-1'>
                <label
                  htmlFor='SpecifyRegion'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                 Specify Region
                </label>
                <div className='mt-2'>
                <select
                    id='SpecifyRegion'
                    {...register('SpecifyRegion')}
                    autoComplete='SpecifyRegion'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6'
                  >
                    <option>City</option>
                    <option>Town</option>
                    <option>Village</option>
                  </select>
                  {errors.SpecifyRegion?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.SpecifyRegion.message}
                    </p>
                  )}
                </div>
              </div>
              {/* Country */}
              <div className='sm:col-span-1'>
                <label
                  htmlFor='Country'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                 Country
                </label>
                <div className='mt-2'>
                <select
                    id='Country'
                    {...register('Country')}
                    autoComplete='Country'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6'
                  >
                    <option>Lebanon</option>
                    <option>Turkey</option>
                    <option>Greece</option>
                    <option>USA</option>
                  </select>
                  {errors.Country?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.Country.message}
                    </p>
                  )}
                </div>
              </div>
              {/* District */}
              <div className='sm:col-span-1'>
                <label
                  htmlFor='District'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                 District
                </label>
                <div className='mt-2'>
                <select
                    id='District'
                    {...register('District')}
                    autoComplete='District'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6'
                  >
                    <option>City</option>
                    <option>Town</option>
                    <option>Village</option>
                  </select>
                  {errors.SpecifyRegion?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.SpecifyRegion.message}
                    </p>
                  )}
                </div>
              </div>

                            {/* Governent Or State */}
                            <div className='sm:col-span-1'>
                <label
                  htmlFor='GovernentOrState'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                 Governent Or State
                </label>
                <div className='mt-2'>
                <select
                    id='GovernateOrState'
                    {...register('GovernateOrState')}
                    autoComplete='GovernentOrState'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6'
                  >
                    <option>City</option>
                    <option>Town</option>
                    <option>Village</option>
                  </select>
                  {errors.SpecifyRegion?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.SpecifyRegion.message}
                    </p>
                  )}
                </div>
              </div>

            </div>

            <br /><br/>
            <Heading title='Home Size'>
             Provide more details about the the size of the property.
            </Heading>
            <div className='mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              {/* PriceRangeMax */}
              <Input 
              id="PriceRangeMax"
              label="Price Range (Maximum)"
              type="number"
              register={register}
              errors={errors}
              />
              {/* BathRoomsMin */}
              <Input 
              id="BathRoomsMin"
              label="Bedrooms (min.)"
              type="number"
              register={register}
              errors={errors}
              />
              {/* DesiredFloor */}
              <Input 
              id="DesiredFloor"
              label="Desired floor"
              type="number"
              register={register}
              errors={errors}
              />
              {/* NumberOfSalons */}
              <Input 
              id="NumberOfSalons"
              label="Number of salons"
              type="number"
              register={register}
              errors={errors}
              />
              {/* NumberOfLivingRooms */}
              <Input 
              id="NumberOfLivingRooms"
              label="Number of livingRooms"
              type="number"
              register={register}
              errors={errors}
              />
              {/* NumberOfBathrooms */}
              <Input 
              id="NumberOfBathrooms"
              label="Number of bathrooms"
              type="number"
              register={register}
              errors={errors}
              />
              {/* NumberOfDiningRooms */}
              <Input 
              id="NumberOfDiningRooms"
              label="Number of dining rooms"
              type="number"
              register={register}
              errors={errors}
              />


               {/* MaidsRoomWithBathroom */}
               <Input 
              id="MaidsRoomWithBathroom"
              label="Maid's room with bathroom"
              type="checkbox"
              register={register}
              errors={errors}
              />


              {/* StorageRoom */}
              <Input 
              id="StorageRoom"
              label="Storage room"
              type="number"
              register={register}
              errors={errors}
              />

               {/* Generator */}
              <Input 
              id="Generator"
              label="Generator"
              type="checkbox"
              register={register}
              errors={errors}
              />

              {/* NumberOfParkingLots */}
              <Input 
              id="NumberOfParkingLots"
              label="Number of parking lots"
              type="number"
              register={register}
              errors={errors}
              />
              <br/>
              {/* OtherHomeSize */}
              <Input 
              id="OtherHomeSize"
              label="Other"
              type="textarea"
              register={register}
              errors={errors}
              />

              
            </div>

           
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Heading title='Location'>
             Provide more details about the location of the property.
            </Heading>
           

            <div className='mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              

            {/*'CloseToWork',*/}
            <Input 
              id="CloseToWork"
              label="Close to work"
              type="checkbox"
              register={register}
              errors={errors}
              />
            {/*'CloseToSchool',*/}
            <Input 
              id="CloseToSchool"
              label="Close to school"
              type="checkbox"
              register={register}
              errors={errors}
              />
            {/*'CloseToHospital',*/}
            <Input 
              id="CloseToHospital"
              label="Close to hospital"
              type="checkbox"
              register={register}
              errors={errors}
              />
            {/*'CloseToSupermarket',*/}
            <Input 
              id="CloseToSupermarket"
              label="Close to supermarket"
              type="checkbox"
              register={register}
              errors={errors}
              />
            {/*'CloseToParksRecreation',*/}
            <Input 
              id="CloseToParksRecreation"
              label="Close to parks recreation"
              type="checkbox"
              register={register}
              errors={errors}
              />
            {/*'CloseToRestaurants',*/}
            <Input 
              id="CloseToRestaurants"
              label="Close to restaurants"
              type="checkbox"
              register={register}
              errors={errors}
              />
            {/*'CloseToHighways',*/}
            <Input 
              id="CloseToHighways"
              label="Close to highways"
              type="checkbox"
              register={register}
              errors={errors}
              />
            {/*'PublicTransportation',*/}
            <Input 
              id="PublicTransportation"
              label="Public transportation"
              type="checkbox"
              register={register}
              errors={errors}
              />
            {/*'OtherLocation'*/}
            <Input 
              id="OtherLocation"
              label="Other"
              type="textarea"
              register={register}
              errors={errors}
              />
            </div><br/>
            <Heading title='Neighborhood'>
             Provide more details about the neighborhood of the property.
            </Heading>
            <div className='mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            {/* 'NoTraffic', */}
            <Input 
              id="NoTraffic"
              label="No Traffic"
              type="checkbox"
              register={register}
              errors={errors}
              />
            {/*'VeryQuiet',*/}
            <Input 
              id="VeryQuiet"
              label="Very quiet"
              type="checkbox"
              register={register}
              errors={errors}
              />
            {/*'YoungerNeighbors',*/}
            <Input 
              id="YoungerNeighbors"
              label="Younger neighbors"
              type="checkbox"
              register={register}
              errors={errors}
              />
            {/*'OlderNeighbors',*/}
            <Input 
              id="Older neighbors"
              label="Close to school"
              type="checkbox"
              register={register}
              errors={errors}
              />
            {/*'ChildFriendly',*/}
            <Input 
              id="Child friendly"
              label="Close to school"
              type="checkbox"
              register={register}
              errors={errors}
              />
            {/*'OtherNeighborhood'*/}
            <Input 
              id="OtherNeighborhood"
              label="Other"
              type="textarea"
              register={register}
              errors={errors}
              />
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Heading title='Schools'>
             Provide more details about the schools suround the property.
            </Heading>

            <div className='mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            </div>

            <Heading title='Home Systems'>
             Provide more details about the home system provided by the property.
            </Heading>

            <div className='mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            </div>

            
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Heading title='Home Features Exterior'>
             Provide more details about the exterior home features of the property.
            </Heading>

            <div className='mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            </div>

            <Heading title='Home Features Interior'>
             Provide more details about the interior features of the property.
            </Heading>

            <div className='mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            </div>
            
          </motion.div>
        )}

        {currentStep === 4 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
            Location
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
            Location of the property.
            </p>

            <div className='mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              

            </div>
          </motion.div>
        )}

        
        {currentStep === 5 && (
          <>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              step 9
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              continue on the step 9
            </p>
          </>
        )}
      </form>

      {/* Navigation */}
      <div className='mt-8 pt-5'>
        <div className='flex justify-between'>
          <button
            type='button'
            onClick={prev}
            disabled={currentStep === 0}
            className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 19.5L8.25 12l7.5-7.5'
              />
            </svg>
          </button>
          <button
            type='button'
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.25 4.5l7.5 7.5-7.5 7.5'
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
