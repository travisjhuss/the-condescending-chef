import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// MUI
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
//custom hook
import useStyles from '../../hooks/useStyles';

function AdminDashboard() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  // get recipes that need review from reducer
  const recipesToReview = useSelector((state) => state.admin.recipesToReview);

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_RECIPES_FOR_REVIEW' });
  }, []);

  const openReviewForm = (id) => {
    console.log('clicked on recipe id:', id);
    history.push(`/admin/feedback/${id}`);
  };

  const changeDate = (date) => {
    return new Date(date).toLocaleDateString('en-us');
  };

  console.log('recipes to review:', recipesToReview);
  return (
    <div className="admin-table">
      <TableContainer component={Paper} class={classes.table}>
        <Table>
          <TableHead class={classes.head}>
            <TableRow>
              <TableCell>Recipe</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Review</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipesToReview.map((recipe, i) => {
              return (
                <TableRow key={i} class={classes.body}>
                  <TableCell>{recipe.name}</TableCell>
                  <TableCell>{recipe.user_id}</TableCell>
                  <TableCell>{changeDate(recipe.date)}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => openReviewForm(recipe.id)}>
                      <OpenInNewIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AdminDashboard;
