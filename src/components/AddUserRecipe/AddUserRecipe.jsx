import { useEffect, useState } from 'react';
// mui
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { TextField, Button, IconButton, makeStyles, Typography, Checkbox } from '@material-ui/core';

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
        border: '#a0432c 2px solid',
        margin: '2px'
    }
})

function AddUserRecipe() {

    const [ingredientFields, setIngredientFields] = useState([{
        amount: null,
        unit: null,
        name: null
    }]);

    function handleAmountChange(index, event) {
        const values = [...ingredientFields];
        values[index].amount = event.target.value
        setIngredientFields(values);
    }

    function handleUnitChange(index, event) {
        const values = [...ingredientFields];
        values[index].unit = event.target.value
        setIngredientFields(values);
    }

    function handleNameChange(index, event) {
        const values = [...ingredientFields];
        values[index].name = event.target.value
        setIngredientFields(values);
    }

    function handleAdd() {
        const values = [...ingredientFields];
        values.push({
            amount: null,
            unit: null,
            name: null
        });
        setIngredientFields(values);
    }

    function handleRemove(i) {
        const values = [...ingredientFields];
        values.splice(i, 1);
        setIngredientFields(values);
    }



    const classes = useStyles();

    console.log('ingredientFields:', ingredientFields);
    return (
        <div className="container add-recipe">
            <TextField
                variant="filled"
                label="Recipe Name"
                style={{ width: '500px' }}
                className={classes.input}
            />
            <TextField
                variant="filled"
                label="Photo url"
                style={{ width: '400px' }}
                className={classes.input}
            />
            <br />
            <Typography display="inline" variant="subtitle1" color="secondary">Ingredients</Typography>
            <IconButton color="primary" type="button" onClick={() => handleAdd()}>
                <AddCircleIcon />
            </IconButton>
            {ingredientFields.map((field, idx) => {
                return (
                    <div key={`${field}-${idx}`}>
                        <TextField
                            variant="filled"
                            name="amount"
                            label="#"
                            type="number"
                            size="small"
                            style={{ width: '70px' }}
                            className={classes.input}
                            value={field.amount || ""}
                            onChange={e => handleAmountChange(idx, e)}
                        />
                        <TextField
                            variant="filled"
                            name="unit"
                            label="unit"
                            type="text"
                            size="small"
                            style={{ width: '90px' }}
                            className={classes.input}
                            value={field.unit || ""}
                            onChange={e => handleUnitChange(idx, e)}
                        />
                        <TextField
                            variant="filled"
                            name="name"
                            label="name"
                            type="text"
                            size="small"
                            style={{ width: '300px' }}
                            className={classes.input}
                            value={field.name || ""}
                            onChange={e => handleNameChange(idx, e)}
                        />
                        <IconButton color="primary" type="button" onClick={() => handleRemove(idx)}>
                            <CancelIcon />
                        </IconButton>
                    </div>
                );
            })
            }
            <br />
            <TextField
                variant="filled"
                label="Description"
                multiline
                rows={10}
                style={{ width: '500px' }}
                className={classes.input}
            />
            <Typography display="inline" color="secondary">Mark for Review</Typography>
            <Checkbox
                // checked={checked}
                // onChange={handleChange}
                color="primary"
                value="true"
                style={{ color: '#ad4830' }}
            />
            <br/>
            <TextField
                variant="filled"
                label="add Tag"
                style={{ width: '400px' }}
                className={classes.input}
            />
            <IconButton color="primary" type="button" onClick={() => handleAdd()}>
                <AddCircleIcon />
            </IconButton>
        </div>
    )
}

export default AddUserRecipe;