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

// Describe Gitignores
describe('Gitignores', () => {
    // Describe create command
    describe('gitignores:create', () => {
        it('Shows the selector view', () => {})
        it('Shows the selector view panel', () => {})
    })

    // When selector view is open
    describe('When selector view is open', () => {
        // Describe cancel command
        describe('core:cancel', () => {
            it('Closes the selector view', () => {})
            it('Closes the selector view panel', () => {})
        })

        // Describe confirm command
        describe('core:confirm', () => {
            it('Closes the selector view', () => {})
            it('Closes the selector view panel', () => {})
            it('Creates a new .gitignore', () => {})
        })
    })
})
