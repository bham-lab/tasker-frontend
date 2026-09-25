import {
  useTodo
} from '../context/TodoContext'
import {
  useToast
} from '../context/ToastContext'

import {

  useEffect
} from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { todoSchema } from '../Schema'




import { Button, Input, FormField } from '../components/ui'
export default function TodoForm() {
  const {
    addTodo,
    edit,
    setEdit
  } = useTodo()

  const {
    register,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    reset
  } = useForm({ resolver: zodResolver(todoSchema), mode: "onChange" })





  useEffect(() => {
    if (edit) {
      reset({ text: edit.text })
    } else {

      reset({ text: ' ' })

    }
  }, [ edit ])


  const {
    setToast
  } = useToast()




  const onSubmit = async (data) => {
    const { text } = data
    try{
      await addTodo(text)
      setToast({
        value:
          edit ? "Updated Successfully" : "Added successfully"
        , type: "success"
      })

    } catch(err) {
      setToast({value: err.response?.data?.message})
    }
    
 finally{

      reset()
      setEdit(null)
 }
   


  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-6 justify-center">
      <FormField error={errors.text?.message}>
        <Input
          error={errors.text}
          {...register("text")}
          type="text"
          placeholder="Learnig react"
        />
      </FormField>

      <Button
        type="submit" disabled={isSubmitting || !isValid}
      > {edit ? "Update" : "Add"}</Button>

    </form>

  )


}