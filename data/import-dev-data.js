const mongoose=require("mongoose");
const fs=require("fs");
const dotenv=require("dotenv");
dotenv.config({path:'./config.env'})
const Movie=require('./../Models/movieModel');

//Mongoose connect
mongoose.connect(process.env.CONN_STR,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((conn)=>{
    console.log("DB Connection successful")
}).catch((err)=>{
    console.log(err)
})

//Read Movies.json file
const movies=JSON.parse(fs.readFileSync('./data/movies.json','utf-8'))

//Delete the existing movies documents from the database.
const deleteMovies=async ()=>{
    try{

        await Movie.deleteMany();
        console.log("Movies document deleted!!");
    }catch(err){
        console.log(err.message);
    }
    process.exit();
}
//Import the movies object to the database form json file
const importMovies=async ()=>{
    try{

        await Movie.create(movies);//Dherai movies document ekai patak insert garnu parey movies vanne array pass garera dB ma movie document banauna sakchhau..
        console.log("Movies document imported and created!!");
    }catch(err){
        console.log(err.message)
    }
    process.exit();
}
//console.log(process.argv)//yesle array return garchha.....array lai console.log garera herna mailchha..

if(process.argv[2]==='--import'){
    importMovies();
}
if(process.argv[2]==='--delete'){
    deleteMovies();
}

//to run this file we give command like > node data/import-dev-data.js --import
//>node data/import-dev-data.js --delete