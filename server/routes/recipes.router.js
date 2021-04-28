const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
// middleware for checking login
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET all recipes
router.get('/', (req, res) => {
    const sqlText = `
        SELECT * FROM "recipes"
        `;
    pool.query(sqlText)
        .then((result) => {
            console.log(result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        });
});

// GET details from selected recipe
router.get('/:id', (req, res) => {
    // Get id from req.params
    const id = req.params.id;
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

// GET ingredients from selected recipe
router.get('/ingredients/:id', (req, res) => {
    // Get id from req.params
    const id = req.params.id;
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


// DELETE a recipe if it's something the logged in user added
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

// PUT for editing user recipe
router.put('/:id', rejectUnauthenticated, (req, res) => {
   // check for if recipe is user recipe or outside url
    if (req.body.url === null) {
        // if recipe does not have url it is user recipe
        // get recipe if from req.params
        let recipeIdToUpdate = req.params.id;
        let sqlTextForRecipes = `
        UPDATE "recipes" 
        SET "name" = $1, 
        "description" = $2, 
        "photo" = $3, 
        "tags" = $4,
        "marked_for_review" = $5
        WHERE id = $6
        `;
        pool.query(sqlTextForRecipes, [req.body.name, req.body.description, req.body.photo, req.body.tags, req.body.marked_for_review, recipeIdToUpdate])
            .then((result) => {
                // SECOND query
                // delete previous ingredients where recipe_id matches edited recipe id
                const sqlTextDeleteIngredients = `
                DELETE FROM "ingredients"
                WHERE "recipe_id" = $1;
                `;
                pool.query(sqlTextDeleteIngredients, [recipeIdToUpdate])
                    .then((result) => {
                        // find new ingredients in req.body, assign to variable
                        const newIngredients = req.body.ingredients;
                        const sqlTextChangeIngredients = `
                        INSERT INTO "ingredients" ("recipe_id", "name", "unit", "amount")
                        VALUES ($1, $2, $3, $4);
                        `;
                        // go through each ingredient in array and insert into database
                        newIngredients.forEach((ingredient) => {
                            // THIRD QUERY
                            pool.query(sqlTextChangeIngredients, [recipeIdToUpdate, ingredient.name, ingredient.unit, ingredient.amount]).then(result => {
                                //If statement checks to see if we have reached the last ingredient before sending back a 201
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
                        // catch for second query
                        console.log(`Error making database query ${sqlTextDeleteIngredients}`, error);
                        res.sendStatus(500);
                    })
            })
            .catch((error) => {
                // catch for first query
                console.log(`Error making database query ${sqlTextForRecipes}`, error);
                res.sendStatus(500);
            });
    } else {
        // if recipe does have url, it is an outside recipe
        let recipeIdToUpdate = req.params.id;
        let sqlTextForRecipes = `
            UPDATE "recipes" 
            SET "name" = $1,  
            "photo" = $2, 
            "url" = $3,
            "tags" = $4,
            "marked_for_review" = $5
            WHERE id = $6
            `;
        pool.query(sqlTextForRecipes, [req.body.name, req.body.photo, req.body.url, req.body.tags, req.body.marked_for_review, recipeIdToUpdate])
            .then((result) => {
                res.sendStatus(201);
            }).catch((err) => {
                console.log(err);
            })
    }
});

module.exports = router;