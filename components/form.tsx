'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

import { z } from 'zod'
import { FormDataSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import Input from './input'
import Heading from './heading'
import './form.css';
import Select from './select'
import { countryArray, likeArray, specifyRegionArray, specifyTypeArray } from '@/lib/data'

type Inputs = z.infer<typeof FormDataSchema>


const steps = [
  {
    id: 'Step 1',
    name: 'Personal information',
    fields: [
      'FirstName', 'LastName','Email','PhoneNumber']
  },
  {
    id: 'Step 2',
    name: 'Specifications of the required property',
    fields: [
      'LikeTo', 'SpecifyType','SpecifyRegion','Country','District','GovernateOrState','LivableArea','PriceRangeMax','BedRoomsMin', 'BathRoomsMin', 'DesiredFloor', 'NumberOfSalons',
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
    id: 'Step 4',
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
    id: 'Step 5',
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
  { id: 'Step 6', name: 'Complete' }
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
    console.log("Form errors: ", errors);
console.log(output);
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
    <section className='absolute inset-0 flex flex-col  p-12'>
      <div className="flex flex-col items-center justify-center mb-3">
      <img src="/propertypro.svg" alt="logo" width="50" height="50" />
      <h2 className="opd-header">Property Pro</h2>
      </div>
      {/* steps */}
      <nav aria-label='Progress'>
        <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
          {steps.map((step, index) => (
            <li key={step.name} className='md:flex-1'>
              {currentStep > index ? (
                <div className='opd-border group flex w-full flex-col border-l-4 border-sky-600  py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-sky-600 transition-colors '>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium'>{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className='opd-border flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                  aria-current='step'
                >
                  <span className='text-sm font-medium text-sky-600 opd-link'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium opd-text'>{step.name}</span>
                </div>
              ) : (
                <div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                  <span className='text-sm font-medium text-gray-500 transition-colors opd-link'>
                    {step.id}
                  </span>
                  <span className='text-sm font-medium opd-text'>{step.name}</span>
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
              Provide more details about your self.
            </Heading>
            <div className='mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-6'>
              
              {/* District */}
              <Input
              id="FirstName"
              label="First Name"
              type="text"
              register={register}
              error={errors.FirstName?.message}
              />

               {/* GovernateOrState */}
              <Input
              id="LastName"
              label="Last Name"
              type="text"
              register={register}
              error={errors.LastName?.message}
              />

              {/* Livable area */}
              <Input 
              id="Email"
              label="Email"
              type="text"
              register={register}
              error={errors.Email?.message}
              />
              {/* PriceRangeMax */}
              <Input 
              id="PhoneNumber"
              label="Phone Number"
              type="text"
              register={register}
              error={errors.PhoneNumber?.message}
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
            <Heading title='Specifications of the required property'>
              Provide more details about the required property.
            </Heading>
            <div className='mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-6'>
              {/* LikeTo */}
              <Select
              id="LikeTo"
              label="I would like to:"
              register={register}
              options={likeArray}
              error={errors.LikeTo?.message}
              />
              {/* SpecifyType */}
              <Select
              id="SpecifyType"
              label="Specify Type"
              register={register}
              options={specifyTypeArray}
              error={errors.SpecifyType?.message}
              />
              {/* SpecifyRegion */}
              <Select
              id="SpecifyRegion"
              label="Specify Region"
              register={register}
              options={specifyRegionArray}
              error={errors.SpecifyRegion?.message}
              />
              {/* Country */}
              <Select
              id="Country"
              label="Country"
              register={register}
              options={countryArray}
              error={errors.Country?.message}
              />
              {/* District */}
              <Input
              id="District"
              label="District"
              register={register}
              error={errors.District?.message}
              />

               {/* GovernateOrState */}
              <Input
              id="GovernateOrState"
              label="Governate Or State"
              register={register}
              error={errors.GovernateOrState?.message}
              />

            </div>

            <br /><br/>
            <Heading title='Home Size'>
             Provide more details about the the size of the property.
            </Heading>
            <div className='mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-6'>
              {/* Livable area */}
              <Input 
              id="LivableArea"
              label="Livable Area"
              type="number"
              register={register}
              error={errors.LivableArea?.message}
              />
              {/* PriceRangeMax */}
              <Input 
              id="PriceRangeMax"
              label="Price Range (Maximum)"
              type="number"
              register={register}
              error={errors.LivableArea?.message}
              />
              {/* BathRoomsMin */}
              <Input 
              id="BathRoomsMin"
              label="Bedrooms (min.)"
              type="number"
              register={register}
              error={errors.BathRoomsMin?.message}
              />
              {/* DesiredFloor */}
              <Input 
              id="DesiredFloor"
              label="Desired floor"
              type="number"
              register={register}
              error={errors.DesiredFloor?.message}
              />
              {/* NumberOfSalons */}
              <Input 
              id="NumberOfSalons"
              label="Number of salons"
              type="number"
              register={register}
              error={errors.NumberOfSalons?.message}
              />
              {/* NumberOfLivingRooms */}
              <Input 
              id="NumberOfLivingRooms"
              label="Number of Living Rooms"
              type="number"
              register={register}
              error={errors.NumberOfLivingRooms?.message}
              />
              {/* NumberOfBathrooms */}
              <Input 
              id="NumberOfBathrooms"
              label="Number of bathrooms"
              type="number"
              register={register}
              error={errors.NumberOfBathrooms?.message}
              />
              {/* NumberOfDiningRooms */}
              <Input 
              id="NumberOfDiningRooms"
              label="Number of dining rooms"
              type="number"
              register={register}
              error={errors.NumberOfDiningRooms?.message}
              />


               {/* MaidsRoomWithBathroom */}
               <Input 
              id="MaidsRoomWithBathroom"
              label="Maid's room with bathroom"
              type="checkbox"
              register={register}
              error={errors.MaidsRoomWithBathroom?.message}
              />


              {/* StorageRoom */}
              <Input 
              id="StorageRoom"
              label="Storage room"
              type="number"
              register={register}
              error={errors.StorageRoom?.message}
              />

               {/* Generator */}
              <Input 
              id="Generator"
              label="Generator"
              type="checkbox"
              register={register}
              error={errors.Generator?.message}
              />

              {/* NumberOfParkingLots */}
              <Input 
              id="NumberOfParkingLots"
              label="Number of parking lots"
              type="number"
              register={register}
              error={errors.NumberOfParkingLots?.message}
              />
              <br/>
              {/* OtherHomeSize */}
              <Input 
              id="OtherHomeSize"
              label="Describe breifly what exactly you like to have for your property size"
              type="textarea"
              register={register}
              error={errors.OtherHomeSize?.message}
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
            <Heading title='Location'>
             Provide more details about the location of the property.
            </Heading>
           

            <div className='mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-6'>
              

            {/*'CloseToWork',*/}
            <Input 
              id="CloseToWork"
              label="Close to work"
              type="checkbox"
              register={register}
              error={errors.OtherHomeSize?.message}
              />
            {/*'CloseToSchool',*/}
            <Input 
              id="CloseToSchool"
              label="Close to school"
              type="checkbox"
              register={register}
              error={errors.CloseToSchool?.message}
              />
            {/*'CloseToHospital',*/}
            <Input 
              id="CloseToHospital"
              label="Close to hospital"
              type="checkbox"
              register={register}
              error={errors.CloseToHospital?.message}
              />
            {/*'CloseToSupermarket',*/}
            <Input 
              id="CloseToSupermarket"
              label="Close to supermarket"
              type="checkbox"
              register={register}
              error={errors.CloseToSupermarket?.message}
              />
            {/*'CloseToParksRecreation',*/}
            <Input 
              id="CloseToParksRecreation"
              label="Close to parks recreation"
              type="checkbox"
              register={register}
              error={errors.CloseToParksRecreation?.message}
              />
            {/*'CloseToRestaurants',*/}
            <Input 
              id="CloseToRestaurants"
              label="Close to restaurants"
              type="checkbox"
              register={register}
              error={errors.CloseToRestaurants?.message}
              />
            {/*'CloseToHighways',*/}
            <Input 
              id="CloseToHighways"
              label="Close to highways"
              type="checkbox"
              register={register}
              error={errors.CloseToHighways?.message}
              />
            {/*'PublicTransportation',*/}
            <Input 
              id="PublicTransportation"
              label="Public transportation"
              type="checkbox"
              register={register}
              error={errors.PublicTransportation?.message}
              />
            {/*'OtherLocation'*/}
            <Input 
              id="OtherLocation"
              label="Describe Breifly What Exactly You Like To Have For Your Property Location"
              type="textarea"
              register={register}
              error={errors.OtherLocation?.message}
              />
            </div><br/>
            <Heading title='Neighborhood'>
             Provide more details about the neighborhood of the property.
            </Heading>
            <div className='mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-6'>
            {/* 'NoTraffic', */}
            <Input 
              id="NoTraffic"
              label="No Traffic"
              type="checkbox"
              register={register}
              error={errors.NoTraffic?.message}
              />
            {/*'VeryQuiet',*/}
            <Input 
              id="VeryQuiet"
              label="Very quiet"
              type="checkbox"
              register={register}
              error={errors.VeryQuiet?.message}
              />
            {/*'YoungerNeighbors',*/}
            <Input 
              id="YoungerNeighbors"
              label="Younger neighbors"
              type="checkbox"
              register={register}
              error={errors.YoungerNeighbors?.message}
              />
            {/*'OlderNeighbors',*/}
            <Input 
              id="OlderNeighbors"
              label="Close to school"
              type="checkbox"
              register={register}
              error={errors.OlderNeighbors?.message}
              />
            {/*'ChildFriendly',*/}
            <Input 
              id="ChildFriendly"
              label="Close to school"
              type="checkbox"
              register={register}
              error={errors.ChildFriendly?.message}
              />
            {/*'OtherNeighborhood'*/}
            <Input 
              id="OtherNeighborhood"
              label="Describe Breifly What Exactly You Like To Have For Your Property Neighborhood"
              type="textarea"
              register={register}
              error={errors.OtherNeighborhood?.message}
              />
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Heading title='Schools'>
             Provide more details about the schools suround the property.
            </Heading>

            <div className='mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-6'>
            {/*'CloseToHome',*/}
            <Input 
              id="CloseToHome"
              label="Close to home"
              type="checkbox"
              register={register}
              error={errors.CloseToHome?.message}
              />
            {/*'GoodReputation',*/}
            <Input 
              id="GoodReputation"
              label="Good reputation"
              type="checkbox"
              register={register}
              error={errors.GoodReputation?.message}
              />
            {/*'SmallClassSize',*/}
            <Input 
              id="SmallClassSize"
              label="Small class size"
              type="checkbox"
              register={register}
              error={errors.SmallClassSize?.message}
              />
            {/*'SolidCurriculum',*/}
            <Input 
              id="SolidCurriculum"
              label="Solid curriculum"
              type="checkbox"
              register={register}
              error={errors.SolidCurriculum?.message}
              />
            {/*'OtherSchools',*/}
            <Input 
              id="OtherSchools"
              label="Describe Breifly What Exactly You Like To Have For Your Property School suroundings"
              type="textarea"
              register={register}
              error={errors.OtherSchools?.message}
              />
            </div>

            <Heading title='Home Systems'>
             Provide more details about the home system provided by the property.
            </Heading>

            <div className='mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-6'>
            {/*'CentralAC',*/}
            <Input 
              id="CentralAC"
              label="Central AC"
              type="checkbox"
              register={register}
              error={errors.CentralAC?.message}
              />
            {/*'WoodStove',*/}
            <Input 
              id="WoodStove"
              label="Wood Stove"
              type="checkbox"
              register={register}
              error={errors.WoodStove?.message}
              />
            {/*'Fireplace',*/}
            <Input 
              id="Fireplace"
              label="Fire Place"
              type="checkbox"
              register={register}
              error={errors.Fireplace?.message}
              />
            {/*'TanklessWaterHeater',*/}
            <Input 
              id="TanklessWaterHeater"
              label="Tankless water heater"
              type="checkbox"
              register={register}
              error={errors.TanklessWaterHeater?.message}
              />
            {/*'CopperPlumbing',*/}
            <Input 
              id="CopperPlumbing"
              label="Copper Plumbing"
              type="checkbox"
              register={register}
              error={errors.CopperPlumbing?.message}
              />
            {/*'SolarPower',*/}
            <Input 
              id="SolarPower"
              label="Solar Power"
              type="checkbox"
              register={register}
              error={errors.SolarPower?.message}
              />
            {/*'Generator',*/}
            <Input 
              id="Generator"
              label="Generator"
              type="checkbox"
              register={register}
              error={errors.Generator?.message}
              />
            {/*'SecuritySystem',*/}
            <Input 
              id="SecuritySystem"
              label="Security System"
              type="checkbox"
              register={register}
              error={errors.SecuritySystem?.message}
              />
            {/*'HomeAutomation',*/}
            <Input 
              id="HomeAutomation"
              label="Home Automation"
              type="checkbox"
              register={register}
              error={errors.HomeAutomation?.message}
              />
            {/*'Cable',*/}
            <Input 
              id="Cable"
              label="Cable"
              type="checkbox"
              register={register}
              error={errors.Cable?.message}
              />
            {/*'SatelliteDish',*/}
            <Input 
              id="SatelliteDish"
              label="Satellite dish"
              type="checkbox"
              register={register}
              error={errors.SatelliteDish?.message}
              />
            {/*'FiberOpticCable',*/}
            <Input 
              id="FiberOpticCable"
              label="Fiber Optic Cable"
              type="checkbox"
              register={register}
              error={errors.FiberOpticCable?.message}
              />
            {/*'OtherHomeSystems'*/}
            <Input 
              id="OtherHomeSystems"
              label="Describe Breifly What Exactly You Like To Have For Your Property Home Systems"
              type="textarea"
              register={register}
              error={errors.OtherHomeSystems?.message}
              />
            </div>

            
          </motion.div>
        )}

        {currentStep === 4 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Heading title='Home Features Exterior'>
             Provide more details about the exterior home features of the property.
            </Heading>

            <div className='mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-6'>
            {/*'Garage',*/}
            <Input 
              id="Garage"
              label="Garage"
              type="checkbox"
              register={register}
              error={errors.Garage?.message}
              />
            {/*'WalkOutBasement',*/}
            <Input 
              id="WalkOutBasement"
              label="WalkOut basement"
              type="checkbox"
              register={register}
              error={errors.WalkOutBasement?.message}
              />
            {/*'Driveway',*/}
            <Input 
              id="Driveway"
              label="Driveway"
              type="checkbox"
              register={register}
              error={errors.Driveway?.message}
              />
            {/*'FencedYard',*/}
            <Input 
              id="FencedYard"
              label="Fenced Yard"
              type="checkbox"
              register={register}
              error={errors.FencedYard?.message}
              />
            {/*'Gardens',*/}
            <Input 
              id="Gardens"
              label="Gardens"
              type="checkbox"
              register={register}
              error={errors.Gardens?.message}
              />
            {/*'Pool',*/}
            <Input 
              id="Pool"
              label="Pool"
              type="checkbox"
              register={register}
              error={errors.Pool?.message}
              />
            {/*'OtherHomeFeaturesExterior',*/}
            <Input 
              id="OtherHomeFeaturesExterior"
              label="Describe Breifly What Exactly You Like To Have For Your Property Home Features Exterior"
              type="textarea"
              register={register}
              error={errors.OtherHomeFeaturesExterior?.message}
              />
            </div>

            <Heading title='Home Features Interior'>
             Provide more details about the interior features of the property.
            </Heading>

            <div className='mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-6'>
            {/*'WoodFlooring',*/}
            <Input 
              id="WoodFlooring"
              label="Wood Flooring"
              type="checkbox"
              register={register}
              error={errors.WoodFlooring?.message}
              />
            {/*'MaidRoom',*/}
            <Input 
              id="MaidRoom"
              label="Maid room"
              type="checkbox"
              register={register}
              error={errors.MaidRoom?.message}
              />
            {/*'LaundryRoom',*/}
            <Input 
              id="LaundryRoom"
              label="Laundry room"
              type="checkbox"
              register={register}
              error={errors.LaundryRoom?.message}
              />
            {/*'FinishedBasement',*/}
            <Input 
              id="FinishedBasement"
              label="Finished basement"
              type="checkbox"
              register={register}
              error={errors.FinishedBasement?.message}
              />
            {/*'EatInKitchen',*/}
            <Input 
              id="EatInKitchen"
              label="Eat In Kitchen"
              type="checkbox"
              register={register}
              error={errors.EatInKitchen?.message}
              />
            {/*'GameRoom',*/}
            <Input 
              id="GameRoom"
              label="Game room"
              type="checkbox"
              register={register}
              error={errors.GameRoom?.message}
              />
            {/*'Office',*/}
            <Input 
              id="Office"
              label="Office"
              type="checkbox"
              register={register}
              error={errors.Office?.message}
              />
            {/*'MasterBedroom',*/}
            <Input 
              id="MasterBedroom"
              label="Master bedroom"
              type="checkbox"
              register={register}
              error={errors.MasterBedroom?.message}
              />
            {/*'MasterBathroom',*/}
            <Input 
              id="MasterBathroom"
              label="Master bathroom"
              type="checkbox"
              register={register}
              error={errors.MasterBathroom?.message}
              />
            {/*'WalkInCloset',*/}
            <Input 
              id="FiberOpticCable"
              label="Fiber optic cable"
              type="checkbox"
              register={register}
              error={errors.FiberOpticCable?.message}
              />
            {/*'OtherHomeFeaturesInterior'*/}
            <Input 
              id="OtherHomeFeaturesInterior"
              label="Describe Breifly What Exactly You Like To Have For Your Property Home Features Interior"
              type="textarea"
              register={register}
              error={errors.OtherHomeFeaturesInterior?.message}
              />
            </div>
            
          </motion.div>
        )}

        {currentStep === 5 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            

            
            <div className="flex flex-col items-center justify-center">

   <br/><br/>
            <svg xmlns="http://www.w3.org/2000/svg" width="60.039" height="45.06" viewBox="0 0 60.039 45.06">
            <path id="Path_162" data-name="Path 162" d="M22.362,42.423,9.928,29.989a3.573,3.573,0,1,0-5.052,5.052L19.854,50.02a3.569,3.569,0,0,0,5.052,0L62.818,12.108a3.573,3.573,0,1,0-5.052-5.052Z" transform="translate(-3.828 -6.008)" fill="#477b11"/>
          </svg><br/>

   
    <h2 className="text-lg font-semibold mb-2 opd-heading">Your request has been sent</h2>
    <p className='opd-text'>Our agent will contact you within the next 24 hours</p><br/>

  
    <a href="https://example.com" className="text-blue-500 hover:text-blue-700 opd-link">Click Here to go back to site</a>
</div>



           
          </motion.div>
        )}

        
        
      </form>

      {/* Navigation */}
      <div className='mt-8 pt-5'>
        <div className='flex justify-between'>
        {(currentStep !== steps.length - 1) &&
          <button
            type='button'
            onClick={prev}
            disabled={currentStep === 0}
            className=' bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
          >
            Prev
          </button>}
          {(currentStep !== steps.length - 1) &&
          <button
            type='button'
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className=' bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset disabled:cursor-not-allowed disabled:opacity-50'
          >
             {(currentStep === steps.length - 2) ? "Finish" : "Next" }
          </button>}
        </div>
      </div>
    </section>
  )
}