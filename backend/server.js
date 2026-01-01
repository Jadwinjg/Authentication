// import express from 'express';
// import mysql from 'mysql';
// import cors from 'cors';

// const app = express();
// app.use(cors());
// app.use(express.json());
// const port = process.env.PORT || 8081;

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "signup",
//   port: 3307
// });

// // Register new user
// app.post('/add', (req, res) => {
//   const sql = "INSERT INTO register (`name`,`email`,`password`) VALUES (?)";
//   const values = [req.body.name, req.body.email, req.body.password]

//   db.query(sql, [values], (err, result) => {
//     if (err) return res.json("Failed to add");
//     else
//     return res.json(result);
//   });
// });

// // Login check
// app.post('/check', (req, res) => {
//   const sql = "SELECT * FROM register WHERE email = ? AND password = ?";
//   const values = [req.body.email, req.body.password];

//   db.query(sql, values, (err, result) => {
//     if (err) return res.json("Error");
//     if (result.length > 0) return res.json("success");
//     else return res.json("error");
//   });
// });

// app.get("/books",(req,res)=>{
// const sql = "select * from books"
// db.query(sql,(err,result)=>{
// if(err) return res.json (err);
// else return res.json(result)
// })
// })

// app.post('/books',(req,res)=>{
// const sql = "insert into books (`title`, `desc`, `cover`, `price`) values (?)"
// const values = [req.body.title, req.body.desc, req.body.cover, req.body.price]
// db.query(sql,[values],(err,result)=>{
// if(err) {
//   console.log("Error inserting", err);
//   return res.json({msg:"Failed to add", err})}
//   else {return res.json({Msg:"Book added successfully", result})}
// })
// })

// app.put('/books/:id', (req,res)=>{
//   const sql = "update books set title=?, desc=?, cover=?, price=? where id=?" 
//   const id = req.params.id
//   const updateBook = [req.body.title, req.body.desc, req.body.cover, req.body.price, id]
//   db.query(sql,[updateBook],(err,result)=>{
//     if(err){
//       return res.json({msg:"Error occured", err})
//       console.log("Update failed");     
//     }
//        else{
//         return res.json({msg:"Values added", result})
//       }
//     }
//   )
// })

// app.listen(port, () => {
//   console.log("Server running on port", port);
// });

                                                 //MonogoDB Connection
 import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8081;

/* ---------- MongoDB Connection ---------- */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

/* ---------- Schemas ---------- */

// User schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model("register", UserSchema);

// Book schema
const BookSchema = new mongoose.Schema({
  title: String,
  desc: String,
  cover: String,
  price: Number
});

const Book = mongoose.model("books", BookSchema);

/* ---------- APIs ---------- */

// Register user
app.post("/add", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.json("Failed to add");
  }
});

// Login check
app.post("/check", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password
    });

    if (user) res.json("success");
    else res.json("error");
  } catch (err) {
    res.json("Error");
  }
});

// Get all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.json(err);
  }
});

// Add book
app.post("/books", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.json({ Msg: "Book added successfully", book });
  } catch (err) {
    res.json({ msg: "Failed to add", err });
  }
});

// Update book
app.put("/books/:id", async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ msg: "Values added", updated });
  } catch (err) {
    res.json({ msg: "Error occured", err });
  }
});

/* ---------- Server ---------- */
app.listen(port, () => {
  console.log("Server running on port", port);
});
                                                