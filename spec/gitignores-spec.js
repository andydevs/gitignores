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
    var workspaceView

    // Do before each
    beforeEach(() => {
        activatedPromise = atom.packages.activatePackage('gitignores')
        workspaceView = atom.views.getView(atom.workspace)
        jasmine.attachToDOM(workspaceView)
    })

    // Describe create command
    describe('gitignores:create', () => {
        it('Shows the selector panel', () => {
            // Dispatch create command
            atom.commands.dispatch(workspaceView, 'gitignores:create')
            waitsForPromise(() => activatedPromise)

            // Run tests
            var panels = atom.workspace.getModalPanels()
            expect(panels.length).toBeGreaterThan(0)
            var selectorView = panels[0].getItem()
            expect(selectorView.classList.contains('select-list')).toBeTruthy()
            expect(selectorView.classList.contains('gitignores')).toBeTruthy()
        })
    })

    // When selector view is open
    describe('When selector view is open', () => {
        // Describe cancel command
        describe('core:cancel', () => {
            it('Closes the selector panel', (done) => {
                // Dispatch create command
                atom.commands.dispatch(workspaceView, 'gitignores:create')
                waitsForPromise(() => activatedPromise)

                // Get slector view
                var panels = atom.workspace.getModalPanels()
                var selectorView = panels[0].getItem()

                // Dispatch cancel command
                atom.commands.dispatch(selectorView, 'core:cancel')
                atom.commands.onDidDispatch(() => {
                    // Check if selector view is gone
                    var panels = atom.workspace.getModalPanels()
                    expect(panels.length).toEqual(0)
                    done()
                })
            })
        })

        // Describe confirm command
        describe('core:confirm', () => {
            it('Closes the selector panel', () => {})
            it('Creates a new .gitignore', () => {})
        })
    })
})
