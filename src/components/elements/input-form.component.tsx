'use client'
 
import { Fragment } from 'react';
import { useFormStatus } from 'react-dom'

type InputFormType = { type: string; name: string; placeholder: string; classname: string; defaultValue?:string;}

export function InputForm({ type, name, placeholder, classname} : InputFormType) {
  const { pending } = useFormStatus()
 
  return (<Fragment>
    <input
     
      aria-disabled={pending}
      type={type}
      name={name}
      placeholder={placeholder}
      className={classname}
      />
  </Fragment>)
}