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
import Gitignores from '../lib/gitignores'
import SelectListView from 'atom-select-list'

// Describe Gitignores
describe('Gitignores', () => {
    // Variables
    var activatedPromise
    var workspaceElement

    // Do before each
    beforeEach(() => {
        activatedPromise = atom.packages.activatePackage('gitignores')
        workspaceElement = atom.views.getView(atom.workspace)
        jasmine.attachToDOM(workspaceElement)
    })

    // Describe create command
    describe('gitignores:create', () => {
        it('Shows the selector panel', () => {
            // Dispatch command
            atom.commands.dispatch(workspaceElement, 'gitignores:create')
            waitsForPromise(() => activatedPromise)

            // Run tests
            var panels = atom.workspace.getModalPanels()
            expect(panels.length).toBeGreaterThan(0)
            var panel = panels[0]
            expect(panel.getItem().classList.contains('select-list')).toBeTruthy()
            expect(panel.getItem().classList.contains('gitignores')).toBeTruthy()
        })
    })

    // When selector view is open
    describe('When selector view is open', () => {
        // Describe cancel command
        describe('core:cancel', () => {
            it('Closes the selector panel', () => {})
        })

        // Describe confirm command
        describe('core:confirm', () => {
            it('Closes the selector panel', () => {})
            it('Creates a new .gitignore', () => {})
        })
    })
})
