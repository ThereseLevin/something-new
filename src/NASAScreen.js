import React, { Component } from 'react';
import './App.css';
import PicOfTheDay from './PicOfTheDay';
import ListOfNames from './ListOfNames';

// UI framework component imports
import Button from 'muicss/lib/react/button';
import Appbar from 'muicss/lib/react/appbar';


export default class NASAScreen extends Component {

  // Properties used by this component:
  // appActions, deviceInfo

  constructor(props) {
    super(props);
    
    this.state = {
      elField_visible: true,
      field: '',
      textarea: '',
    };
  }

  textInputChanged_field = (event) => {
    this.setState({field: event.target.value});
    this.props.appActions.updateDataSlot("ds_name", event.target.value);
  }
  
  textAreaChanged_textarea = (event) => {
    this.setState({textarea: event.target.value});
  }
  
  onClick_elButton = (ev) => {
    this.sendData_button_to_names();
  
    this.setState({elField_visible: true});
  
  }
  
  
  onClick_elButton2 = (ev) => {
  
  }
  
  
  onClick_elButton4 = (ev) => {
  
  }
  
  
  onClick_elButton3 = (ev) => {
  
  }
  
  
  sendData_button_to_names = () => {
    const dataSheet = this.props.appActions.getDataSheet('names');
  
    let row = this.props.dataSheetRow || {
    };
    row = { ...row, 
      name: this.state.field,
      text: this.state.textarea,
    };
    if (this.props.dataSheetId === dataSheet.id) {
      this.props.appActions.updateInDataSheet('names', row);
    } else {
      this.props.appActions.addToDataSheet('names', row);
    }
  }
  
  
  render() {
    // eslint-disable-next-line no-unused-vars
    let baseStyle = {};
    // eslint-disable-next-line no-unused-vars
    let layoutFlowStyle = {};
    if (this.props.transitionId && this.props.transitionId.length > 0 && this.props.atTopOfScreenStack && this.props.transitionForward) {
      baseStyle.animation = '0.25s ease-in-out '+this.props.transitionId;
    }
    if ( !this.props.atTopOfScreenStack) {
      layoutFlowStyle.height = '100vh';
      layoutFlowStyle.overflow = 'hidden';
    }
    
    const dataSheet_names = this.props.dataSheets['names'];
    const dataSheet_picOfTheDa = this.props.dataSheets['picOfTheDa'];
    const style_elBackground = {
        width: '100%',
        height: '100%',
     };
    const style_elBackground_outer = {
        backgroundColor: '#f6f6f6',
     };
    const style_elList = {
        height: 'auto',  // This element is in scroll flow
     };
    // Source items and any special components used for list/grid element 'list'.
    let items_list = [];
    let listComps_list = {};
    items_list = items_list.concat(this.props.appActions.getDataSheet('picOfTheDa').items);
    
 
    const style_elList2 = {
        height: 'auto',  // This element is in scroll flow
     };
    // Source items and any special components used for list/grid element 'list 2'.
    let items_list2 = [];
    let listComps_list2 = {};
    items_list2 = items_list2.concat(this.props.appActions.getDataSheet('names').items);
    
    const style_elField = {
        display: 'block',
        color: 'grey',
        border: 'none', 
        overflow: 'auto',
        outline: 'none',
        boxShadow: 'none',
        border: 'none',
        borderBottom: '2px solid grey',
        backgroundColor: 'transparent',
        padding: '1rem',
        boxSizing: 'border-box', // ensures padding won't expand element's outer size
     };
    
    const style_elField_outer = {
        pointerEvents: 'auto',
     };
    const elField = this.state.elField_visible ? (
        <div className='baseFont elField' style={style_elField_outer}>
          <input style={style_elField} type="text" placeholder={this.props.locStrings.start_field_831060} onChange={this.textInputChanged_field} value={this.state.field}  />
        
        </div>

        
     ) : null;

   
    const style_elTextarea = {
        display: 'block',
        color: 'grey',
        backgroundColor: 'transparent',
        border: 'none', 
        overflow: 'auto',
        outline: 'none',
        boxShadow: 'none',
        resize: 'none',
        borderBottom: '2px solid grey',
        paddingLeft: '1rem',
        paddingTop: '1rem',
        boxSizing: 'border-box', // ensures padding won't expand element's outer size
     };
    
    const style_elTextarea_outer = {
        pointerEvents: 'auto',
     };
    const style_elButton = {
        display: 'block',
        backgroundColor: 'transparent',
        border: '2px solid grey',
        color: 'grey',
        textAlign: 'center',
     };
    const style_elButton_outer = {
        cursor: 'pointer',
        pointerEvents: 'auto',
     };
  
    
    return (
      <div className="AppScreen NASAScreen" style={baseStyle}>
        <div className="background">
          <div className='appBg containerMinHeight elBackground' style={style_elBackground_outer}>
            <div style={style_elBackground} />
          
          </div>
          
        </div>
        <div className="layoutFlow" style={layoutFlowStyle}>
          <div className='hasNestedComps elList'>
            <ul style={style_elList}>
              {items_list.map((row, index) => {
                let itemComp = (row._componentId) ? listComps_list[row._componentId] : <PicOfTheDay dataSheetId={'picOfTheDa'} dataSheetRow={row} {...{ 'url': row['url'], 'title': row['title'], 'explanation': row['explanation'], }} appActions={this.props.appActions} deviceInfo={this.props.deviceInfo} locStrings={this.props.locStrings} />;
                return (<li key={row.key}>{itemComp}</li>)
              })}
              <div ref={(el)=> this._elList_endMarker = el} />
            </ul>
          
          </div>
          
          
          
          <div className='hasNestedComps elList2'>
          <div class="story"><h2>Alien stories</h2><hr></hr></div>
            <div class="listan">
            
              {items_list2.map((row, index) => {
                let itemClasses = `gridItem cols2_${index % 2}`;
                let itemComp = (row._componentId) ? listComps_list2[row._componentId] : <ListOfNames dataSheetId={'names'} dataSheetRow={row} {...{ 'name': row['name'], 'text': row['text'], }} appActions={this.props.appActions} deviceInfo={this.props.deviceInfo} locStrings={this.props.locStrings} />;
                return (
                  <div className={itemClasses} key={row.key}>
                    {itemComp}
                  </div>
                )
              })}
              <div ref={(el)=> this._elList2_endMarker = el} />
            </div>
          
          </div>
          <div class="alien"><h2>Submit a story</h2></div>
          { elField }
         
          <div className='baseFont elTextarea' style={style_elTextarea_outer}>
          
            <textarea style={style_elTextarea}  placeholder={this.props.locStrings.start_textarea_676871} onChange={this.textAreaChanged_textarea} value={this.state.textarea}  />
            <div className='actionFont elButton' style={style_elButton_outer}>
            <Button style={style_elButton}  color="accent" onClick={this.onClick_elButton} >
              {this.props.locStrings.start_button_993644}
            </Button>
          
          </div>
          </div>
          
          
          
        </div>
        
        
        <div className="screenFgContainer">
          <div className="foreground">
            
          </div>
        </div>
      </div>
    )
  }
  

}

