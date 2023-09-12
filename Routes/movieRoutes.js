const express=require('express');
const moviesController=require('./../Controllers/moviesControllers')
// //GET- /api/v1/movies
// router.get("/api/v1/movies",getAllMovies)

// //POST- Route handler(/api/v1/movies)
// router.post('/api/v1/movies',postMovie)

// //GET-Handling route parameters(/api/v1/movies/:id) hamile yesari multiple route parameters diyera specific data fetch garna sakchhau.. ra yesari route parameters define garda sabai params haru specify garnu parchha else we'll get error. To solve this, we can add '?' after the required param jasko matlab tyo param optional ho bhanney bujhinchha..
// router.get("/api/v1/movies/:id",getMovieById)

// router.get("/api/v1/movies/:MovieName",getMovieByName)

// //Patch handling
// router.patch('/api/v1/movies/:id',updateMovie)

// //Delete handling
// router.delete('/api/v1/movies/:id',deleteMovie)

const router=express.Router();

router.param('id',moviesController.checkId)

router.route("/")
    .get(moviesController.getAllMovies)
    .post(moviesController.validateMovies,moviesController.postMovie);

router.route("/:id")
    .get(moviesController.getMovieById) 
    .patch(moviesController.updateMovie)
    .delete(moviesController.deleteMovie);

router.route("/:MovieName")
    .get(moviesController.getMovieByName);

    module.exports=router;