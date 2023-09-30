const express=require('express');
const Movie=require('./../Models/movieModel')


exports.getAllMovies = async (req, res) => {
    try {
        let queryStr = JSON.stringify(req.query);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        const queryObj = JSON.parse(queryStr);

        let query = Movie.find(queryObj);

        //Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.replace(","," ");
            query = query.sort(sortBy);
        }
        //console.log('Query:', query);

        // Pagination
        const page = Number(req.query.page)|| 1;
        const limit = Number(req.query.limit)||3;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);
        const movies = await query;

        res.status(200).json({
            status: "success",
            length: movies.length,
            data: {
                movies
            }
        });
    } catch (err) {
        console.log("Error:",err);
        res.status(400).json({
            status: "Fail",
            message: err.message
        });
    }
};


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