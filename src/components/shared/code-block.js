import  Highlight from 'react-highlight.js'
import './code-block.css'
const React = require('react');
const PropTypes = require('prop-types');


class CodeBlock extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    debugger
    return (
      <div className='code-block' data-language={this.props.language}>

         <Highlight language={this.props.language}>{this.props.value}</Highlight>
      </div>
    )
  }
}

CodeBlock.defaultProps = {
  language: ''
}

CodeBlock.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string
}

export default CodeBlock
