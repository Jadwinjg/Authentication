import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import RegValid from './RegValid'
import axios from 'axios'
function Register() {
  const [values, setValues] = useState({
    name:"",
    email:"",
    password:""
  })

  const [errors, setErrors] = useState({})
const naviagate = useNavigate()
  const handleSubmit = (e) => {
   e.preventDefault();
   setErrors(RegValid(values));
   axios.post('http://localhost:8081/add',values)
   .then((res)=>{
   console.log(res);
   setValues({
    name:"",
    email:"",
    password:""
   })
   alert("Registration Successful")
   naviagate('/')
   })

   .catch(err=>console.log(err))
  }

  const handleChange = (e) => {
   setValues((prev)=>({...prev,[e.target.name] : e.target.value}))
  }
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-900 div '>
        <form onSubmit={handleSubmit} className='shadow-lg p-4 bg-white rounded-xl grid gap-y w-full max-w-xs'>
            <label>Name</label>
            <input onChange={handleChange} name='name' className='border-2 p-1' type='text' placeholder='Enter your name'/> <br/>
           {errors.name && <span className='text-red-600'>{errors.name}</span>}
            <label>Email</label>
            <input onChange={handleChange} name='email' className='border-2 p-1' type='text' placeholder='Enter your email'/> <br/>
            {errors.email && <span className='text-red-600'>{errors.email}</span>}
            <label>Password</label>
            <input onChange={handleChange} name='password' className='border-2 p-1' type='text' placeholder='Enter your password'/> <br/>
             {errors.password && <span className='text-red-600'>{errors.password}</span>}
            <button type='submit' className='hover:bg-green-600 mt-2 text-center w-full py-1 rounded bg-green-500'>Create Account</button>
        <p className='text-center mt-2'>Back to login?<Link to={'/'}><span className='ms-2 text-blue-500'>click here</span></Link></p>
        </form>
    </div>
  )
}

export default Register