import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// MUI
import {
    makeStyles, Table,
    TableBody, TableCell,
    TableContainer, TableHead,
    TableRow, Paper
}
    from '@material-ui/core';

const useStyles = makeStyles({
    table: {
        backgroundColor: '#ad4830',
        margin: 'auto',
        width: '800px',
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
            <TableContainer component={Paper}class={classes.table}>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        // .map
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default AdminDashboard;