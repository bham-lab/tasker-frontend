import { useEffect } from 'react'
import { Input, FormField, Button } from './ui'
import { profileSchema } from '../Schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from "../context/AuthContext"


export default function UpdateProfile() {
  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
      isValid
    }, reset
  } = useForm({
    resolver: zodResolver(profileSchema),
    mode: "onChange"
  })


  useEffect(() => { reset({ name: user.name }, { email: user.email || "", bio: user.bio || "", url: user.url || "" }) }, [])

  function onUpdate(data) {


  }
  return (
    <form className=" grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={handleSubmit(onUpdate)}>
      <FormField label="name" error={errors.name?.message}>
        <Input{...register("name")} placeholder="Name" error={errors.name} />
      </FormField>

      <FormField label="email" error={errors.email?.message}>
        <Input {...register("email")} placeholder="Email" error={errors.email} />
      </FormField>

      <FormField label="bio" error={errors.bio?.message} >
        <Input {...register("bio")} placeholder="Something about you ..." error={errors.bio} />
      </FormField>


      <FormField label="url" error={errors.url?.message} >
        <Input {...register("url")} placeholder="https://www.example.com" error={errors.url} />
      </FormField>




      <Button type="submit" disabled={isSubmitting || !isValid}>Update</Button>


    </form>)

}