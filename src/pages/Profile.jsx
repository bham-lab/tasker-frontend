import { useAuth } from '../context/AuthContext'


import { Button, Input } from '../components/ui'

import UpdateProfile from '../components/UpdateProfile'


export default function Profile() {

  const { user, logout } = useAuth()

  return (
    <div className="bg-white dark:bg-slate-700 flex flex-col gap-8 rounded-xl shadow-sm px-8 py-6 ">  <p className="text-sm font-semibold ">UserName:{user.name}</p>

<UpdateProfile />

     
    </div>
  )

}