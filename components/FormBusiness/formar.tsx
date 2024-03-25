'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

import { z } from 'zod'
import { FormDataSchema } from '@/lib/businessschemaar'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import Input from './input'
import Heading from './heading'
import './formar.css';
import Select from './select'
import { countryArray,likeArray,natureAndLocationArray,specifyRegionArray, specifyTypeArray } from '@/lib/businessdataar'
import axios from 'axios'
import MultipleSelect from './multipleselect'

type Inputs = z.infer<typeof FormDataSchema>


const steps = [
  {
    id: 'الخطوة 1',
    name: 'معلومات شخصية',
    fields: [
      'FirstName', 'LastName','Email','PhoneNumber']
  },
  {
    id: 'الخطوة 2',
    name: 'مواصفات العقار المطلوب',
    fields: [
      'LikeTo', 'SpecifyType','SpecifyRegion','Country','District','GovernateOrState',
    'Financials','NatureAndLocation']
  },
  {
    id: 'الخطوه 3',
    name: 'المنطقة والمرافق',
    fields: ['AreaDesiredInSqm',
      'Lounge',
      'WaitingRoom',
      'Bathrooms',
      'Office',
      'SecretaryOffice', 
      'Reception',
      'OtherAreaAndFacilities']
  },
  {
    id: 'الخطوة 4',
    name: 'المزيد من التفاصيل',
    fields: ['CeilingHeightInMeters',
      'WidthOfEntranceInMeters',
      'Ramp',
      'Stairs',
      'Elevator',
      'CommodityElevator',
      'Escalator',
      'OtherDetails']
  },
  { id: 'الخطوة 5', name: 'مكتمل' }
]

