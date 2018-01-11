import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';

import 'codemirror/mode/sql/sql';

import 'codemirror/mode/css/css';
require('codemirror/lib/codemirror.css');
// import '../codemirror.css'
const React = require('react')
// const CodeMirror = window.CodeMirrorEditor
//<CodeMirror mode="markdown" theme="monokai" value={props.value} onChange={props.onChange} />
const PropTypes = require('prop-types')
const CodeMirror = require('react-codemirror');



const codes = {
    h1: {text: '# ', cursor: 2},
    h2: {text: '## ', cursor: 3},
    h3: {text: '### ', cursor: 4},
    i: {text: '**', cursor: 1},
    b: {text: '****', cursor: 2},
    ul: {text: '* \n* \n', cursor: 2},
    ol: {text: '1. \n2. ', cursor: 3},
    imgage: {text: '![GitHub Logo](logo.svg)', cursor: 3},
    img: { text: '<img src="logo.svg" alt="Drawing" style="width: 200px;"/>\n', cursor:18},
    codeblock: {text: '```js\n/* code */\n\n```', cursor: 0, line: 2},
    link: {text: '[GitHub](http://github.com)', cursor: 2},
    quote: {text: '> ', cursor: 2},
    checkbox: {text: '- [x] \n- [ ] \n', cursor : 6},
    crossed: {text: '~~~~\n', cursor : 2}
}

class Editor extends React.Component {


    constructor() {
        super();

    }





    insert = (code) => {
        let codemirror = this.textInput;
        var cursor = codemirror.codeMirror.doc.getCursor()
        codemirror.codeMirror.doc.replaceRange(code.text, cursor);
        const line = cursor.line + (code.line || 0);
        const ch = cursor.ch + code.cursor;
        let posicao = {...cursor, ch, line};
        codemirror.codeMirror.doc.setCursor(posicao );
        codemirror.codeMirror.focus()


    }


    render() {
        const props = this.props;
        return (
            <form className="editor pure-form" style={{height: '100%'}}>
                <div>

                    <button type='button' onClick={() => this.insert(codes.h1)}>H1</button>
                    <button type='button' onClick={() => this.insert(codes.h2)}>H2</button>
                    <button type='button' onClick={() => this.insert(codes.h3)}>H3</button>
                    <button type='button' onClick={() => this.insert(codes.i)}>I</button>
                    <button type='button' onClick={() => this.insert(codes.b)}>B</button>
                    <button type='button' onClick={() => this.insert(codes.ul)}>* List</button>
                    <button type='button' onClick={() => this.insert(codes.ol)}>1. List</button>
                    <button type='button' onClick={() => this.insert(codes.imgage)}>Image</button>
                    <button type='button' onClick={() => this.insert(codes.img)}>img</button>
                    <button type='button' onClick={() => this.insert(codes.codeblock)}>codeblock</button>
                    <button type='button' onClick={() => this.insert(codes.link)}>link</button>
                    <button type='button' onClick={() => this.insert(codes.quote)}>quote</button>
                    <button type='button' onClick={() => this.insert(codes.checkbox)}>checkbox</button>
                    <button type='button' onClick={() => this.insert(codes.crossed)}>crossed</button>

                </div>
                <CodeMirror
                    ref={(input) => {
                        this.textInput = input;
                    }}
                    value={props.value}
                    onChange={props.onChange}

                    options={{
                        lineNumbers: true,
                        theme: 'monokai',
                        mode: 'markdown',

                    }}/>

            </form>
        )
    }
}

Editor.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
}

Editor.defaultProps = {
    value: ''
}

export default Editor
