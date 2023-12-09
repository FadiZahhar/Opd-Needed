import React, { PropsWithChildren } from 'react';
// Define an interface for the component props
interface HeadingProps {
    title: string;
    children: string;
}

const Heading: React.FC<PropsWithChildren<HeadingProps>> = ({title,children}) =>{
    return(
        <>
        <h2 className='mt-1 text-base font-semibold leading-7 text-gray-900'>
              {title}
            </h2>
            <p className=' text-sm leading-6 text-gray-600'>
              {children}
            </p>
        </>
    )
}

export default Heading;