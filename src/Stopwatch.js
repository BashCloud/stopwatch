import React from 'react';
import './Stopwatch.css';

import ButtonUI from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Restore from '@material-ui/icons/Restore';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';


const formattedSeconds = (sec) =>
    Math.floor(sec / 60) +
    ':' +
    ('0' + sec % 60).slice(-2)

export default class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secondsElapsed: 0,
            laps: [],
            lastClearedIncrementer: null
        };
        this.incrementer = null;
    }

    handleStartClick() {
        this.incrementer = setInterval(() =>
            this.setState({
                secondsElapsed: this.state.secondsElapsed + 1
            })
            , 1000);
    }

    handleStopClick() {
        clearInterval(this.incrementer);
        this.setState({
            lastClearedIncrementer: this.incrementer
        });
    }

    handleResetClick() {
        clearInterval(this.incrementer);
        this.setState({
            secondsElapsed: 0,
            laps: []
        });
    }

    handleLabClick() {
        this.setState({
            laps: this.state.laps.concat([this.state.secondsElapsed])
        })
    }

    render() {
        return (
            <div className="stopwatch">
                <h1 className="stopwatch-timer">{formattedSeconds(this.state.secondsElapsed)}</h1>

                {(this.state.secondsElapsed === 0 ||
                    this.incrementer === this.state.lastClearedIncrementer
                    ? <Button className="start-btn" onClick={this.handleStartClick.bind(this)}><PlayArrow/></Button>
                    : <Button className="stop-btn" onClick={this.handleStopClick.bind(this)}><Pause /></Button>
                )}

                {(this.state.secondsElapsed !== 0 &&
                    this.incrementer !== this.state.lastClearedIncrementer
                    ? <Button onClick={this.handleLabClick.bind(this)}><PlaylistAdd /></Button>
                    : null
                )}


                {(this.state.secondsElapsed !== 0 &&
                    this.incrementer === this.state.lastClearedIncrementer
                    ? <Button onClick={this.handleResetClick.bind(this)}><Restore /></Button>
                    : null
                )}

                <ul className="stopwatch-laps">
                    {this.state.laps.map((lap, i) =>
                        <li className="stopwatch-lap"><strong>{i + 1}</strong>/ {formattedSeconds(lap)}</li>)
                    }
                </ul>
            </div>
        );
    }
}


const Button = (props) =>
  <ButtonUI variant="fab" color="primary" {...props} className={"btn " + props.className } />;