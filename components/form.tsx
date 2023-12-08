'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

import { z } from 'zod'
import { FormDataSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = z.infer<typeof FormDataSchema>


const steps = [
  {
    id: 'Step 1',
    name: 'Specifications of the required property',
    fields: [
      'LikeTo', 'SpecifyType', 'Country','District','GovernateOrState']
  },
  {
    id: 'Step 2',
    name: 'Home Size',
    fields: ['PriceRangeMax', 'BedRoomsMin', 'BathRoomsMin', 'DesiredFloor', 'NumberOfSalons',
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
    id: 'Step 3',
    name: 'Location',
    fields: ['CloseToWork',
      'CloseToSchool',
      'CloseToHospital',
      'CloseToSupermarket',
      'CloseToParksRecreation',
      'CloseToRestaurants',
      'CloseToHighways',
      'PublicTransportation',
      'OtherLocation']
  },
  {
    id: 'Step 4',
    name: 'Neighborhood',
    fields: ['NoTraffic',
      'VeryQuiet',
      'YoungerNeighbors',
      'OlderNeighbors',
      'ChildFriendly',
      'OtherNeighborhood']
  },
  {
    id: 'Step 5',
    name: 'Schools',
    fields: ['CloseToHome',
    'GoodReputation',
    'SmallClassSize',
    'SolidCurriculum',
    'OtherSchools']
  },
  {
    id: 'Step 6',
    name: 'Home Systems',
    fields: ['CentralAC',
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
    id: 'Step 7',
    name: 'Home Features - Exterior',
    fields: ['Garage',
      'WalkOutBasement',
      'Driveway',
      'FencedYard',
      'Gardens',
      'Pool',
      'OtherHomeFeaturesExterior']
  },
  {
    id: 'Step 8',
    name: 'Home Features - Interior',
    fields: ['WoodFlooring',
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
  { id: 'Step 9', name: 'Complete' }
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
    <section className='absolute inset-0 flex flex-col justify-between p-24'>
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

      {/* Form */}
      <form className='mt-12 py-12' onSubmit={handleSubmit(processForm)}>
        {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Specifications of the required property
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Provide more details about the required property.
            </p>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
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

              
            </div>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              Address
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Address where you can receive mail.
            </p>

            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='country'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Country
                </label>
                <div className='mt-2'>
                  <select
                    id='country'
                    {...register('country')}
                    autoComplete='country-name'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6'
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                  {errors.country?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='col-span-full'>
                <label
                  htmlFor='street'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Street address
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='street'
                    {...register('street')}
                    autoComplete='street-address'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.street?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.street.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-2 sm:col-start-1'>
                <label
                  htmlFor='city'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  City
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='city'
                    {...register('city')}
                    autoComplete='address-level2'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.city?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='state'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  State / Province
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='state'
                    {...register('state')}
                    autoComplete='address-level1'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.state?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.state.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='zip'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  ZIP / Postal code
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='zip'
                    {...register('zip')}
                    autoComplete='postal-code'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                  />
                  {errors.zip?.message && (
                    <p className='mt-2 text-sm text-red-400'>
                      {errors.zip.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              step 2
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              continue on the step 2
            </p>
          </>
        )}

        {currentStep === 3 && (
          <>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              step 3
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              continue on the step 3
            </p>
          </>
        )}

          {currentStep === 4 && (
          <>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              step 4
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              continue on the step 4
            </p>
          </>
        )}

        {currentStep === 5 && (
          <>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              step 5
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              continue on the step 5
            </p>
          </>
        )}

        {currentStep === 6 && (
          <>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              step 6
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              continue on the step 6
            </p>
          </>
        )}

        {currentStep === 7 && (
          <>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              step 7
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              continue on the step 7
            </p>
          </>
        )}
         {currentStep === 8 && (
          <>
            <h2 className='text-base font-semibold leading-7 text-gray-900'>
              step 8
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              continue on the step 8
            </p>
          </>
        )}
        {currentStep === 9 && (
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
