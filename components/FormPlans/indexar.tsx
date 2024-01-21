
'use client'
import React, { useState } from 'react';

interface FormPlansProps {
    type: string | string[] | undefined // Adjust the type as necessary
}

import { useEffect } from 'react';
import './style.css';
import './stylear.css';
import { z } from 'zod'
import { FormDataSchema } from '@/lib/planschemaar'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'

import axios from 'axios'

type Inputs = z.infer<typeof FormDataSchema>

const FormPlans: React.FC<FormPlansProps> = ({ type }) => {
  const[submited,setSubmited] = useState(false);
  const[loading,setLoading] = useState(false);
    useEffect(() => {
        // Store the original background color
        
        const originalBackgroundColor = document.body.style.backgroundColor;
    
        // Change the background color
        if(type==="Standard"){
        document.body.style.backgroundColor = '#eee'; // Set your desired color
        }
        if(type==="Premium"){
        document.body.style.backgroundColor = '#ccc';
        }
    
        // Reset the background color when the component unmounts
        return () => {
          document.body.style.backgroundColor = originalBackgroundColor;
        };
      }, []);
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
        setLoading(true);
        console.log("data is ",data);
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          //url: 'http://127.0.0.1:5001/opddev-51cfb/us-central1/sendOpdPlanAr',
          url:' https://us-central1-opddev-51cfb.cloudfunctions.net/sendOpdPlanAr',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
    
        let config2 = {
          method: 'post',
          maxBodyLength: Infinity,
          //url: 'http://127.0.0.1:5001/opddev-51cfb/us-central1/sendOpdNeededEmailToClient',
          url:' https://us-central1-opddev-51cfb.cloudfunctions.net/sendOpdNeededEmailToClient',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        // send email to Mr. Itani
        axios.request(config)
        .then((response:any) => {
          console.log(JSON.stringify(response.data));
          setSubmited(true);
          setLoading(false);
        })
        .catch((error:any) => {
          console.log(error);
          setSubmited(true);
          setLoading(false);
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
        //reset()
      }
    
      type FieldName = keyof Inputs

      const submit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const fields = ['FirstName', 'LastName','Email','PhoneNumber','Type','honeypot'];
        const output = await trigger(fields as FieldName[], { shouldFocus: true })
        console.log("Form errors: ", output);
    
        if (!output) return
    

            await handleSubmit(processForm)();
         
    
         // Scroll to the top of the page
         window.scrollTo(0, 0);
      }
      const theClass = `container ${type}`;
    return( <div className={theClass}>
              <div className="flex flex-col items-center justify-center mb-3">
      <img src="/propertypro.svg" alt="logo" width="50" height="50" />
      <h2 className="opd-header">Property Pro</h2>
      </div>
      {(!submited) && 
    <>
    <h1>طلب خطة {type}.</h1>
    <form>
    <div className="form-control">
        <input type="text" 
         placeholder='الاسم الأول'
         {...register("FirstName")}
         />
         {errors.FirstName?.message &&
         <div className='error'>{errors.FirstName?.message}</div>
        }
      </div>
      <div className="form-control">
        <input type="text" 
        placeholder='اسم العائلة'
        {...register("LastName")}
        />
        {errors.LastName?.message &&
         <div className='error'>{errors.LastName?.message}</div>
        }
      </div>
      <div className="form-control">
        <input type="email" 
         placeholder='بريد إلكتروني'
        {...register("Email")}
        />
         {errors.Email?.message &&
         <div className='error'>{errors.Email?.message}</div>
        }
      </div>
      <div className="form-control">
        <input type="text" 
        placeholder='رقم التليفون'
        {...register("PhoneNumber")}
        />
       {errors.PhoneNumber?.message &&
         <div className='error'>{errors.PhoneNumber?.message}</div>
        }
        <input 
        type="hidden"
        {...register("Type")}
        value={type}
        />
        <input 
        type="hidden"
        {...register("honeypot")}
        />
      </div>

      {(!loading) && 
      <button  className="btn"
      onClick={submit}
      >اطلب عرض الخطة {type}.</button>
      }

      {(loading) &&
      <div className="loader"></div>
      }
    </form>
    </>
}

{(submited) && 
<div>
<h1><strong>شكرا لك على تقديمك!</strong></h1>

<p>لقد تم إرسال طلبك لخطة {type} بنجاح.</p>

<p>نحن نقدر اهتمامك ويسعدنا استكشاف كيف يمكن لخدماتنا أن تلبي احتياجاتك. سيتواصل معك أحد أعضاء فريقنا قريبًا لمناقشة التفاصيل والخطوات التالية.</p>

<p>في هذه الأثناء، إذا كانت لديك أية أسئلة أو كنت بحاجة إلى مساعدة فورية، فلا تتردد في الاتصال بنا على <a href="info@propertypro.vip">info@propertypro.vip</a>.</p>

<p>شكرًا لك على اختيار العيادات الخارجية. ونحن نتطلع إلى التحدث معكم قريبا!</p>
<br/>
<a href='https://propertypro.vip' className='btn'>العودة إلى الموقع الإلكتروني</a>
</div>
}

  </div>)
}

export default FormPlans;