import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
function Add_book() {
  const navigate = useNavigate();
  const [addBook, setAddBook] = useState({
    title:"",
    desc:"",
    cover:"",
    price:null
  })

  function handleChange(e){
  setAddBook((prev)=>({...prev,[e.target.name]:e.target.value}))
  }
  
  async function handleSubmit(e){
  e.preventDefault();
   try{
    const res = await axios.post("http://localhost:8081/books",addBook )
     setAddBook(res.data)
     alert("Added Successfully")
     setAddBook({
    title:"",
    desc:"",
    cover:"",
    price:null
     })
     console.log(res.data);
     navigate("/home")   
   }
   catch(err){
    console.log(err);
    alert("Failed to add")
   }
 } 
  return (
    <>
    <div>Add_book</div>
    <form action="" onSubmit={handleSubmit} >
   <div>
    <label>Book title</label>
    <input type='text' name='title' onChange={handleChange} className='border'/>
   </div>
    <div>
    <label>Book desc</label>
    <input type='text' name='desc' onChange={handleChange} className='border'/>
   </div>
    <div>
    <label>Book cover</label>
    <input type='text' name='cover' onChange={handleChange} className='border'/>
   </div>
    <div>
    <label>Book price</label>
    <input type='value' name='price' onChange={handleChange} className='border'/>
   </div>
   <button type='submit' className='bg-green-500'>Submit</button>
    </form>
    </>
  )
}

export default Add_book