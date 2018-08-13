import React, { Component } from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'

// Create our initial value...
const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: 'My first paragraph!',
                            },
                        ],
                    },
                ],
            },
        ],
    },
})

export default class TextEditor extends Component {
    state = {
        value: initialValue,
    }

    // On change, update the app's React state with the new editor value.
    onChange = ({ value }) => {
        this.setState({ value })
    }

    onKeyDown = (e, change) => {
        /*
        we want all our commands to start with the user pressing ctrl,
        if they don't--we cancel the action.
        */

        if (!e.ctrlKey) {
            return;
        }

        e.preventDefault()

        /* Decide what to do based on the key code... */
        switch (e.key) {
            /* When "b" is pressed, add a "bold" mark to the text. */
            case 'b': {
                change.addMark('bold')

                return true
            }
        }

        console.log(e.key)
    }

    render() {
        return(
            <Editor
                value={this.state.value}
                onChange={this.onChange}
                onKeyDown={this.onKeyDown}
            />
        )
    }
}