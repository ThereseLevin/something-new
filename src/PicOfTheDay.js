import React, { Component } from 'react';
import './App.css';
import img_elImage from './images/PicOfTheDay_elImage_85532.jpg';

export default class PicOfTheDay extends Component {

  // Properties used by this component:
  // url, title, explanation

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
    const style_elImage = {
        backgroundImage: 'url('+(this.props.url || img_elImage)+')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%',
        backgroundSize: 'cover',
     };
    const style_elTextBlock = {
        color: 'rgba(0, 0, 0, 0.8500)',
        textAlign: 'center',

     };
    const value_textBlock = this.props.title;
    
      const style_elTextBlock2 = {
          color: 'rgba(0, 0, 0, 0.8500)',
          textAlign: 'left',
      };
    const value_textBlock2 = this.props.explanation;
    
    
    return (
      
      <div className="PicOfTheDay" style={baseStyle}>
        <div className="background">
          <div className='appBg containerMinHeight elBackground' style={style_elBackground_outer}>
            <div style={style_elBackground} />
          
          </div>
          
        </div>
        <div className="layoutFlow">
          <div className='elImage'>
            <div style={style_elImage} />
           
          </div>
         
        </div>
        
        <div className="foreground">
        
          <div className='baseFont elTextBlock' style={style_elTextBlock}>
            <div class="front"><p class="texttitle">{value_textBlock !== undefined ? value_textBlock : (<span className="propValueMissing">{this.props.locStrings.component1_textblock_386996}</span>)}</p></div>
          </div>
          <div className='baseFont elTextBlock2' style={style_elTextBlock2}>
            <div>
              
              <p class="textpara">
              <div class="learn"><h2>Learn something new today</h2></div>
              <hr></hr>
              {value_textBlock2 !== undefined ? value_textBlock2 : (<span className="propValueMissing">{this.props.locStrings.component1_textblock2_274709}</span>)}
              
              <hr></hr>
              <h3>Want more? Come back tomarrow!</h3>
              </p>
              
            </div>

            
          </div>
        </div>
      </div>
    )
  }
  

}
