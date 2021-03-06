import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SearchResults from '../SearchResults/SearchResults';
import useQuery from '../../hooks/useQuery';
// MUI
import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
// custom hook
import useStyles from '../../hooks/useStyles';

function Search() {
  const classes = useStyles();
  const query = useQuery();
  const dispatch = useDispatch();
  const history = useHistory();

  const searchResults = useSelector((state) => state.searchResults);
  // on page load, if there is already a query, keep results, or show all recipes
  useEffect(() => {
    dispatch({ type: 'FETCH_SEARCH_RESULTS', payload: query.get('q') || '' });
  }, []);

  const [searchText, setSearchText] = useState('');

  const handleSearch = (evt) => {
    evt.preventDefault();
    // send query to saga for a GET
    dispatch({ type: 'FETCH_SEARCH_RESULTS', payload: searchText });
    // store query in url to allow it to stay on refresh
    history.push(`/search/?q=${searchText}`);
  };

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
                input: classes.resize,
              },
            }}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </form>
      </center>
      {/* pass results as a prop into results component */}
      <SearchResults searchResults={searchResults} />
    </div>
  );
}

export default Search;
