import DataSheetBase from './DataSheetBase.js';

export default class DataSheet_number extends DataSheetBase {

  constructor(id, updateCb) {
    super(id, updateCb);
    this.requestedKeyPath = "number";  // this value can be specified in the React Studio data sheet UI
  }

  makeDefaultItems() {
    // eslint-disable-next-line no-unused-vars
    let key = 1;
    // eslint-disable-next-line no-unused-vars
    let item;

    // The contents of this data sheet will be loaded by plugin 'Generic JSON'.
    
    item = {};
    this.items.push(item);
    item['number'] = "6";
    item['people'] = [{"countryflag":"http://howmanypeopleareinspacerightnow.com/app/flags/flag-usa.jpg","careerdays":0,"biophotowidth":640,"biophotoheight":800,"title":"Flight Engineer","bio":"Anne was born in Spokane Washington and has spent most her life dreaming of travelling to space. Along with a distinguished military career, Anne is a world-renowned rugby player.","location":"International Space Station","biolink":"https://en.wikipedia.org/wiki/Anne_McClain","launchdate":"2018-12-03","biophoto":"http://howmanypeopleareinspacerightnow.com/app/biophotos/anne-mcclain.jpg","country":"usa","name":"Anne McClain","twitter":"https://twitter.com/AstroAnnimal"},{"countryflag":"http://howmanypeopleareinspacerightnow.com/app/flags/flag-canada.jpg","careerdays":0,"biophotowidth":640,"biophotoheight":800,"title":"Flight Engineer","bio":"Born in Quebec City, David was an engineer, an astrophysicist, and a physician before joining the Canadian Space Agency.","location":"International Space Station","biolink":"https://en.wikipedia.org/wiki/David_Saint-Jacques","launchdate":"2018-12-03","biophoto":"http://howmanypeopleareinspacerightnow.com/app/biophotos/david-saint.jpg","country":"canada","name":"David Saint-Jacques","twitter":"https://twitter.com/astro_davids"},{"countryflag":"http://howmanypeopleareinspacerightnow.com/app/flags/flag-russia.jpg","careerdays":533,"biophotowidth":640,"biophotoheight":800,"title":"Flight Engineer","bio":"This is space veteran and Russian native Oleg’s 4th trip to the ISS.","location":"International Space Station","biolink":"https://en.wikipedia.org/wiki/Oleg_Kononenko","launchdate":"2018-12-03","biophoto":"http://howmanypeopleareinspacerightnow.com/app/biophotos/oleg-kononenko.jpg","country":"russia","name":"Oleg Kononenko","twitter":""},{"countryflag":"http://howmanypeopleareinspacerightnow.com/app/flags/flag-usa.jpg","careerdays":0,"biophotowidth":640,"biophotoheight":800,"title":"Flight Engineer","bio":"Christina was born and raised in North Carolina where she also attended college. She is a scientist, engineer, and avid explorer.","location":"International Space Station","biolink":"https://en.wikipedia.org/wiki/Christina_Koch","launchdate":"2019-03-14","biophoto":"http://howmanypeopleareinspacerightnow.com/app/biophotos/christina-koch.jpg","country":"usa","name":"Christina Koch","twitter":"https://twitter.com/Astro_Christina"},{"countryflag":"http://howmanypeopleareinspacerightnow.com/app/flags/flag-usa.jpg","careerdays":0,"biophotowidth":640,"biophotoheight":800,"title":"Flight Engineer","bio":"Nick was born and raised in Kansas. Before joining NASA, he was a decorated Air Force pilot and trainer.","location":"International Space Station","biolink":"https://en.wikipedia.org/wiki/Nick_Hague","launchdate":"2019-03-14","biophoto":"http://howmanypeopleareinspacerightnow.com/app/biophotos/nick-hague.jpg","country":"usa","name":"Nick Hague","twitter":"https://twitter.com/AstroHague"},{"countryflag":"http://howmanypeopleareinspacerightnow.com/app/flags/flag-russia.jpg","careerdays":173,"biophotowidth":640,"biophotoheight":800,"title":"Flight Engineer","bio":"Russian native Alexey has been to space once before in 2016. Fun fact: he tried over 160 dishes while helping develop the menu on the ISS.","location":"International Space Station","biolink":"http://en.roscosmos.ru/20617/","launchdate":"2019-03-14","biophoto":"http://howmanypeopleareinspacerightnow.com/app/biophotos/alexey-ovchinin.jpg","country":"russia","name":"Alexey Ovchinin","twitter":"https://twitter.com/alekseyovchinin"}];
    item.key = key++;
  }

  
  urlFromOptions(options) {
    const baseUrl = "https://www.howmanypeopleareinspacerightnow.com/peopleinspace.json";
    
    let path = options.servicePath || '';
    if (path.length > 0 && path.substr(0, 1) !== '/' && baseUrl.substr(baseUrl.length - 1, 1) !== '/')
      path = '/'+path;
  
    let query = options.query || '';
    if (query.length > 0) {
      const dataSlots = options.dataSlots || {};
      query = "?" + this.expandSlotTemplateString(query, dataSlots);
    }
  
    return baseUrl + path + query; 
  }
  
  // this function's implementation is provided by React Studio.
  _fetchComplete = (err, options) => {
    if (err) {
      console.log('** Web service write failed: ', err, options);
    } else {
      if (this.updateCb) this.updateCb(this);
    }
  }
  
  addItem(item, options) {
    super.addItem(item, options);
    
    const url = this.urlFromOptions(options);
    
    let headers = {};
    headers['Content-Type'] = 'application/json';
  
    const fetchOpts = {
      method: 'POST',
    	headers: headers,
    	body: JSON.stringify(item),
    };
  
    fetch(url, fetchOpts)
      .then((response) => {
        if (response.status >= 400) {
          console.log("** Error sending %s to %s, response: ", fetchOpts.method, url, response);
          throw new Error("Server error: "+response.status);
        }
        return response.json();
      })
      .then((json) => {
        this._fetchComplete(null, options);
      })
      .catch((exc) => {
        this._fetchComplete(exc, options);
      });  
  }
  
  removeItem(item, options) {
    super.removeItem(item, options);
    
    const url = this.urlFromOptions(options);
    
    let headers = {};
    headers['Content-Type'] = 'application/json';
  
    const fetchOpts = {
      method: 'DELETE',
    	headers: headers,
    	body: JSON.stringify(item),
    };
  
    fetch(url, fetchOpts)
      .then((response) => {
        if (response.status >= 400) {
          console.log("** Error sending %s to %s, response: ", fetchOpts.method, url, response);
          throw new Error("Server error: "+response.status);
        }
        return response.json();
      })
      .then((json) => {
        this._fetchComplete(null, options);
      })
      .catch((exc) => {
        this._fetchComplete(exc, options);
      });  
  }
  
  replaceItemByRowIndex(idx, item, options) {
    super.replaceItemByRowIndex(idx, item, options);
    
    const url = this.urlFromOptions(options);
    
    let headers = {};
    headers['Content-Type'] = 'application/json';
  
    const fetchOpts = {
      method: 'PUT',
    	headers: headers,
    	body: JSON.stringify(item),
    };
  
    fetch(url, fetchOpts)
      .then((response) => {
        if (response.status >= 400) {
          console.log("** Error sending %s to %s, response: ", fetchOpts.method, url, response);
          throw new Error("Server error: "+response.status);
        }
        return response.json();
      })
      .then((json) => {
        this._fetchComplete(null, options);
      })
      .catch((exc) => {
        this._fetchComplete(exc, options);
      });  
  }
  

}
