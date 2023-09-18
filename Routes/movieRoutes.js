const express=require('express');
const moviesController=require('./../Controllers/moviesControllers')

const router=express.Router();


router.route("/")
    .get(moviesController.getAllMovies)
    .post(moviesController.postMovie);

router.route("/:id")
    .get(moviesController.getMovieById) 
    .patch(moviesController.updateMovie)
    .delete(moviesController.deleteMovie);

//router.route("/:name").get(moviesController.getMovieByName);


    module.exports=router;