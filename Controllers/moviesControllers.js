const express=require('express');
const fs=require("fs");
const movies=JSON.parse(fs.readFileSync('./data/movies.json'));

const router=express.Router();

exports.checkId=(req,res,next,value)=>{
    console.log(`The movie has Id ${value}. `)

    //Select movie based on the given parameter..
    let movie=movies.find(el => el.id=== value * 1);
    if(!movie){
        return res.status(404).json({
            status:"Fail",
            Message:`Movie with id ${value*1} not found!!`
        })
    }
    next()
}

exports.validateMovies=(req,res,next)=>{
    if(!req.body.MovieName||!req.body.ReleaseYear)
    {
        return res.status(400).json({
            status:'Fail',
            message:'The request has not complete field!'
        })
    }
    next()
}

exports.getAllMovies=(req,res)=>{
    res.status(200).json({
        status:"success",
        requestedAt:req.requestedAt,
        count:movies.length,
        data:{
            movies:movies
        }
    })
}

exports.getMovieById=(req,res)=>{
    // console.log(req.params);
    const id= req.params.id*1
    let movie=movies.find(el => el.id===id);
    // if(!movie){
    //     return res.status(404).json({
    //         status:"Fail",
    //         Message:`Movie with id ${id} not found!!`
    //     })
    // }

    res.status(200).json({
        status:"success",
        data:{
            movie: movie
        }
    });
}

exports.postMovie=(req,res)=>{
    //console.log(req.body); Yeha req parameter le body property hold nagarney vako vayera yesko solution ko rup ka hamile middleware use garchham
    const newID=movies[movies.length-1].id+1;
    const newMovie=Object.assign({id:newID},req.body)//Existing object haru lai merge garera new object banauchha..

    movies.push(newMovie);//mathi line 6 ko movies variable ma new object, jun hamile create garyo, push garchha..

    fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
        res.status(201).json({
            status:"success",
            data:{
                movie:newMovie
            }
        })
    })
}

exports.getMovieByName=(req,res)=>{
    const MovieName=req.params.MovieName
    let Movie=movies.find(el=> el.MovieName===MovieName)
    if(Movie){
        res.status(200).json({
            status:"success",
            data:{
                movie:Movie
            }
        })
    }else{
        res.status(404).json({
            status:"Fail",
            message:`${MovieName} not found`
        })
    }
}

exports.updateMovie=(req,res)=>{
    const id=req.params.id*1;
    const movieToUpdate=movies.find(el=> el.id === id);
    
    // if(!movieToUpdate){
    //     return res.status(404).json({
    //         status:"Fail",
    //         Message:`Movie with id ${id} not found!!`
    //     })
    // }
    const index= movies.indexOf(movieToUpdate);

    Object.assign(movieToUpdate,req.body);
    movies[index]=movieToUpdate;
    

    fs.writeFile('./data/movies.json',JSON.stringify(movies),(err)=>{
        res.status(200).json({
            status:"success",
            data:{
                movie:movieToUpdate
            }
        })
    })
}

exports.deleteMovie=(req,res)=>{
    const id=req.params.id*1
    const movieToDelete=movies.find(el=> el.id===id)
    // if(!movieToDelete){
    //     return res.status(404).json({
    //         status:"Failed",
    //         message:`The movie with id ${id} not found `
    //     })
    // }

    const index=movies.indexOf(movieToDelete);

    movies.splice(index, 1)//.splice method le original array lai nai overwrite gardinchha. tyo 1 vaneko index pachhadi kati wota elelment delete garne ho vaneko ho..
    fs.writeFile("./data/movies.json",JSON.stringify(movies),(err)=>{
        res.status(204).json({
            status:"Success",
            data:{
                movie:null
            }
        })
    })
}
