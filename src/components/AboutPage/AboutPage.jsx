import React from 'react';
import { Typography} from '@material-ui/core';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="about-container">
      <div>
        <Typography variant="h4" color="secondary">Welcome to </Typography>
        <Typography variant="h3" color="secondary">The Condescending Chef</Typography>
        <br />
        <Typography variant="h6" color="secondary">
          Think of it as your own personal Gordon Ramsey. An online
          community and database of recipes reviewed by real chefs giving you
          the feedback you seek.
          </Typography>
        <br />
        <Typography variant="h6" color="secondary">
          Drawing from decades of real restaurant experience, our chefs will take
          the time to dig through the recipe and give feedback. Feedback can include
          not just a review of a given recipe but also tips to make it better or
          certain substitutions to consider. With the "The Condescending Chef"
          you'll get the hard truth and come out a better cook able to tackle any
          challenge in your kitchen.
        </Typography>
      </div>
    </div>
  );
}

export default AboutPage;
