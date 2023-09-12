//Import Package
const express=require("express");//yeha require(express) garda yesle function return garchha...so return vayeko function lai 'express' variable ma store gareko chhau.. ane yeslai use garda pani function call garerai use garchhau..
const fs=require("fs");
let app=express();// yeha function call garda app vanne variable ma object return hunchha jasma bunch of methods hunchha..
let morgan=require('morgan');


const moviesRouter=require('./Routes/movieRoutes.js')

//Yesari custom middleware banauna sakinchha..
const logger=function(req,res,next){
    console.log("custom middleware called!!");
    next();
}

app.use(express.json())//yo euta middleware ho jasle request body request object ma assign gardinchha

if(process.env.NODE_ENV==='development'){//environment variable development vako bela matra fire garne else not.
    app.use(morgan('dev'));//This is just a thirdparty middleware..
}
app.use(logger);//yo middleware yeha use garda sabai route handler hai equally asar garchha.. yedi kunai route handler vanda muni use garey yo middleware vanda muni ko lagi matra effective hunchha..
app.use(express.static('./Public'))

app.use((req,res,next)=>{
    req.requestedAt=new Date().toISOString();
    next();
})


//Arko file bata aako data lai moviesRouter variable ma store garera yesari use garinchha..
app.use('/api/v1/movies',moviesRouter);

module.exports=app;