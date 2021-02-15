import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// MUI
import {
    makeStyles, Table,
    TableBody, TableCell,
    TableContainer, TableHead,
    TableRow, Paper,
    IconButton
}
    from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const useStyles = makeStyles({
    table: {
        backgroundColor: '#fff4dd',
        margin: 'auto',
        width: '800px',
    },
    head: {
        backgroundColor: '#ad4830',
    },
    body: {
        border: '#ad4830',
    }
})

function AdminDashboard() {

    const dispatch = useDispatch();
    const classes = useStyles();

    const recipesToReview = useSelector(state => state.admin.recipesToReview)

    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_RECIPES_FOR_REVIEW' });
    }, []);

    console.log('recipes to review:', recipesToReview);
    return (
        <div style={{ marginTop: '100px' }}>
            <TableContainer component={Paper} class={classes.table}>
                <Table >
                    <TableHead class={classes.head}>
                        <TableRow>
                            <TableCell>Recipe</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Review</TableCell>
                            <TableCell>Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody class={classes.body}>
                        {recipesToReview.map((recipe, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell>{recipe.name}</TableCell>
                                    <TableCell>{recipe.user_id}</TableCell>
                                    <TableCell>{recipe.date}</TableCell>
                                    <TableCell>
                                        <IconButton>
                                            <OpenInNewIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton>
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default AdminDashboard;