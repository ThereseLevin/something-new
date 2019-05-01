import React, { Component } from 'react';
import './App.css';


export default class ListOfNames extends Component {

  // Properties used by this component:
  // name, text

  render() {
    // eslint-disable-next-line no-unused-vars
    let baseStyle = {};
    // eslint-disable-next-line no-unused-vars
    let layoutFlowStyle = {};
    
    const style_elBackground = {
        width: '100%',
        height: '100%',
     };
    const style_elBackground_outer = {
        backgroundColor: '#f6f6f6',
     };
    const style_elTextBlock = {
        color: 'rgba(0, 0, 0, 0.8500)',
        textAlign: 'left',
     };
    const value_textBlock = this.props.name;
    
    const style_elTextBlock2 = {
        color: 'rgba(0, 0, 0, 0.8500)',
        textAlign: 'left',
     };
    const value_textBlock2 = this.props.text;
    
    
    return (
      <div className="ListOfNames" style={baseStyle}>
        <div className="background">
          <div className='appBg containerMinHeight elBackground' style={style_elBackground_outer}>
            <div style={style_elBackground} />
          
          </div>
          
        </div>
        <div className="foreground">
          <div className='baseFont elTextBlock' style={style_elTextBlock}>
            <div>{value_textBlock !== undefined ? value_textBlock : (<span className="propValueMissing">{this.props.locStrings.listofnames_textblock_1019578}</span>)}</div>
          </div>
          <div className='baseFont elTextBlock2' style={style_elTextBlock2}>
            <div>{value_textBlock2 !== undefined ? value_textBlock2 : (<span className="propValueMissing">{this.props.locStrings.listofnames_textblock2_188638}</span>)}</div>
          </div>
        </div>
      </div>
    )
  }
  

}
