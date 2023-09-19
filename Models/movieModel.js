const mongoose=require('mongoose')

const movieSchema=new mongoose.Schema({
    name: {
        type:String,
        required:[true,'The name is required!!'],
        unique:true,
        trim:true
    },
    description: {
        type:String,
        required:[true, 'The duration is required field!!'],
        trim:true
    },
    duration: {
        type: Number,
        required:[true,'The duration field is required!!']
    },
    ratings: {
        type:Number,
    },
    totalRating:{
        type:Number
    },
    releaseYear:{
        type:Number,
        required:[true,'The releaseYear field is required!!']
    },
    releaseDate:{
        type:Date
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    genres:{
        type:[String],
        required:[true, 'The generes field is required!!']
    },
    directors:{
        type:[String],
        required:[true, 'Directors field is required!!']
    },
    coverImage:{
        type:[String],
        required:[true,'Image is required field!!']
    },
    actors:{
        type:[String],
        required:[true,'Actors field is required!!']
    },
    price:{
        type:Number,
        required:[true, 'Price field is required!!']
    }
});
const Movie=mongoose.model('Movie',movieSchema)

module.exports=Movie;