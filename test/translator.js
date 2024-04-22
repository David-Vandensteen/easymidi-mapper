import { easymidi, Translator } from '#src/index';

const { log } = console;

const midiInputName = process.env.MIDI_INPUT_NAME || 'IAC 1';
const midiOutputName = process.env.MIDI_OUTPUT_NAME || 'IAC 2';

let easymidiInput;
let easymidiOutput;

const availableInterfaces = () => {
  log('available midi in interfaces');
  log(easymidi.getInputs());

  log('');
  log('available midi out interfaces');
  log(easymidi.getOutputs());
};

const connect = () => {
  easymidiInput = new easymidi.Input(midiInputName);
  easymidiOutput = new easymidi.Output(midiOutputName);
};

const translate = () => {
  new Translator()
    .fromEasymidiInput(easymidiInput)
    .fromChannel(0)
    .fromController(10)
    .toEasymidiOutput(easymidiOutput)
    .toChannel(10)
    .toController(11)
    .apply();
};

const main = () => {
  availableInterfaces();
  connect();
  translate();
};

main();
