import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './Validation';
import axios from 'axios';
function Login() {
  const navigate = useNavigate()
  const [error, setError] = useState({})
  const [values, setValues] = useState({
    email:'',
    password:''
  });
const handleChange = (e) => {
setValues((prev)=>({...prev, [e.target.name]:e.target.value}))
}
const handleSubmit = (e) => {
e.preventDefault()
setError(Validation(values));

axios.post('http://localhost:8081/check', values)
.then((res)=>{
  if(res.data==="success"){
    alert("Login Successful!")
    navigate('/home')
  }else {
        alert("Invalid email or password");
      }
})
.catch((err)=>console.log(err)
)
}
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-900 div '>
        <form onSubmit={handleSubmit} className='shadow-lg p-4 bg-white rounded-xl grid gap-y w-full max-w-xs'>
            <label>Email</label>
            <input onChange={handleChange} name='email' value={values.email} className='border-2 p-1' type='text' placeholder='Enter your email'/> <br/>
            {error.email && <span className='text-red-600'>{error.email}</span>}
            <label>Password</label>
            <input onChange={handleChange} name='password' value={values.password} className='border-2 p-1' type='password' placeholder='Enter your password'/> <br/>
            {error.password && <span className='text-red-600'>{error.password}</span>}
            <button type='submit' className='bg-green-500 border-2 hover:bg-green-600 w-full py-1 rounded'>Login</button>
            <p className='text-center mt-2'> Don't have a account?</p>
            <Link to={'/register'} className='bg-gray-100 mt-2 border-2 text-center w-full py-1 rounded hover:bg-green-500'>Create Account</Link>
        </form>
    </div>
  )
}

export default Login