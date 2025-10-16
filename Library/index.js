const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;
let books = [
  {id:1,title:"Book One",author:"Author A"},
  {id:2,title:"Book Two",author:"Author B"}
];
let users = [
  {id:1,name:"Hemanth",subscriptions:true },
  {id:2,name:"Sekhar",subscriptions:true }
];
let borrowRecords = [];
app.get('/books',(req,res)=>{
  res.json(books);
});
app.get('/users',(req,res)=>{
  res.json(users);
});
app.post('/users',(req, res)=>{
  const {id,name}=req.body;
  if (!id || !name) {
    return res.status(400).send("Missing id or name");
  }
  users.push({ id, name, subscriptions: true });
  res.status(201).send("User added");
});
app.post('/borrow',(req,res)=>{
  const { userId, bookId } =req.body;
  borrowRecords.push({userId,bookId,borrowDate:new Date().toISOString(),returnDate:null});
  res.send("Book borrowed");
});
app.post('/return',(req,res)=>{
  const {userId,bookId}=req.body;
  const record=borrowRecords.find(r=>r.userId ===userId &&r.bookId ===bookId &&r.returnDate ===null);
  if (!record) return res.status(400).send("Borrow record not found");
  record.returnDate = new Date().toISOString();
  res.send("Book returned");
});
app.listen(port, () => {
  console.log(`Library API running on port ${port}`);
});
