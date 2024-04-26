import assert from 'node:assert';

export default class Translator {
  #easymidiInput;

  #easymidiOutput;

  #fromChannel;

  #toChannel;

  #fromController;

  #toController;

  fromEasymidiInput(easymidiInput) {
    assert(easymidiInput !== undefined, new Error('easymidiInput is undefined'));
    this.#easymidiInput = easymidiInput;
    return this;
  }

  toEasymidiOutput(easymidiOutput) {
    assert(easymidiOutput !== undefined, new Error('easymidiOutput is undefined'));
    this.#easymidiOutput = easymidiOutput;
    return this;
  }

  fromChannel(channel) {
    assert(typeof channel === 'number', new Error('invalid from channel'));
    this.#fromChannel = channel;
    return this;
  }

  toChannel(channel) {
    assert(typeof channel === 'number', new Error('invalid to channel'));
    this.#toChannel = channel;
    return this;
  }

  fromController(controller) {
    assert(typeof controller === 'number', new Error('invalid from controller'));
    this.#fromController = controller;
    return this;
  }

  toController(controller) {
    assert(typeof controller === 'number', new Error('invalid to controller'));
    this.#toController = controller;
    return this;
  }

  apply() {
    assert(this.#easymidiInput !== undefined, new Error('easymidiInput is undefined'));
    assert(this.#easymidiOutput !== undefined, new Error('easymidiOutput is undefined'));
    assert(typeof this.#fromChannel === 'number', new Error('invalid from channel'));
    assert(typeof this.#toChannel === 'number', new Error('invalid to channel'));

    if (this.#fromController !== undefined) assert(typeof this.#toController === 'number', new Error('invalid to controller'));
    if (this.#toController !== undefined) assert(typeof this.#fromController === 'number', new Error('invalid from controller'));

    if (this.#fromController && this.#toController) {
      this.#easymidiInput.on('cc', (message) => {
        if (message.channel === this.#fromChannel && message.controller === this.#fromController) {
          this.#easymidiOutput.send('cc', {
            channel: this.#toChannel,
            controller: this.#toController,
            value: message.value,
          });
        }
      });
    }

    return this;
  }

  dispose() {
    this.#easymidiInput.removeAllListeners(['cc']);
    this.#easymidiInput = undefined;
    this.#easymidiOutput = undefined;
    this.#fromChannel = undefined;
    this.#toChannel = undefined;
    this.#fromController = undefined;
    this.#toController = undefined;

    return this;
  }
}

export { Translator };
