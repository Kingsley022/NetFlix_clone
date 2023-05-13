import { useState } from 'react';

export const useToggle = (initValue = false)=>{
    
   const[isToggle, setToggle] =  useState(initValue);

    const onToggle = ()=>{
        setToggle(prevToggle => !prevToggle)
    }

    return { isToggle, onToggle, setToggle };
};