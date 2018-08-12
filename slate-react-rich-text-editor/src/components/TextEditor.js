import React, { Component } from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'

export default class TextEditor extends Component {
    state = {
        value: '',
    }

    // On change, update the app's React state with the new editor value.
    onChange = ({ value }) => {
        this.setState({ value })
    }

    render() {
        return(
            <Editor value={this.state.value} onChange={this.onChange} />
        )
    }
}