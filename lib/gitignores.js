'use babel';
/**
 * Gitignores
 *
 * Creates gitignore files
 *
 * @author  Andydevs
 * @created 6 - 16 - 2017
 */

// Imports
import SelectListView from 'atom-select-list';
import { CompositeDisposable } from 'atom';

// Default gitignore types
GITIGNORE_TYPES = [
    'Node',
    'Python',
    'C'
]

/**
 * The module to export
 */
export default {
  // Parameters
  gitignoresView: null,
  modalPanel: null,
  subscriptions: null,

  /**
   * Activates the module
   *
   * @param state the serialized previous state of the module
   */
  activate(state) {
    // Create SelectListView and modal panel
    this.gitignoresView = new SelectListView({
        items: GITIGNORE_TYPES,
        elementForItem: this.itemView,
        didCancelSelection: () => this.cancel(),
        didConfirmSelection: (type) => this.create(type)
    })
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.gitignoresView.element,
      visible: false
    });

    // Register commands
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'gitignores:create': () => this.showCreatorWindow()
    }));
  },

  /**
   * Returns the list view element for the item
   *
   * @return the list view element for the item
   */
  itemView(item) {
    var elem = document.createElement('li')
    elem.textContent = item
    return elem
  },

  /**
   * Deactivates the modules
   */
  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.gitignoresView.destroy();
  },

  /**
   * Returns the serialized state of the module
   *
   * @return the serialized state of the module
   */
  serialize() {
    return {}
  },

  /**
   * Show the creator window
   */
  showCreatorWindow() {
    console.log('Show gitignore creator window.');
    this.modalPanel.show()
    this.gitignoresView.focus()
  },

  /**
   * Creates the .gitignore file from the given type
   *
   * @param type the type of the .gitignore file
   */
  create(type) {
    console.log(`Creating ${type}...`)
    this.cancel()
  },

  /**
   * Cancels the creation and closes the window
   */
  cancel() {
    console.log('Canceling gitignore creation...')
    this.modalPanel.hide()
  }
};
