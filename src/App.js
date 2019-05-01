import React, { Component } from 'react';
import LocalizedStrings from 'react-localization';
import './App.css';
import NASAScreen from './NASAScreen.js';
import DataSheet_localizationSheet from './DataSheet_localizationSheet.js';
import DataSheet_picOfTheDa from './DataSheet_picOfTheDa.js';
import DataSheet_names from './DataSheet_names.js';
import DataSheet_peopleinSpace from './DataSheet_peopleinSpace.js';
import DataSheet_number from './DataSheet_number.js';
import firebase from 'firebase';
import firestore from 'firebase/firestore';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.dataSheets = {};
    this.dataSheets['localizationSheet'] = new DataSheet_localizationSheet('localizationSheet', this.dataSheetDidUpdate);
    this.dataSheets['picOfTheDa'] = new DataSheet_picOfTheDa('picOfTheDa', this.dataSheetDidUpdate);
    this.dataSheets['names'] = new DataSheet_names('names', this.dataSheetDidUpdate);
    this.dataSheets['peopleinSpace'] = new DataSheet_peopleinSpace('peopleinSpace', this.dataSheetDidUpdate);
    this.dataSheets['number'] = new DataSheet_number('number', this.dataSheetDidUpdate);

    this.dataSlots = {};
    this.dataSlots['ds_activeLang'] = "en";
    this.dataSlots['ds_name'] = "";

    this.updateLocalizationFromDataSheet(this.dataSheets['localizationSheet']);


    // Initialize web service plugin 'firebase 1'
    firebase.initializeApp({
    apiKey: "AIzaSyCjKQT2pcDuPIYk56phRQMqcE1MdPfrMBI",
        authDomain: "nasa-b3dd7.firebaseapp.com",
        databaseURL: "https://nasa-b3dd7.firebaseio.com",
        projectId: "nasa-b3dd7",
        storageBucket: "nasa-b3dd7.appspot.com",
        messagingSenderId: "550106753191"
    });
    firebase.firestore().settings({});
    
    this.serviceOptions_picOfTheDa = {
      dataSlots: this.dataSlots,
      servicePath: "",
      query: "",
    };
    setInterval(() => {  // Reload data regularly
      this.serviceOptions_picOfTheDa.servicePath = this.dataSheets['picOfTheDa'].expandSlotTemplateString("", this.dataSlots);
      this.loadData_picOfTheDay(this.dataSheets['picOfTheDa'], this.serviceOptions_picOfTheDa, false);
    }, 10000);
    
    this.serviceOptions_names = {
      dataSlots: this.dataSlots,
      servicePath: "name",
      query: "",
    };
    this.dataSheets['names'].firebase = firebase;
    
    this.serviceOptions_peopleinSpace = {
      dataSlots: this.dataSlots,
      servicePath: "",
      query: "",
    };
    setInterval(() => {  // Reload data regularly
      this.serviceOptions_peopleinSpace.servicePath = this.dataSheets['peopleinSpace'].expandSlotTemplateString("", this.dataSlots);
      this.loadData_people(this.dataSheets['peopleinSpace'], this.serviceOptions_peopleinSpace, false);
    }, 10000);
    
    this.serviceOptions_number = {
      dataSlots: this.dataSlots,
      servicePath: "",
      query: "",
    };
    setInterval(() => {  // Reload data regularly
      this.serviceOptions_number.servicePath = this.dataSheets['number'].expandSlotTemplateString("", this.dataSlots);
      this.loadData_people(this.dataSheets['number'], this.serviceOptions_number, false);
    }, 10000);
    

    this.state = {
      currentScreen: 'nasa',
      currentScreenProps: {},
      screenTransitionForward: true,
    }
    this.screenHistory = [ {...this.state} ];

  }

  windowDidResize = () => {
    let w = window.innerWidth;
    let formatId;
    if (w < 576) formatId = 'narrow-phone';
    else if (w < 768) formatId = 'wide-phone';
    else if (w < 1024) formatId = 'narrow-tablet';
    else formatId = 'wide-tablet';
    if (formatId !== this.state.screenFormatId) {
      this.setState({screenFormatId: formatId});
    }
  }

  componentDidMount() {
    this.windowDidResize();
    window.addEventListener('resize', this.windowDidResize);

    this.serviceOptions_picOfTheDa.servicePath = this.dataSheets['picOfTheDa'].expandSlotTemplateString("", this.dataSlots);
    this.loadData_picOfTheDay(this.dataSheets['picOfTheDa'], this.serviceOptions_picOfTheDa, true);
    
    this.serviceOptions_names.servicePath = this.dataSheets['names'].expandSlotTemplateString("name", this.dataSlots);
    this.loadData_firebase1(this.dataSheets['names'], this.serviceOptions_names, true);
    
    this.serviceOptions_peopleinSpace.servicePath = this.dataSheets['peopleinSpace'].expandSlotTemplateString("", this.dataSlots);
    this.loadData_people(this.dataSheets['peopleinSpace'], this.serviceOptions_peopleinSpace, true);
    
    this.serviceOptions_number.servicePath = this.dataSheets['number'].expandSlotTemplateString("", this.dataSlots);
    this.loadData_people(this.dataSheets['number'], this.serviceOptions_number, true);
    
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowDidResize);
  }

  isLoading() {
    return this.state.loading;
  }

  goToScreen = (screenId, props) => {
    // This method is the default implementation and could be customized by a navigation plugin.

    let screenIdx = -1;  // Check if the screen is already in the history stack, and pop back if so
    for (let i = 0; i < this.screenHistory.length; i++) {
      if (this.screenHistory[i].currentScreen === screenId) {
        screenIdx = i;
        break;
      }
    }
    if (screenIdx > -1) {
      this.screenHistory.splice(screenIdx + 1, this.screenHistory.length - screenIdx - 1);
      let prevScreenState = this.screenHistory[screenIdx];
      this.setState({...prevScreenState, screenTransitionForward: false});
    }
    else {
      props = props || {};
      let screenState = {currentScreen: screenId, currentScreenProps: props};
      this.screenHistory.push(screenState);
      this.setState({...screenState, screenTransitionForward: true});
    }
    window.scrollTo(0, 0);
  }

  goBack = () => {
    // This method is the default implementation and could be customized by a navigation plugin.
    if (this.screenHistory.length < 2)
      return;

    this.screenHistory.splice(this.screenHistory.length - 1, 1);
    let prevScreenState = this.screenHistory[this.screenHistory.length - 1];
    this.setState({...prevScreenState, screenTransitionForward: false});
    window.scrollTo(0, 0);
  }

  getDataSheet = (sheetId) => {
    // This method is the default implementation and could be customized by a state management plugin.
    return this.dataSheets[sheetId];
  }

  addToDataSheet = (sheetId, newRow, actionId) => {
    // This method is the default implementation and could be customized by a state management plugin.
    let sheet = this.dataSheets[sheetId];
    if (sheet && newRow) {
      sheet.addItem(newRow, this['serviceOptions_'+sheetId] || {});
    }
    this.setState({});
  }

  updateInDataSheet = (sheetId, row, actionId) => {
    // This method is the default implementation and could be customized by a state management plugin.
    let sheet = this.dataSheets[sheetId];
    if (sheet && row) {
      sheet.replaceItemByKey(row.key, row, this['serviceOptions_'+sheetId] || {});

      if (this.state.currentScreenProps.dataSheetRow) {
        let screenProps = {...this.state.currentScreenProps};
        screenProps.dataSheetRow = row;

        // Also update any props that were carried into a detail view
        for (let prop in screenProps) {
          if (row[prop] !== undefined) {
            screenProps[prop] = row[prop];
          }
        }
        this.setState({currentScreenProps: screenProps});
      } else {
        this.setState({});
      }
    }
  }

  removeFromDataSheet = (sheetId, row) => {
    let sheet = this.dataSheets[sheetId];
    if (sheet && row) {
      sheet.removeItem(row, this['serviceOptions_'+sheetId] || {});
    }
    this.setState({});
  }

  updateDataSlot = (slotId, value, actionId) => {
    // This method is the default implementation and could be customized by a state management plugin.
    this.dataSlots[slotId] = value;
    if (slotId === 'ds_activeLang') {
      this.locStrings.setLanguage(value);
    }

    {
      let usedSlots = [];
      let servicePath = this.dataSheets['names'].expandSlotTemplateString("name", this.dataSlots, usedSlots);
      if (usedSlots.includes(slotId)) {
        // if data sheet's content depends on this slot, reload it now
        this.serviceOptions_names.servicePath = servicePath;
        this.loadData_firebase1(this.dataSheets['names'], this.serviceOptions_names, true);
      }
    }
    this.setState({});
  }

  dataSheetDidUpdate = (dataSheet) => {
    // This method is the default implementation and could be customized by a state management plugin.
    this.setState({});
  }

  updateLocalizationFromDataSheet = (dataSheet) => {
    const stringsObj = dataSheet.getStringsByLanguage();
    if (stringsObj && Object.keys(stringsObj).length > 0) {
      this.locStrings = new LocalizedStrings(stringsObj);
    } else {
      this.locStrings = new LocalizedStrings({en: {}});
    }
    this.locStrings.setLanguage(this.dataSlots['ds_activeLang']);
  }

  loadData_picOfTheDay = (dataSheet, options, firstLoad) => {
    // This method was written by data plugin 'Generic JSON'.
   this.setState({loading: true});
    
    // clear any placeholder data before load
    if (firstLoad) {
    	dataSheet.items = [];
    }
    
    const fetchComplete = (err) => {
      if (err) {
        // This error handling comes from React Studio
        // and currently doesn't do anything useful.
        console.error('** Web service load failed: ', err);
      } else {
      }
      this.setState({loading: false});
    }
    
    const url = dataSheet.urlFromOptions(options);  // this method was written by the web service plugin
    
    const fetchOpts = {
      method: 'GET',
      headers: {},
    };
    
    fetch(url, fetchOpts)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Server error: "+response.status);
        }
        return response.json();
      })
      .then((json) => {
        dataSheet.loadFromJson(json);
        fetchComplete(null, options);
      })
      .catch((exc) => {
        fetchComplete(exc, options);
      });
  }
  loadData_firebase1 = (dataSheet, options, firstLoad) => {
    // This method was written by data plugin 'Firebase (Cloud Firestore)'.
   this.setState({loading: true});
    
    // clear any placeholder data before load
    if (firstLoad) {
      dataSheet.items = [];
    }
    
    const fetchComplete = (err) => {
      if (err) {
        // This error handling comes from React Studio
        // and currently doesn't do anything useful.
        console.error('** Web service load failed: ', err);
      } else {
      }
      this.setState({loading: false});
    }
    
    const db = firebase.firestore();
    const collection = db.collection(options.servicePath);
    const query = dataSheet.expandSlotTemplateString(options.query, this.dataSlots);
    let queryObj;
    
    if (query.length < 1) {
      queryObj = collection;
    } else {
      console.log("loading firebase data for '%s' with query: %s", options.servicePath, query);
      try {
        queryObj = eval(`(function(c){ return c.${query}; })(collection)`);
      } catch (e) {
        console.log("** error creating firebase query object from '%s': ", query, e)
        return;
      }
    }
    
    queryObj.onSnapshot(
      (querySnapshot) => {
        let jsonArr = [];
        
        if (querySnapshot.docs) {
          querySnapshot.forEach((doc) => {
            const data = { ...doc.data(), document_key: doc.id };
            jsonArr.push(data);
          });
        } else if (querySnapshot.data) {
          const doc = querySnapshot;
          const data = { ...doc.data(), document_key: doc.id };
          jsonArr.push(data);
        }    
            
        dataSheet.loadFromJson(jsonArr);
        fetchComplete(null, options);  
      },
      (err) => {
        fetchComplete(err, options);
      });  
    
    
     /*
    dbLoadingPromise.get().then((querySnapshot) => {
        let jsonArr = [];
    
        querySnapshot.forEach((doc) => {
          const data = { ...doc.data(), key: doc.id };
          jsonArr.push(data);
        });
            
        dataSheet.loadFromJson(jsonArr);
        fetchComplete(null, options);
      },
      (err) => {
        fetchComplete(err, options);
      });  
      */
    
  }
  loadData_people = (dataSheet, options, firstLoad) => {
    // This method was written by data plugin 'Generic JSON'.
   this.setState({loading: true});
    
    // clear any placeholder data before load
    if (firstLoad) {
    	dataSheet.items = [];
    }
    
    const fetchComplete = (err) => {
      if (err) {
        // This error handling comes from React Studio
        // and currently doesn't do anything useful.
        console.error('** Web service load failed: ', err);
      } else {
      }
      this.setState({loading: false});
    }
    
    const url = dataSheet.urlFromOptions(options);  // this method was written by the web service plugin
    
    const fetchOpts = {
      method: 'GET',
      headers: {},
    };
    
    fetch(url, fetchOpts)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Server error: "+response.status);
        }
        return response.json();
      })
      .then((json) => {
        dataSheet.loadFromJson(json);
        fetchComplete(null, options);
      })
      .catch((exc) => {
        fetchComplete(exc, options);
      });
  }

  render() {
    let makeElementForScreen = (screenId, baseProps, atTop, forward) => {
      let screenProps = {
        ...baseProps,
        atTopOfScreenStack: atTop,
        transitionForward: forward,
        appActions: this,
        dataSheets: this.dataSheets,
        locStrings: this.locStrings,
        deviceInfo: {
          screenFormatId: this.state.screenFormatId
        },
        'ds_activeLang': this.dataSlots['ds_activeLang'],
        'ds_name': this.dataSlots['ds_name'],
      };
      // A data sheet row was specified as the data source for this screen, so carry those props + 'dataSheetRow'.
      const dataSheetRow_NASAScreen = this.dataSheets['picOfTheDa'].items[0];
      const screenData_NASAScreen = {
        ...dataSheetRow_NASAScreen,
        dataSheetRow: dataSheetRow_NASAScreen,
      }
      switch (screenId) {
        default:
          return null;
        case 'nasa':
          return (<NASAScreen {...screenProps} {...screenData_NASAScreen} />)
      }
    }

    let screenEl = makeElementForScreen(this.state.currentScreen, this.state.currentScreenProps, true, this.state.screenTransitionForward);
    let prevScreenEl = null;
    if (this.screenHistory.length >= 2) {  // For transitions, we want to show the previous screen below
      let prevScreenState = this.screenHistory[this.screenHistory.length - 2];
      prevScreenEl = makeElementForScreen(prevScreenState.currentScreen, prevScreenState.currentScreenProps, false, this.state.screenTransitionForward);
    }

    return (
      <div className="App">
        {prevScreenEl}
        {screenEl}
      </div>
    );
  }
}
