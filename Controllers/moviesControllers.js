const express=require('express');
const Movie=require('./../Models/movieModel')



exports.getAllMovies=(req,res)=>{
    
}

exports.getMovieById=(req,res)=>{
    
    
}

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

exports.updateMovie=(req,res)=>{
   
}

exports.deleteMovie=(req,res)=>{
   
}