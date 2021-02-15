const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
// middleware for checking login
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET details from selected recipe
router.get('/:id', (req, res) => {
    // Get id from req.params
    const id = req.params.id;
    console.log('get details for recipe id:', id);
    const sqlText = `
        SELECT * FROM "recipes"
        WHERE "id" = $1;
        `;
    pool.query(sqlText, [id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        });
});

// GET genres from selected movie
router.get('/ingredients/:id', (req, res) => {
    // Get id from req.params
    const id = req.params.id;
    console.log('get ingredients for recipe id:', id);
    const sqlText = `
        SELECT "ingredients".id, "ingredients".amount, "ingredients".unit, "ingredients".name FROM "ingredients"
        JOIN "recipes" ON "recipes".id = "ingredients".recipe_id
        WHERE "recipes".id = $1;
        `;
    pool.query(sqlText, [id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        });
});


// Delete a recipe if it's something the logged in user added
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const recipeId = req.params.id;
    const sqlText = `
      DELETE FROM "recipes"
      WHERE id = $1 AND "user_id" = $2;
    `
    pool.query(sqlText, [recipeId, req.user.id])
        .then((result) => {
            console.log(result)
            res.sendStatus(200)
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(500)
        })
});

router.put('/:id', (req, res) => {
    // Update this single recipe
    console.log('req.body in recipes PUT', req.body);
    
    const recipeIdToUpdate = req.params.id;
    const sqlTextForRecipes = `
        UPDATE "recipes" 
        SET "name" = $1, 
        "description" = $2, 
        "photo" = $3, 
        "tags" = $4
        WHERE id = $5
        `;

    pool.query(sqlTextForRecipes, [req.body.name, req.body.description, req.body.photo, req.body.tags, recipeIdToUpdate])
        .then((result) => {
            const sqlTextDeleteIngredients = `
                DELETE FROM "ingredients"
                WHERE "recipe_id" = $1;
                `;
            pool.query(sqlTextDeleteIngredients, [recipeIdToUpdate])
                .then((result) => {
                    const newIngredients = req.body.ingredients;
                    console.log('newIngs', newIngredients);
                    
                    const sqlTextChangeIngredients =`
                    INSERT INTO "ingredients" ("recipe_id", "name", "unit", "amount")
                    VALUES ($1, $2, $3, $4);
                    `;

                    newIngredients.forEach((ingredient) => {
                        // THIRD QUERY
                        pool.query(sqlTextChangeIngredients, [recipeIdToUpdate, ingredient.name, ingredient.unit, ingredient.amount]).then(result => {
                          //If statement checks to see if we have reached the last ing before sending back a 201
                          if (ingredient === newIngredients[newIngredients - 1]) {
                            res.sendStatus(201);
                          }
                        }).catch(error => {
                          // catch for third query
                          console.log(`Error making database query ${sqlTextChangeIngredients}`, error);
                          res.sendStatus(500)
                        })
                      })
                })
                .catch((error) => {
                    console.log(`Error making database query ${sqlTextDeleteIngredients}`, error);
                    res.sendStatus(500);
                })
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlTextForRecipes}`, error);
            res.sendStatus(500);
        });
});

module.exports = router;