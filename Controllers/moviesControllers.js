const express=require('express');
const Movie=require('./../Models/movieModel')



exports.getAllMovies=async (req,res)=>{
    try{
        const movies= await Movie.find();
        res.status(200).json({
            status:"success",
            length:movies.length,//since find method returns promise and returned value is in the form of array. so array.length..
            data:{
                movies
            }
        })
    }catch(err){
        res.status(400).json({
            status:"Fail",
            message:err.message
        })
    }
    
}

exports.getMovieById=async (req,res)=>{
    try{
        //const movie=await Movie.find({_id: req.params.id});
        const movie=await Movie.findById(req.params.id);
        res.status(200).json({
            status:"Success",
            data:{
                movie
            }
        })
    }catch(err){
        res.status(400).json({
            status:"Fail",
            message: err.message
        })
    }
}
    
    
// exports.getMovieByName=async(req,res)=>{
//         try{
//             const name=await Movie.find({name:req.params.name});
//             res.status(200).json({
//                 status:"Success",
//                 data:{
//                     movie:name
//                 }
//             })
//         }catch(err){
//             res.status(400).json({
//                 status:"Fail",
//                 message:err.message
//             })
//         }
// }

exports.postMovie=async (req,res)=>{
    try{
        const movie=await Movie.create(req.body);
        res.status(200).json({
            status:"success",
            data:{
                movie:movie
            }
        })
    }catch(err)
    {
        res.status(400).json({
            status:"Fail",
            message:"Error in creating movie object."
        })
    }
}

exports.updateMovie=async (req,res)=>{
    try{
    const updatedMovie=await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true});
   res.status(200).json({
    status:"Success",
    data:{
        movie:updatedMovie
    }
   })
    }catch(err){
        res.status(400).json({
            status:"Fail",
            message:err.message
        })
    }
}

exports.deleteMovie=async (req,res)=>{
   try{
    await Movie.findByIdAndDelete(req.params.id)
    res.status(204).json({
        status:"Success",
        data:null
    })
   }catch(err){
    res.status(400).json({
    status:"fail",
    message:err.message
    })
   }
}