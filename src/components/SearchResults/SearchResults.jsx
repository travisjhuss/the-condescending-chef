import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// MUI
import {
    Button, Typography,
    Grid, Card,
    makeStyles, CardActionArea,
    CardContent, CardMedia
} from '@material-ui/core';
import './SearchResults.css';

const useStyles = makeStyles({
    card: {
        backgroundColor: '#ad4830',
        borderRadius: '3px',
        margin: '2px',
    },
    head: {
        marginBottom: '30px'
    },
    select: {
        backgroundColor: '#fff4dd',
        border: '1px, #ad4830, solid',
        height: '30px',
        marginBottom: '30px'
    },
    button: {
        textTransform: 'none'
    }
})

function SearchResults({ searchResults }) {

    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();

    const [sortType, setSortType] = useState('name');


    const openRecipe = (id) => {
        console.log('clicked on recipe id:', id);
        history.push(`/recipeDetails/${id}`);
    }

    const viewAll = () => {
        dispatch({ type: 'FETCH_SEARCH_RESULTS', payload: '' });
        history.push('/search');
    }
    // allows for sorting on the dom
    const sortedData = searchResults.sort((a, b) => {
        if (sortType === 'date' || sortType === 'chef_grade') {
            return b[sortType] > a[sortType] ? 1 : -1;
        } else {
            return a[sortType].toUpperCase() > b[sortType].toUpperCase() ? 1 : -1;
        }
    });

    return (
        <div className="search-results-container">
            <div className="view-all-btn">
                <Button
                    className={classes.button}
                    onClick={() => viewAll()}
                >
                    <Typography variant="body1" color="secondary">View All</Typography>
                </Button>
            </div>
            <div className="search-sort-container">
                <Typography variant="body1" color="secondary" display="inline">Sort by:{' '}</Typography>
                <select value={sortType} className="sort-select" onChange={(e) => setSortType(e.target.value)}>
                    <option value="date">Date</option>
                    <option value="name">Name</option>
                    <option value="chef_grade">Grade</option>
                </select>
            </div>
            <Grid container spacing={2}>
                {sortedData.map((recipe) => (
                    <Grid key={recipe.id} item xs={3}>
                        <Card className={classes.card}>
                            <CardActionArea onClick={() => openRecipe(recipe.id)}>
                                <CardMedia
                                    component="img"
                                    alt="recipe photo"
                                    height="140"
                                    image={recipe.photo}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" color="secondary">
                                        {recipe.name}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        {recipe.tags}
                                    </Typography>
                                    {recipe.chef_grade === '0'
                                        ? null
                                        : <Typography variant="h5" color="secondary" align="right">
                                            {recipe.chef_grade}
                                        </Typography>}
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default SearchResults;