export default function Form() {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const delta = currentStep - previousStep;
  const formRef = useRef<HTMLFormElement>(null);

  const submitForm = () => {
    if (formRef.current) {
      formRef.current.preventDefault();
      formRef.current.submit();
    }
  };

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

    console.log("data is ",data);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:5001/opddev-51cfb/us-central1/sendOpdMyBusinessEmailAr',
      //url:' https://us-central1-opddev-51cfb.cloudfunctions.net/sendOpdMyLandEmail',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    let config2 = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:5001/opddev-51cfb/us-central1/sendOpdNeededEmailToClientAr',
      //url:' https://us-central1-opddev-51cfb.cloudfunctions.net/sendOpdNeededEmailToClient',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    // send email to Mr. Itani
    axios.request(config)
    .then((response:any) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error:any) => {
      console.log(error);
    });

    // send email to Client
    axios.request(config2)
    .then((response:any) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error:any) => {
      console.log(error);
    });

    // reset form
    reset()
  }

  type FieldName = keyof Inputs

  const next = async () => {
    const fields = steps[currentStep].fields
    const output = await trigger(fields as FieldName[], { shouldFocus: true })
    console.log("Form errors: ", errors);

    if (!output) return

    if (currentStep < steps.length - 1) {
      console.log("currentStep",currentStep);
      console.log("steps.length",steps.length);
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)();
      }
      setPreviousStep(currentStep)
      setCurrentStep(step => step + 1)
    }

     // Scroll to the top of the page
     window.scrollTo(0, 0);
  }

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step - 1)
       // Scroll to the top of the page
       window.scrollTo(0, 0);
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
      <form ref={formRef} className='' onSubmit={handleSubmit(processForm)}>
      {currentStep === 0 && (
          <motion.div
            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Heading title='معلومات شخصية'>
            تقديم المزيد من التفاصيل عن نفسك.
            </Heading>
            <div className='mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-6'>
              
              {/* FirstName */}
              <Input
              id="FirstName"
              label="الاسم الأول"
              type="text"
              register={register}
              error={errors.FirstName?.message}
              />

               {/* LastName */}
              <Input
              id="LastName"
              label="اسم العائلة"
              type="text"
              register={register}
              error={errors.LastName?.message}
              />

              {/* Email */}
              <Input 
              id="Email"
              label="بريد إلكتروني"
              type="text"
              register={register}
              error={errors.Email?.message}
              />
              {/* PhoneNumber */}
              <Input 
              id="PhoneNumber"
              label="رقم التليفون"
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
            <Heading title='مواصفات العقار المطلوب'>
            تقديم المزيد من التفاصيل حول العقار المطلوب.
            </Heading>
            <div className='mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-6'>
              {/* LikeTo */}
              <Select
              id="LikeTo"
              label="وأود أن:"
              register={register}
              options={likeArray}
              error={errors.LikeTo?.message}
              />
              {/* SpecifyType */}
              <Select
              id="SpecifyType"
              label="تحديد النوع"
              register={register}
              options={specifyTypeArray}
              error={errors.SpecifyType?.message}
              />
              {/* SpecifyRegion */}
              <Select
              id="SpecifyRegion"
              label="تحديد المنطقة"
              register={register}
              options={specifyRegionArray}
              error={errors.SpecifyRegion?.message}
              />
              {/* Country */}
              <Select
              id="Country"
              label="الدولة"
              register={register}
              options={countryArray}
              error={errors.Country?.message}
              />
              {/* District */}
              <Input
              id="District"
              label="المنطقة"
              register={register}
              error={errors.District?.message}
              />

               {/* GovernateOrState */}
              <Input
              id="GovernateOrState"
              label="المحافظة أو الولاية"
              register={register}
              error={errors.GovernateOrState?.message}
              />

              <Input 
              id="Financials"
              label="الحد الأقصى للسعر بالدولار الأمريكي"
              type="number"
              register={register}
              error={errors.Financials?.message}
              />
              {/* MaximumPricePerSquareMetre */}

            <Select
              id="NatureAndLocation"
              label="الطبيعة والموقع"
              register={register}
              options={natureAndLocationArray}
              error={errors.NatureAndLocation?.message}
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
            <Heading title='الموقع'>
            تقديم المزيد من التفاصيل حول المنطقة والمرافق.
            </Heading>
           

            <div className='mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-6'>

              {/* AreaDesiredInSqm */}
              <Input 
              id="AreaDesiredInSqm"
              label="المساحة المرغوبة بالمتر المربع"
              type="textarea"
              register={register}
              error={errors.AreaDesiredInSqm?.message}
              />


              {/* Lounge */}
              <Input 
              id="Lounge"
              label="الصالة"
              type="checkbox"
              register={register}
              error={errors.Lounge?.message}
              />

              {/* Waiting Room */}
               <Input 
              id="WaitingRoom"
              label="غرفة الانتظار"
              type="checkbox"
              register={register}
              error={errors.WaitingRoom?.message}
              />


               {/* Bathrooms */}
               <Input 
              id="Bathrooms"
              label="الحمامات"
              type="checkbox"
              register={register}
              error={errors.Bathrooms?.message}
              />


              {/* Office */}
             <Input 
              id="Office"
              label="المكتب"
              type="checkbox"
              register={register}
              error={errors.Office?.message}
              />


              {/* Secretary Office  */}
              <Input 
              id="SecretaryOffice"
              label="مكتب السكرتارية "
              type="checkbox"
              register={register}
              error={errors.SecretaryOffice?.message}
              />

              {/* Reception */}
              <Input 
              id="Reception"
              label="استقبال"
              type="checkbox"
              register={register}
              error={errors.Reception?.message}
              />

              {/* OtherAreaAndFacilities */}
             <Input 
              id="OtherAreaAndFacilities"
              label="صف بإيجاز ما الذي ترغب في الحصول عليه بالضبط في منطقتك ومرافقك"
              type="textarea"
              register={register}
              error={errors.OtherAreaAndFacilities?.message}
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
            <Heading title='ميزات المنزل الخارج'>
            تقديم المزيد من التفاصيل حول العقار.
            </Heading>

            <div className='mt-1 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-6'>

            {/* CeilingHeightinMeters*/}
            <Input 
              id="CeilingHeightInMeters"
              label="ارتفاع السقف بالأمتار"
              type="text"
              register={register}
              error={errors.CeilingHeightInMeters?.message}
              />

              {/* Width of Entrance in Meters*/}
            <Input 
              id="WidthOfEntranceInMeters"
              label="عرض المدخل بالأمتار"
              type="text"
              register={register}
              error={errors.CeilingHeightInMeters?.message}
              />


                {/* Ramp */}
            <Input 
              id="Ramp"
              label="منحدر"
              type="checkbox"
              register={register}
              error={errors.Ramp?.message}
              />


                   {/* Stairs */}
            <Input 
              id="Stairs"
              label="سلالم"
              type="checkbox"
              register={register}
              error={errors.Stairs?.message}
              />

                                 {/* Elevator */}
            <Input 
              id="Elevator"
              label="مصعد"
              type="checkbox"
              register={register}
              error={errors.Elevator?.message}
              />


             {/* Commodity Elevator */}
            <Input 
              id="CommodityElevator"
              label="مصعد البضائع"
              type="checkbox"
              register={register}
              error={errors.CommodityElevator?.message}
              />

               {/* Escalator */}
            <Input 
              id="Escalator"
              label="سلم متحرك"
              type="checkbox"
              register={register}
              error={errors.Escalator?.message}
              />

             {/* OtherDetails*/}
             <Input 
              id="OtherDetails"
              label="صف بإيجاز ما الذي ترغب في الحصول عليه بالضبط في الممتلكات الخاصة بك، مزيد من التفاصيل"
              type="textarea"
              register={register}
              error={errors.OtherDetails?.message}
              />

              {/* honeypot */}
              <Input 
              id="honeypot"
              label=""
              type="hidden"
              register={register}
              error={errors.honeypot?.message}
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
            

            
            <div className="flex flex-col items-center justify-center">

   <br/><br/>
            <svg xmlns="http://www.w3.org/2000/svg" width="60.039" height="45.06" viewBox="0 0 60.039 45.06">
            <path id="Path_162" data-name="Path 162" d="M22.362,42.423,9.928,29.989a3.573,3.573,0,1,0-5.052,5.052L19.854,50.02a3.569,3.569,0,0,0,5.052,0L62.818,12.108a3.573,3.573,0,1,0-5.052-5.052Z" transform="translate(-3.828 -6.008)" fill="#477b11"/>
          </svg><br/>

   
    <h2 className="text-lg font-semibold mb-2 opd-heading">لقد تم إرسال طلبك</h2>
    <p className='opd-text'>سيتصل بك وكيلنا خلال الـ 24 ساعة القادمة</p><br/>

  
    <a href="https://propertypro.vip" className="text-blue-500 hover:text-blue-700 opd-link">انقر هنا للعودة إلى الموقع</a>
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
            السابق
          </button>}
          {(currentStep !== steps.length - 1) &&
          <button
            type='button'
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className=' bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset disabled:cursor-not-allowed disabled:opacity-50'
          >
             {(currentStep === steps.length - 2) ? "إنهاء" : "التالي" }
          </button>}
        </div>
      </div>
    </section>
  )
}