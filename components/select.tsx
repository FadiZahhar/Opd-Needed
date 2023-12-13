export default function Select({id,label,register,options,error}:any){

    const listItems = options.map((item:string, index:number) =>
    <option key={index} value={item}>{item}</option>
  );

    return(
        <div className='sm:col-span-1'>
        <label
        htmlFor={id}
        className='block text-sm font-medium leading-6 text-gray-900'
      >
       {label}
      </label>
      <div className='mt-2'>
        <select
          id={id}
          {...register(id)}
          autoComplete={id}
          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6'
        >
          {listItems}
        </select>
        {error && (
          <p className='mt-2 text-sm text-red-400'>
            {error}
          </p>
        )}
      </div>
      </div>
    )
}