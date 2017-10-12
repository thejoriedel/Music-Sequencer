import React, { Component } from 'react';
import Tone from 'tone';
import Cymbol from './E-Mu-Proteus-FX-Wacky-Ride-Cymbal.wav';

class Notes extends Component {
    render() {
        return (
            <div className="notes" onClick={() => {this.props.handleClick(this.props.row, this.props.note)}} style={{ backgroundColor: this.props.color }} >
            </div>
        );
    }
}
class NoteRow extends Component {
    render() {
        const noteElements = this.props.colors.map((color, i) => (
            <Notes key={this.props.row + i} row={this.props.row} note={i} noteOn={this.props.noteOn} color={color} handleClick={this.props.handleClick} />
        ))
        // let array = [];
        // for (let x = 0; x < 16; x++) {
        //     array.push(
        //         <Notes 
        //         id={x}
        //         key={x}
        //         handleClick = {this.props.handleClick}
        //         noteOn={this.props.noteOn}
        //         colors={this.props.colors}
        //         />
        //     );
    return (
        <div className="noteRow">
            {noteElements}
        </div>
        );
    }
}
class Grid extends Component {
    render() {
        const rowElements = this.props.rows.map((colors, i) => (
           <NoteRow key={i} row={i} colors={colors} noteOn={this.props.noteOn} handleClick={this.props.handleClick} /> 
        ))
        // let array = [];
        // for (let x = 0; x < 4; x++) {
        //     array.push(
        //         <NoteRow
        //         key={i}
        //         letters={letters}
        //         noteOn={this.props.noteOn}
        //         colors={this.props.colors}
        //         handleClick={this.props.handleClick}
        //         />
        //     );
        // }
        return (
            <div className="grid">
                {rowElements}
            </div>
        );
    }
}
class PlayButton extends Component {
    render() {
        return (
            <button id="playbutton" onClick={() => {this.props.handlePlay()}}>{this.props.play ? 'STOP' : 'START'}</button>
        );
    }
} 
class SaveButton extends Component {//redo as function
    render () {
        return (
            <button id="savebutton">SAVE</button>
        )
    }
}

class SavedVersions extends Component {
    render () {
        const listElements = this.props.savedList.map(item => (
            <li key={item.createdAt}>{item.name} created on {item.createdAt}</li>
        ));
        return (
            <div className="savedversions">
                <h4>Previously Saved Patterns</h4>
                <ul>
                    <li><a href="#">Crinkly Tones created on 10/11/2017</a></li>
                    <li><a href="#">Smooth Butter created on 10/11/2017</a></li>
                    {listElements}
                </ul>
            </div>
        );
    }
}
let saved = [];
class App extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
        this.state = {
            rows: [
                ['white','white','white','white','white','white','white','white','white','white','white','white','white','white','white','white'],
                ['white','white','white','white','white','white','white','white','white','white','white','white','white','white','white','white'],
                ['white','white','white','white','white','white','white','white','white','white','white','white','white','white','white','white'],
                ['white','white','white','white','white','white','white','white','white','white','white','white','white','white','white','white']
            ],
            color: "white",
            noteOn: false,
            play: false,
            savedList: saved,
        }
    }

    handleClick(row, note) {
        let color = this.state.color;
        const rows = this.state.rows;
        const colorInQuestion = rows[row][note];
        //const noteInQuestion = rows[row][note];

        //if (noteInQuestion) return;
        //if (colorInQuestion) return;

        if (row === 0) {
            color = "powderblue";
        } else if (row === 1) {
            color = "lightskyblue";
        } else if (row === 2) {
            color = "mediumaquamarine";
        } else if (row === 3) {
            color = "darkseagreen";
        }
        rows[row][note] = color;
        console.log(row);
        console.log(colorInQuestion);

        this.setState({
            rows,
            color
        })
    }
    // handleNoteChange(row, col) {
    // }

    handlePlay() {
        let play = this.state.play;
        console.log('clicked!');
        const F4 = new Tone.FMOscillator("F4", "sine", "square").toMaster();
        const A4 = new Tone.FMOscillator("A4", "sine", "square").toMaster();
        const C5 = new Tone.FMOscillator("C5", "sine", "square").toMaster();
        const D5 = new Tone.FMOscillator("D5", "sine", "square").toMaster();
    
        const keys = [D5, C5, A4, F4];
    
        // var loop = new Tone.Sequence(function(time, note){
        //     // var column = rows[row][note];
        //     // var playNote = row
        //     // for (var i = 0; i < 4; i++){
        //     //     if (column[i] === 1){
        //     //         //slightly randomized velocities
        //             var vel = Math.random() * 0.5 + 0.5;
        //     //         keys[row].start(time, 0, "32n", 0, vel);
        //     //     }
        //     // }
        //     for (var i = 0; i < keys.length; i++) {
        //         keys[i].start(time, 0, "32n", 0, vel).stop(2)
        //     }

        // }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "16n");
        // Tone.Transport.start();
        // loop.start();

        var synth = new Tone.Synth().toMaster();
        var pattern = new Tone.Pattern(function(time, note){
            synth.triggerAttackRelease(note, 0.25);
        }, ["C4", "E4", "G4", "A4", "C4", "E4", "G4", "B4", "C4", "E4", "G4", "A4", "C4", "E4", "G4", "B4", "G3", "B3", "D4", "F#4", "G3", "B3", "D4", "F#4", "G3", "B3", "D4", "F#4", "G3", "B3", "D4", "F#4"]);
        pattern.playbackRate = 2;
        // Tone.Transport.bpm.value = 120;
        if (!play) {
            Tone.Transport.start();
            pattern.start(0);
            play = true;
        } else if (play) {
            Tone.Transport.stop();
            pattern.stop(0);
            pattern.cancel();
            play = false;
        }

        this.setState({play});
    }

    render () {

        return (
            <div className="container">
                <Grid 
                rows={this.state.rows}
                //color={this.state.color}
                noteOn={this.state.noteOn} 
                handleClick={this.handleClick}
                />
                <SavedVersions 
                savedList={this.state.savedList}
                />
                <PlayButton
                handlePlay={this.handlePlay}
                play={this.state.play}
                />
                <SaveButton />
            </div>
        )
    }
}
export default App;