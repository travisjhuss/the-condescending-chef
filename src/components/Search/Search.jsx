import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchResults from '../SearchResults/SearchResults';
import './Search.css';
// MUI
import { TextField, InputAdornment, makeStyles, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

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
        // border: '#a0432c 2px solid',
        margin: '2px'
    },
    resize: {
        fontSize: '20px'
    }
})

function Search() {

    const classes = useStyles();

    const dispatch = useDispatch();
    const searchResults = useSelector(state => state.searchResults);
    const allRecipes = useSelector(state => state.allRecipes);

    // change to fetch all recipes
    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_RECIPES' });
    }, []);

    const [searchText, setSearchText] = useState('');

    const [isThereSearch, setIsThereSearch] = useState(false);

    const handleSearch = () => {
        console.log('clicked search,', searchText);
        dispatch({ type: 'FETCH_SEARCH_RESULTS', payload: searchText });
        setIsThereSearch(true);
    }

    console.log('searchResults:', searchResults);
    return (
        <div className="search-container">
            <center>
                <form onSubmit={handleSearch}>
                    <TextField
                        id="search-text"
                        className={classes.input}
                        variant="filled"
                        label="Search"
                        style={{ width: '500px' }}
                        value={searchText}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon color="primary" />
                              </InputAdornment>
                            ),
                            classes: {
                                input: classes.resize
                            }
                          }}
                        onChange={(event) => setSearchText(event.target.value)}
                    />
                </form>
            </center>
            {isThereSearch
            ?   <SearchResults searchResults={searchResults}/>
            :   <SearchResults searchResults={allRecipes}/>
            }
        </div>
    )
}

export default Search;