const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})


const app=require('./app')
mongoose.connect(process.env.CONN_STR,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((conn)=>{
    //console.log(conn);
    console.log("DB Connection successful")
}).catch((err)=>{
    console.log(err)
})

//console.log(process.env)
//Creating the server
const port=process.env.PORT||5000;

app.listen(5000,()=>{       
    console.log("server has started....")
})
