import React, { Component, Fragment } from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import Icon from 'react-icons-kit';
import { bold } from 'react-icons-kit/feather/bold';
import { italic } from 'react-icons-kit/feather/italic';
import { underline } from 'react-icons-kit/feather/underline';
import { code } from 'react-icons-kit/feather/code';
import { list } from 'react-icons-kit/feather/list';
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
            case 'u': {
                change.toggleMark('underline')

                return true
            }
            case 'c': {
                change.toggleMark('code')

                return true
            }
            case 'l': {
                change.toggleMark('list')

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
            case 'underline':
                return <u {...props.attributes}>{props.children}</u>;
            case 'code':
                return <code {...props.attributes}>{props.children}</code>;
            case 'list':
                return (
                    <ul {...props.attributes}>
                        <li>{props.children}</li>
                    </ul>
                );
        }
    }

    onMarkClick = (e, type) => {
        /* disabling browser default behaviour like page refresh, etc */
        e.preventDefault();

        /* grabbing the this.state.value
        const { value } = this.state
        | is the same as |
        const value = this.state.value
        */
        const { value } = this.state;

        /* applying the formatting on the selected text
        which the desired formatting
        the slate model has built in functions to manipulate and format the data
        */
        const change = value.change().toggleMark(type);

        /*
        calling the onChange method we declared
        */
        this.onChange(change);
    }

    render() {
        return(
            <Fragment>
                <FormatToolbar>
                    <button className="tooltip-icon-button" onPointerDown={(e) => this.onMarkClick(e, 'bold')}>
                        <Icon icon={bold} />
                    </button>

                    <button className="tooltip-icon-button" onPointerDown={(e) => this.onMarkClick(e, 'italic')}>
                        <Icon icon={italic} />
                    </button>

                    <button className="tooltip-icon-button" onPointerDown={(e) => this.onMarkClick(e, 'underline')}>
                        <Icon icon={underline} />
                    </button>

                    <button className="tooltip-icon-button" onPointerDown={(e) => this.onMarkClick(e, 'code')}>
                        <Icon icon={code} />
                    </button>

                    <button className="tooltip-icon-button" onPointerDown={(e) => this.onMarkClick(e, 'list')}>
                        <Icon icon={list} />
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