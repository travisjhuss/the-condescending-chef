const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
// middleware for checking login
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('/userAddedRecipe POST route');
  console.log('req.body:', req.body);
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);

  const newRecipe = req.body.newRecipe;

  const insertRecipeQuery = `
      INSERT INTO "recipes" ("user_id", "name", "description", "photo", "marked_for_review")
      VALUES ($1, $2, $3, $4, $5)
      RETURNING "id";
      `;

  // FIRST QUERY MAKES RECIPE
  pool.query(insertRecipeQuery, [req.user.id, newRecipe.name, newRecipe.description, newRecipe.photo, newRecipe.marked_for_review])
    .then(result => {
      // ADD TO INGREDIENTS NOW
      console.log('New Recipe Id:', result.rows[0].id); //ID IS HERE!
      // ASSIGN ID TO VARIABLE
      const createdRecipeId = result.rows[0].id;
      // get ingredients
      const ingredientsToAdd = req.body.newRecipe.ingredients;
      console.log('ingredientsToAdd:', ingredientsToAdd);
      

      const insertIngredientsQuery = `
            INSERT INTO "ingredients" ("recipe_id", "name", "unit", "amount")
            VALUES ($1, $2, $3, $4);
            `;

      //Iterates through all of the genre ids in the genre array
      ingredientsToAdd.forEach((ingredient) => {
        // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
        pool.query(insertIngredientQuery, [createdRecipeId, ingredient.name, ingredient.unit, ingredient.amount]).then(result => {
          //If statement checks to see if we have reached the last genre id before sending back a 201
          if (ingredient === ingredientsToAdd[ingredientsToAdd - 1]) {
            res.sendStatus(201);
          }
        }).catch(err => {
          // catch for second query
          console.log(err);
          res.sendStatus(500)
        })
      })
    })
    // CATCH FOR FIRST QUERY
    .catch((err) => {
      console.log('add recipe failed: ', err);
      res.sendStatus(500);
    });
});

// router.post('/', (req, res) => {
//   // POST for AddMovie
//   const newMovie = req.body.newMovie
//   console.log('in router, newMovie:', newMovie);
//   // RETURNING "id" will give us back the id of the created movie
//   const insertMovieQuery = `
//     INSERT INTO "movies" ("title", "poster", "description")
//     VALUES ($1, $2, $3)
//     RETURNING "id";`

//   // FIRST QUERY MAKES MOVIE
//   pool.query(insertMovieQuery, [newMovie.title, newMovie.poster, newMovie.description])
//     .then(result => {
//       console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!

//       const createdMovieId = result.rows[0].id
//       // selected genres array from AddMovie
//       const genresToAdd = req.body.newMovie.genre_ids;
//       // loop over genre array and concatenate a string to put in sql
//       let values = '';
//       for (let i = 2; i <= genresToAdd.length + 1; i++) {
//         values += `($1, $${i}),`;
//       }
//       values = values.slice(0, -1); // Takes off the last comma

//       // Now handle the genre reference
//       const insertMovieGenreQuery = `
//         INSERT INTO "movies_genres" ("movie_id", "genre_id")
//         VALUES  ${values};
//         `

//       console.log('genresToAdd:', genresToAdd);
//       console.log('insertMovieGenreQuery:', insertMovieGenreQuery);


//       // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
//       pool.query(insertMovieGenreQuery, [createdMovieId, ...genresToAdd]).then(result => {
//         //Now that both are done, send back success!
//         res.sendStatus(201);
//       }).catch(err => {
//         // catch for second query
//         console.log('error in post to genres table:', err);
//         res.sendStatus(500)
//       })

//       // Catch for first query
//     }).catch(err => {
//       console.log(err);
//       res.sendStatus(500)
//     })
// })

// pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
//   .then(result => {
//     console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
//     const createdMovieId = result.rows[0].id
//     // Now handle the genre reference
//     const insertMovieGenreQuery = `
//       INSERT INTO "movies_genres" ("movie_id", "genre_id")
//       VALUES  ($1, $2);
//       `
//     //Iterates through all of the genre ids in the genre array
//     req.body.genre.forEach((genre) => {
//       // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
//       pool.query(insertMovieGenreQuery, [createdMovieId, genre]).then(result => {
//         //If statement checks to see if we have reached the last genre id before sending back a 201
//         if (genre === req.body.genre[req.body.genre.length - 1]) {
//           res.sendStatus(201);
//         }
//       }).catch(err => {
//         // catch for second query
//         console.log(err);
//         res.sendStatus(500)
//       })
//     })




    module.exports = router;