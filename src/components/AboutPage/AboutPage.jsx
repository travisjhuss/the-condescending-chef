import React from 'react';
import { Typography } from '@material-ui/core';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <center>
        <Typography variant="h4" color="secondary">
          Welcome to
        </Typography>
        <Typography variant="h3" color="secondary">
          The Condescending Chef
        </Typography>
        <Typography variant="subtitle1" color="secondary">
          a web-app by Travis J. Huss
        </Typography>
        <hr className="line-break" />
      </center>
      <Typography variant="h6" color="secondary">
        More and more people rely on the internet as a way to get recipes. Many
        of us just want a simple recipe and end up spending half an hour looking
        through food blog after food blog only to settle on a recipe that
        doesn't deliver at the end. A lot of time and energy goes into cooking
        and having it not work out can be deflating.
      </Typography>
      <br />
      <Typography variant="h6" color="secondary">
        I had the amazing experience of working as a professional chef for 15
        years and over time you hone the ability to read a recipe and understand
        it like some read Shakespeare. I can take one look at a recipe and see
        where the red flags are.
      </Typography>
      <br />
      <Typography variant="h6" color="secondary">
        Thats where my idea for an app came from. An app built for professional
        chefs to give feedback to everyday home cooks on recipes they find
        online, or even their own personal recipes. I sincerely hope you enjoy
        using The Condescending Chef and maybe learn a thing or two.
      </Typography>
    </div>
  );
}

export default AboutPage;
