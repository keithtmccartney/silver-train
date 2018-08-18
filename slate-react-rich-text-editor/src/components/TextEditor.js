import React, { Component, Fragment } from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import Icon from 'react-icons-kit';
import { bold } from 'react-icons-kit/feather/bold';
import { italic } from 'react-icons-kit/feather/italic';
import { BoldMark, ItalicMark, FormatToolbar } from './index';

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
                change.toggleMark('bold')

                return true
            }
            case 'i': {
                change.toggleMark('italic')

                return true
            }
            default: {
                return;
            }
        }

        console.log(e.key)
    }

    renderMark = props => {
        switch (props.mark.type) {
            case 'bold':
                return<BoldMark {...props} />
            case 'italic':
                return <ItalicMark {...props} />
        }
    }

    render() {
        return(
            <Fragment>
                <FormatToolbar>
                    <button className="tooltip-icon-button">
                        <Icon icon={bold} />
                    </button>

                    <button className="tooltip-icon-button">
                        <Icon icon={italic} />
                    </button>
                </FormatToolbar>

                <Editor
                    value={this.state.value}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    renderMark={this.renderMark}
                />
            </Fragment>
        )
    }
}