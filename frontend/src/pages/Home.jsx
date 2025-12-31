import React, { useEffect, useState } from 'react'
import axios from "axios";
import {Link} from "react-router-dom"

function Home() {
  const [books, setBooks] = useState([])
  const fetchBook = async()=>{
    try{
    const res = await axios.get("http://localhost:8081/books")
    setBooks(res.data)
    console.log(res.data);
    }
    catch(err)
      {
       console.log(err);   
    }
  }
    useEffect(()=>{
    fetchBook()
  },[])
  return (
    <div className='flex items-center justify-center h-screen gap-5'>
      {books.length>0 ? (
        books.map((book)=>(
 <div key={book.id}>
<p className='bg-cyan-200'>{book.cover && <img src={book.cover}/>}</p>
<h1 className='text-2xl '>{book.title}</h1>
<p className='text-center'>{book.desc}</p>
<span>{book.price}</span> <br></br>
<button>Delete</button>
<Link to={`/update_book/${book.id}`}>Update</Link>

</div>
        ))
      ):(<p>No data found</p>)} <br></br>
      <Link to="/add_book">Add Book</Link>
    </div>
    
  )
}

export default Home