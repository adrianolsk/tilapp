import React from 'react'
import {firebase} from '../config'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {connect} from 'react-redux'
import CodeBlock from "../components/shared/code-block";
import Markdown from 'react-markdown'

import '../App.css';
import '../highlight-themes/default.css';
import '../highlight-themes/material-dark.css';
import '../highlight-themes/monokai.min.css'

import {withHandlers} from 'recompose'
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';

import 'codemirror/mode/sql/sql';

import 'codemirror/mode/css/css';

require('codemirror/lib/codemirror.css');


const initialSource = `

# Live demo

Changes are automatically rendered as you type.

* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!

## HTML block below

<blockquote>
  This blockquote will change based on the HTML settings above.
</blockquote>

## How about some code?
\`\`\`js
var React = require('react');
var Markdown = require('react-markdown');

React.render(
  <Markdown source="# Your markdown here" />,
  document.getElementById('content')
);
\`\`\`

Pretty neat, eh?

## Tables?

| Feature | Support |
| ------ | ----------- |
| tables | ✔ |
| alignment | ✔ |
| wewt | ✔ |

## More info?

Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)

---------------

A component by [VaffelNinja](http://vaffel.ninja) / Espen Hovlandsdal
`


const enhance = compose(
    firestoreConnect([{collection: 'posts'}]),
    connect(
        ({firestore}) => ({
            posts: firestore.ordered.posts,
        })),
    // withHandlers({
    //     add: () => (props) => props.firebase.add('posts', {text: initialSource})
    // })
    withHandlers({
        add: props => () =>
            props.firestore.add('posts', { text: initialSource || 'sample', done: false })
    })
)


const PostsContainer = ({add, posts = []}) => (
    <div>
        <button onClick={add}>add</button>
        {posts.map(({text, id}) => {
            debugger;
            return (
                <div key={id}>
                    <div className="result-pane">

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gridTemplateRows: '1fr',
                            height: '100%'
                        }}>
                            <div className="editor-pane">

                                {/*<Editor  value={this.state.markdownSrc} onChange={this.handleMarkdownChange} />*/}
                            </div>

                            <div className="result-pane">
                                <Markdown
                                    className="result"
                                    source={`${text}`}
                                    skipHtml={true}
                                    escapeHtml={true}
                                    renderers={{code: CodeBlock}}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            )

        })}
    </div>
)

export default enhance(PostsContainer)