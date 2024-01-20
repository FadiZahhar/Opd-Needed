import { useEffect, useState } from "react";
export default function Input({id,label,type,register,error}:any){


    useEffect(()=>{
      //1console.log("id",id);
      //console.log("label",label);
      //console.log("type",type);
      //console.log("register",register);
        console.log("error",error);
    },[error])
    
    return(
        <>
         {type === 'checkbox' ? (
         <div className='sm:col-span-1'>
        <label
          htmlFor={id}
          className='inline-flex items-center mt-3 opd-text'
        >{label}</label>
        <div className='mt-2'>
        <input
            type={type}
            id={id}
            {...register(id)}
            className='form-checkbox h-5 w-5 text-green-600'
          />
          {error && (
            <p className='mt-2 text-sm text-red-400'>
              {error}
            </p>
          )}
        </div>
        </div>
      )
         : type === 'textarea' ? (<div className='sm:col-span-6'>
         <label
           htmlFor={id}
           className='block text-sm font-medium leading-6 text-gray-900 opd-text'
         >
           {label}
         </label>
         <div className='mt-2'>
         <textarea
             type={type}
             id={id}
             {...register(id)}
             autoComplete={id}
             className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
           ></textarea>
           {error && (
             <p className='mt-2 text-sm text-red-400'>
               {error}
             </p>
           )}
         </div>
       </div>)
         : (
        <div className='sm:col-span-1'>
        <label
          htmlFor={id}
          className='block text-sm font-medium leading-6 text-gray-900 opd-tethis'
        >
          {label}
        </label>
        <div className='mt-2'>
        <input
            type={type}
            id={id}
            {...register(id)}
            autoComplete={id}
            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
            defaultValue={(type === "number") ?"0" : ""}
            min={(type === "number") ?"0" : ""}
          />
          {error && (
            <p className='mt-2 text-sm text-red-400'>
              {error}
            </p>
          )}
        </div>
      </div>)}
       </>
    )
}