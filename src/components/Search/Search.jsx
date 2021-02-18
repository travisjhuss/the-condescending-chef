import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SearchResults from '../SearchResults/SearchResults';
import useQuery from '../../hooks/useQuery';
import './Search.css';
// MUI
import { TextField, InputAdornment, makeStyles, Typography, Button } from '@material-ui/core';
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
    },
})

function Search() {

    const classes = useStyles();
    const query = useQuery();
    const dispatch = useDispatch();
    const history = useHistory();

    const searchResults = useSelector(state => state.searchResults);

    useEffect(() => {
        dispatch({ type: 'FETCH_SEARCH_RESULTS', payload: query.get('q') || '' });
    }, []);

    const [searchText, setSearchText] = useState('');


    const handleSearch = (evt) => {
        evt.preventDefault();
        console.log('clicked search,', searchText);
        dispatch({ type: 'FETCH_SEARCH_RESULTS', payload: searchText });
        history.push(`/search/?q=${searchText}`)
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

            <SearchResults searchResults={searchResults}/>
            
        </div>
    )
}

export default Search;