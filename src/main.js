console.log('Hello World!');

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// don't need to import styles/css here
 
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(App),
    document.getElementById('mount')
  );
});

// var MonoSynth = require("Tone").MonoSynth;
// var synth = new MonoSynth();

//create a synth and connect it to the master output (your speakers)
// var synth = new Tone.Synth().toMaster();

//play a middle 'C' for the duration of an 8th note
// synth.triggerAttackRelease("C4", "8n");