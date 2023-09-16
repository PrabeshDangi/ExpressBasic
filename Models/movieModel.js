const mongoose=require('mongoose')

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

module.exports=Movie;