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
import SelectListView from 'atom-select-list'
import { CompositeDisposable } from 'atom'
import https from 'https'
import fs from 'fs'
import path from 'path'

// Configuration for filename
const GITIGNORE_API_CONFIG = {
    hostname: 'api.github.com',
    path: '/gitignore/templates',
    headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Atom-Gitignores-Package'
    }
}

/**
 * The module to export
 */
export default {
  // Parameters
  selectorView: null,
  filepath: null,
  panel: null,
  subscriptions: null,

  /**
   * Activates the module
   *
   * @param state the serialized previous state of the module
   */
  activate(state) {
    // Create SelectListView and add to modal panel
    this.selectorView = new SelectListView({
        items: [],
        elementForItem: this.itemView,
        didCancelSelection: () => this.closeWindow(),
        didConfirmSelection: (type) => this.create(type)
    })
    this.panel = atom.workspace.addModalPanel({
      item: this.selectorView.element,
      visible: false
    })

    // Register commands
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'gitignores:create': () => this.showCreatorWindow()
    }))

    // Get gitignore templates
    https.get(GITIGNORE_API_CONFIG, (response) => {
        var data = ''
        response.on('data', (chunk) => {data += chunk})
        response.on('end', () => {
            var items = JSON.parse(data)
            console.log('Available Gitignore Templates:')
            console.log(items)
            this.selectorView.update({items: items})
        })
    })

    // Get project file path
    this.filepath = path.join(atom.project.getPaths()[0], '.gitignore')
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
    this.panel.destroy();
    this.subscriptions.dispose();
    this.selectorView.destroy();
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
    this.panel.show()
    this.selectorView.focus()
  },

  /**
   * Creates the .gitignore file from the given type
   *
   * @param type the type of the .gitignore file
   */
  create(type) {
    // Log console
    console.log(`Creating ${type}...`)

    // Modify configuration to get path
    var customConfig = GITIGNORE_API_CONFIG
    customConfig.path = `/gitignore/templates/${type}`

    // Write file
    https.get(customConfig, (response) => {
        var data = ''
        response.on('data', (chunk) => {
            data += chunk
        })
        response.on('end', () => {
            fs.writeFile(this.filepath, JSON.parse(data).source, (err) => {
                if (err) throw err
                console.log(`${type} .gitignore created!`)
                atom.notifications.addSuccess(`${type} .gitignore created!`)
            })
        })
    })

    // Close modal window
    this.closeWindow()
  },

  /**
   * Cancels the creation and closes the window
   */
  closeWindow() {
    console.log('Canceling gitignore creation...')
    this.panel.hide()
  }
};
