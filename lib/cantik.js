'use babel';

import CantikView from './cantik-view';
import { CompositeDisposable } from 'atom';

export default {

  cantikView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.cantikView = new CantikView(state.cantikViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.cantikView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'cantik:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.cantikView.destroy();
  },

  serialize() {
    return {
      cantikViewState: this.cantikView.serialize()
    };
  },

  toggle() {
    console.log('Cantik was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
