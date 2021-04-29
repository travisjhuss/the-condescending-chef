import { makeStyles } from '@material-ui/core';

// custom styles
const useStyles = makeStyles({
  input: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#94836d',
      },
      '&:hover fieldset': {
        borderColor: ' #ad4830',
        border: '#a0432c 4px solid',
      },
    },
    backgroundColor: '#fff4dd',
    borderRadius: '3px',
    border: '#a0432c 2px solid',
    margin: '2px',
  },
  resize: {
    fontSize: '18px',
  },
  table: {
    backgroundColor: '#fff4dd',
    margin: 'auto',
    width: '800px',
  },
  head: {
    backgroundColor: '#ad4830',
  },
  body: {
    '&:nth-of-type(even)': {
      backgroundColor: '#dbd1bd',
    },
  },
  paper: {
    backgroundColor: '#fff4dd',
    margin: 'auto',
    padding: '10px',
    overflow: 'scroll',
  },
  container: {
    marginTop: '50px',
    marginLeft: '325px',
    marginRight: '75px',
  },
  card: {
    backgroundColor: '#ad4830',
    borderRadius: '3px',
    margin: '5px 50px',
    height: '200px',
  },
  head: {
    marginBottom: '30px',
  },
  select: {
    backgroundColor: '#fff4dd',
    border: '1px, #ad4830, solid',
    height: '30px',
    marginBottom: '30px',
  },
  feedback: {
    backgroundColor: '#fff4dd',
    height: '200px',
    overflow: 'scroll',
  },
  logo: {
    color: '#94836d',
    fontSize: '40px',
  },
  button: {
    textTransform: 'none',
  },
  card2: {
    backgroundColor: '#ad4830',
    borderRadius: '3px',
    margin: '2px',
  },
  logoBig: {
    color: '#94836d',
    fontSize: '150px',
    position: 'absolute',
    marginLeft: '-70px',
    marginTop: '-29px',
  },
  recipeDetailButton: {
    marginRight: "30px",
  },
  paperHead: {
    backgroundColor: '#ad4830',
    padding: '5px',
    width: '400px'
  },
  paperBody: {
    backgroundColor: '#fff4dd',
    padding: '5px',
    width: '400px'
  },
});

export default useStyles;
