import React from 'react'
import HTMLReactParser from "html-react-parser"

class PushButton extends React.Component {

  render(){
    return <div className='pushButton'>
      <button data-genre={this.props.label} disabled={this.props.disabled}
      onClick={()=>this.props.handler(this.props.label)} >
      {HTMLReactParser(this.props.label)}</button>
    </div>
  }

}

export default PushButton;
