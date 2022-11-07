const express=require('express');
const app =express();
const cors=require('cors')
const port= process.env.PORt|| 5000;
app.use(cors())
app.use(express.json())
// 1 testing purpuse
app.get('/', (req,res)=>{
    res.send('service review running')
})
app.listen(port,()=>{
    console.log(' running',port)
})
