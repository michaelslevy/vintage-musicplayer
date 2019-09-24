import React from 'react'

class Meter extends React.Component {
  render() {
    return <div className='meterWrapper'>
        <div id={this.props.meterID} className='meter'>
           <span className='indicator minus'>-</span>
           <span className='indicator plus'>+</span>
           <div className='needle'></div>
           <div className='label'>VU</div>
            <div className='meterLine'>
                <span className='base'></span>
                <div className='danger'>
                    <span className='base'></span>
                </div>
            </div>
           <div className='needleBase'><span></span></div>
        </div>
        <div className='labelPosition'>{this.props.label}</div>
    </div>
  }
}

export default Meter;
