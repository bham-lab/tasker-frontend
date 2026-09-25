import { useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { Button, FormField, Input } from '../components/ui'
import { loginSchema } from '../Schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'


export default function Login() {
 
  const { setToast } = useToast()
  
  const {
    register,
    handleSubmit,
    setError,
    formState: {
      errors,
      isSubmitting,
      isValid
    }
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange"
  })

  const navigate = useNavigate()

  const {

    user,
    login
  } = useAuth()


  useEffect(() => {
    if (user) {
      navigate("/todo")
    }
  }, [user, navigate ])


  const handleLogin  = async (data) => {
    try {
      await login(data)
      setToast({ value: "Login successfully", type: "success" })
      navigate("/todo")
    } catch (err) {
      if (err.response?.status === 401) {
        setError("password", {
          type: "server",
          message: "Invalid email or password"
        })
       
      } else if (err.response?.status === 422) {
        const serverErrors = err.response?.data.errors || []
        serverErrors.forEach(({ field, message }) => {
          setError(field, { type: "server", message })
        })
      } else {
        setToast({ value: err.message, type: "error" })
      }
    }

  }


  return (
    <div className="flex min-h-screen dark:bg-slate-800 justify-center items-center">

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col px-8 dark:text-slate-200 py-6 gap-4 mx-auto bg-white rounded-xl shadow-sm dark:bg-slate-700"
      >

        <h1 className="text-xl dark:text-slate-200 mx-auto sm:text-xl md:text-2xl font-bold">
          Login here
        </h1>

        <FormField
          label="email"
          error={errors.email?.message}
          required="true"
        >
          <Input
            {...register("email")}
            error={errors.email}
            placeholder="userName"
          />
        </FormField>


        <FormField
          label="password"
          error={errors.password?.message}
          required="true"
        >
          <Input
            {...register("password")}
            error={errors.password}
            type="text"
            placeholder="password"
          />
        </FormField>
        <p className="text-slate-500 text-center text-xs font-semibold  ">Don't have an account?   <NavLink className="active:text-vlue-700 transition-colors text-blue-400 " to="/sign-up"> Create new account</NavLink> </p>

        <Button
          type="submit"
          disabled={isSubmitting || !isValid}

        >

          {isSubmitting ? "LOGGING..." : "LOGIN"}
        </Button>

      </form>

    </div>
  )
}