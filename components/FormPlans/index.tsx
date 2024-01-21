
'use client'
import React, { useState } from 'react';

interface FormPlansProps {
    type: string | string[] | undefined // Adjust the type as necessary
}

import { useEffect } from 'react';
import './style.css';
import { z } from 'zod'
import { FormDataSchema } from '@/lib/planschema'
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
          //url: 'http://127.0.0.1:5001/opddev-51cfb/us-central1/sendOpdPlanEn',
          url:' https://us-central1-opddev-51cfb.cloudfunctions.net/sendOpdPlanEn',
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
    <h1>Request for a {type} plan</h1>
    <form>
    <div className="form-control">
        <input type="text" 
         placeholder='First Name'
         {...register("FirstName")}
         />
         {errors.FirstName?.message &&
         <div className='error'>{errors.FirstName?.message}</div>
        }
      </div>
      <div className="form-control">
        <input type="text" 
        placeholder='Last Name'
        {...register("LastName")}
        />
        {errors.LastName?.message &&
         <div className='error'>{errors.LastName?.message}</div>
        }
      </div>
      <div className="form-control">
        <input type="email" 
         placeholder='Email'
        {...register("Email")}
        />
         {errors.Email?.message &&
         <div className='error'>{errors.Email?.message}</div>
        }
      </div>
      <div className="form-control">
        <input type="text" 
        placeholder='Phone Number'
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
      >Request A {type} Plan Offer</button>
      }

      {(loading) &&
      <div className="loader"></div>
      }
    </form>
    </>
}

{(submited) && 
<div>
<h1><strong>Thank You for Your Submission!</strong></h1>

<p>Your request for the {type} Plan has been successfully submitted.</p>

<p>We appreciate your interest and are excited to explore how our services can meet your needs. A member of our team will be in touch with you shortly to discuss the details and next steps.</p>

<p>In the meantime, if you have any questions or require immediate assistance, please feel free to contact us at <a href="info@propertypro.vip">info@propertypro.vip</a> .</p>

<p>Thank you for choosing OPD. We look forward to speaking with you soon!</p>
<br/>
<a href='https://propertypro.vip' className='btn'>Back to Website</a>
</div>
}

  </div>)
}

export default FormPlans;