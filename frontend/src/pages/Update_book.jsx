import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
function Update_book() {
    const {id} = useParams()
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

  const fetchBook = async() => {
    try{
        const res = await axios.get(`http://localhost:8081/books/${id}`)
        setAddBook(res.data)
        console.log("Fetched");     
    }
    catch(err){
        console.log(err);
        
    }
  }

  useEffect(()=>{
    fetchBook()
  },[id])
  
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
    <div>Update book</div>
    <form action="" onSubmit={handleSubmit} >
   <div>
    <label>Book title</label>
    <input type='text' name='title' value={addBook.title} onChange={handleChange} className='border'/>
   </div>
    <div>
    <label>Book desc</label>
    <input type='text' name='desc' onChange={handleChange} value={addBook.desc} className='border'/>
   </div>
    <div>
    <label>Book cover</label>
    <input type='text' name='cover' onChange={handleChange} value={addBook.cover} className='border'/>
   </div>
    <div>
    <label>Book price</label>
    <input type='value' name='price' onChange={handleChange} value={addBook.price} className='border'/>
   </div>
   <button type='submit' className='bg-green-500'>Submit</button>
    </form>
    </>
  )
}

export default Update_book