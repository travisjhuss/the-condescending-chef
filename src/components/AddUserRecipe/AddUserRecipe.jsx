import { useEffect, useState } from 'react';
// mui
import { TextField, Button, IconButton, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    input: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#94836d',
            },
            '&:hover fieldset': {
                borderColor: ' #ad4830',
                border: '#a0432c 4px solid',
            }
        },
        backgroundColor: '#fff4dd',
        borderRadius: '3px',
        border: '#a0432c 2px solid'
    }
})

function AddUserRecipe() {

    const [ingredientFields, setIngredientFields] = useState([{ value: null }]);

    function handleChange(index, event) {
        const values = [...ingredientFields];
        values[index].value = event.target.value;
        setIngredientFields(values);
    }

    function handleAdd() {
        const values = [...ingredientFields];
        values.push({ value: null });
        setIngredientFields(values);
    }

    function handleRemove(i) {
        const values = [...ingredientFields];
        values.splice(i, 1);
        setIngredientFields(values);
    }



    const classes = useStyles();

    return (
        <div className="container add-recipe">
            <TextField
                variant="filled"
                label="Recipe Name"
                className={classes.input}
            />
            <Typography variant="subtitle1" color="secondary">Ingredients</Typography>
            <button type="button" onClick={() => handleAdd()}>
                +
            </button>
            {ingredientFields.map((field, idx) => {
                return (
                    <div key={`${field}-${idx}`}>
                        <TextField
                            variant="filled"
                            label="#"
                            type="number"
                            size="small"
                            style={{ width: '70px' }}
                            className={classes.input}
                            value={field.value || ""}
                            onChange={e => handleChange(idx, e)}
                        />
                        <TextField
                            variant="filled"
                            label="unit"
                            type="text"
                            size="small"
                            style={{ width: '90px' }}
                            className={classes.input}
                            value={field.value || ""}
                            onChange={e => handleChange(idx, e)}
                        />
                        <TextField
                            variant="filled"
                            label="name"
                            type="text"
                            size="small"
                            style={{ width: '300px' }}
                            className={classes.input}
                            value={field.value || ""}
                            onChange={e => handleChange(idx, e)}
                        />
                        <button type="button" onClick={() => handleRemove(idx)}>
                            X
                        </button>
                    </div>
                );
            })
            }
        </div>
    )
}

export default AddUserRecipe;