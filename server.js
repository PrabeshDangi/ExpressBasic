
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

const movieSchema=new mongoose.Schema({
    name: {
        type:String,
        required:[true,'The name is required!!'],
        unique:true
    },
    description: {
        type:String,
        required:[true, 'The duration is required field!!']
    },
    duration: Number,
    ratings: {
        type:Number,
        default:1.0
    }
});
const Movie=mongoose.model('Movie',movieSchema)

const testMovies=new Movie({
    name:"Gangs of Wasseypur",
    description:"The action movie packed with some chilling and OG Scenes.",
    duration:260,
    ratings:4.5
})
testMovies.save()
.then((doc)=>{
    console.log(doc);
}).catch(err=>{
    console.log("error has occurred!!")
})
//console.log(process.env)
//Creating the server
const port=process.env.PORT||5000;

app.listen(port,()=>{        //Losalhost ma host vayeko app lai server pani create garaidinchha ra server ma aako request lai nee handle garchha
    console.log("server has started....")
})
