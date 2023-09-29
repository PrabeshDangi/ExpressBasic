const express=require('express');
const Movie=require('./../Models/movieModel')



// exports.getAllMovies=async (req,res)=>{
//     try{
//         //console.log(req.query);
//         //Advance filtering used.
//         let queryStr=JSON.stringify(req.query);
//         queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match)=>`$${match}`)
//         const queryObj=JSON.parse(queryStr);
//         //console.log(queryObj);

//         let query= Movie.find(queryObj); 
        
//         if(req.query.sort){
//             query=query.sort(req.query.sort)

//         }
        
//         // if(req.query.field){
//         //     const field=req.query.field.split(",").join(" ")
//         //     query=query.select(field)
//         // }

//         const page=req.query.page*1||1;
//         const limit=req.query.limit*1||10;
//         const skip=(page-1)*limit;
//         query=query.skip(skip).limit(limit);
//         const movies=await query;
//         //ALTERNATIVELY,
//         // const movies=await Movie.find()
//         //               .where('duration')
//         //               .gte(req.query.duration)
//         //               .where('ratings')
//         //               .gte(req.query.ratings)
//         //               .where('price')
//         //               .lte(req.query.price)
                        
        


//         res.status(200).json({
//             status:"success",
//             length:movies.length,//since find method returns promise and returned value is in the form of array. so array.length..
//             data:{
//                 movies
//             }
//         })
//     }catch(err){
//         res.status(400).json({
//             status:"Fail",
//             message:err.message
//         })
//     }
    
// }

exports.getAllMovies = async (req, res) => {
    try {
        let queryStr = JSON.stringify(req.query);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        const queryObj = JSON.parse(queryStr);

        let query = Movie.find(queryObj);

        //Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }
        //console.log('Query:', query);

        // Pagination
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 10;
        const skip = (page - 1) * limit;

        query = query.limit(limit).skip(skip);
        const movies = await query;
        // console.log("After breaking point.",movies)

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