
import { FormField, Input, Button } from './ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { signupSchema } from '../Schema'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from "../context/ToastContext"




export function SignUp() {
  const { signUp } = useAuth()
  const { setToast } = useToast()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
      isValid
    },
    setError,
   
    reset

  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onChange"
  })

  

const onSignUp = async (data) => {
  try{
     await signUp(data)
    setToast({value: "Register successfully" , type:"success"})
    navigate("/login")
  }catch(err){
     if(err.response?.status === 409) {
     
   setToast({value: err.response?.data?.message, type: "error"})
     } else if (err.response?.status === 422) {
      const serverErrors = err.response?.data.errors || []
      serverErrors.forEach(({field, message}) => {
        setError(field, {type: "server", message})
      })
     } else{
      setToast({ value: err.message, type: "error"})
     }
  } 
   
  }


  return (

    <form onSubmit={handleSubmit(onSignUp)} className="space-y-4 p-4 border border-slate-200 rounded-xl dark:border-slate-600">
      <FormField label="name" error={errors.name?.message}>
        <Input {...register("name")} error={errors.name} placeholder="name" />
      </FormField>

      <FormField label="email" error={errors.email?.message}>
        <Input {...register("email")} error={errors.email} placeholder="example@gmail.com" />
      </FormField>

      <FormField label="password" error={errors.password?.message}>
        <Input {...register("password")} error={errors.password} placeholder="password" />
      </FormField>


      <FormField label="Confirm Password" error={errors.confirmPassword?.message}>
        <Input {...register("confirmPassword")} error={errors.confirmPassword} placeholder="re enter your password" />
      </FormField>
      <p className="text-slate-500 text-center text-xs font-semibold  ">Do you have an account?   <NavLink className="active:text-blue-700 transition-colors text-blue-400 " to="/sign-up"> Sign in here</NavLink> </p>

      <Button disabled={isSubmitting || !isValid} type="submit" > {isSubmitting ? "Signing up" : "Sign up"}</Button>


    </form>

  )
}