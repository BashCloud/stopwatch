import React, { Component } from 'react';
import Stopwatch from './Stopwatch'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              STOP WATCH
              </Typography>
          </Toolbar>
        </AppBar>
        <Stopwatch />
      </div>
    );
  }
}

export default App;
