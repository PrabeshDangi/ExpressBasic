
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})//Yo line require app vanda jahile agadi hunu parchha


const app=require('./app')
mongoose.connect(process.env.CONN_STR,{
    useNewUrlParser:true
}).then((conn)=>{
    //console.log(conn);
    console.log("DB Connection successful")
}).catch((err)=>{
    console.log("some error has occurred!!")
})
//console.log(process.env)
//Creating the server
const port=process.env.PORT||5000;

app.listen(port,()=>{        //Losalhost ma host vayeko app lai server pani create garaidinchha ra server ma aako request lai nee handle garchha
    console.log("server has started....")
})
