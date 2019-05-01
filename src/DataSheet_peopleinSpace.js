import DataSheetBase from './DataSheetBase.js';

export default class DataSheet_peopleinSpace extends DataSheetBase {

  constructor(id, updateCb) {
    super(id, updateCb);
    this.requestedKeyPath = "people";  // this value can be specified in the React Studio data sheet UI
  }

  makeDefaultItems() {
    // eslint-disable-next-line no-unused-vars
    let key = 1;
    // eslint-disable-next-line no-unused-vars
    let item;

    // The contents of this data sheet will be loaded by plugin 'Generic JSON'.
    
    item = {};
    this.items.push(item);
    item['countryflag'] = "http://howmanypeopleareinspacerightnow.com/app/flags/flag-usa.jpg";
    item['careerdays'] = "0";
    item['biophotowidth'] = "640";
    item['biophotoheight'] = "800";
    item['bio'] = "Anne was born in Spokane Washington and has spent most her life dreaming of travelling to space. Along with a distinguished military career, Anne is a world-renowned rugby player.";
    item['title'] = "Flight Engineer";
    item['location'] = "International Space Station";
    item['biolink'] = "https://en.wikipedia.org/wiki/Anne_McClain";
    item['launchdate'] = "2018-12-03";
    item['biophoto'] = "http://howmanypeopleareinspacerightnow.com/app/biophotos/anne-mcclain.jpg";
    item['country'] = "usa";
    item['name'] = "Anne McClain";
    item['twitter'] = "https://twitter.com/AstroAnnimal";
    item.key = key++;
    
    item = {};
    this.items.push(item);
    item['countryflag'] = "http://howmanypeopleareinspacerightnow.com/app/flags/flag-canada.jpg";
    item['careerdays'] = "0";
    item['biophotowidth'] = "640";
    item['biophotoheight'] = "800";
    item['bio'] = "Born in Quebec City, David was an engineer, an astrophysicist, and a physician before joining the Canadian Space Agency.";
    item['title'] = "Flight Engineer";
    item['location'] = "International Space Station";
    item['biolink'] = "https://en.wikipedia.org/wiki/David_Saint-Jacques";
    item['launchdate'] = "2018-12-03";
    item['biophoto'] = "http://howmanypeopleareinspacerightnow.com/app/biophotos/david-saint.jpg";
    item['country'] = "canada";
    item['name'] = "David Saint-Jacques";
    item['twitter'] = "https://twitter.com/astro_davids";
    item.key = key++;
    
    item = {};
    this.items.push(item);
    item['countryflag'] = "http://howmanypeopleareinspacerightnow.com/app/flags/flag-russia.jpg";
    item['careerdays'] = "533";
    item['biophotowidth'] = "640";
    item['biophotoheight'] = "800";
    item['bio'] = "This is space veteran and Russian native Oleg’s 4th trip to the ISS.";
    item['title'] = "Flight Engineer";
    item['location'] = "International Space Station";
    item['biolink'] = "https://en.wikipedia.org/wiki/Oleg_Kononenko";
    item['launchdate'] = "2018-12-03";
    item['biophoto'] = "http://howmanypeopleareinspacerightnow.com/app/biophotos/oleg-kononenko.jpg";
    item['country'] = "russia";
    item['name'] = "Oleg Kononenko";
    item['twitter'] = "";
    item.key = key++;
    
    item = {};
    this.items.push(item);
    item['countryflag'] = "http://howmanypeopleareinspacerightnow.com/app/flags/flag-usa.jpg";
    item['careerdays'] = "0";
    item['biophotowidth'] = "640";
    item['biophotoheight'] = "800";
    item['bio'] = "Christina was born and raised in North Carolina where she also attended college. She is a scientist, engineer, and avid explorer.";
    item['title'] = "Flight Engineer";
    item['location'] = "International Space Station";
    item['biolink'] = "https://en.wikipedia.org/wiki/Christina_Koch";
    item['launchdate'] = "2019-03-14";
    item['biophoto'] = "http://howmanypeopleareinspacerightnow.com/app/biophotos/christina-koch.jpg";
    item['country'] = "usa";
    item['name'] = "Christina Koch";
    item['twitter'] = "https://twitter.com/Astro_Christina";
    item.key = key++;
    
    item = {};
    this.items.push(item);
    item['countryflag'] = "http://howmanypeopleareinspacerightnow.com/app/flags/flag-usa.jpg";
    item['careerdays'] = "0";
    item['biophotowidth'] = "640";
    item['biophotoheight'] = "800";
    item['bio'] = "Nick was born and raised in Kansas. Before joining NASA, he was a decorated Air Force pilot and trainer.";
    item['title'] = "Flight Engineer";
    item['location'] = "International Space Station";
    item['biolink'] = "https://en.wikipedia.org/wiki/Nick_Hague";
    item['launchdate'] = "2019-03-14";
    item['biophoto'] = "http://howmanypeopleareinspacerightnow.com/app/biophotos/nick-hague.jpg";
    item['country'] = "usa";
    item['name'] = "Nick Hague";
    item['twitter'] = "https://twitter.com/AstroHague";
    item.key = key++;
    
    item = {};
    this.items.push(item);
    item['countryflag'] = "http://howmanypeopleareinspacerightnow.com/app/flags/flag-russia.jpg";
    item['careerdays'] = "173";
    item['biophotowidth'] = "640";
    item['biophotoheight'] = "800";
    item['bio'] = "Russian native Alexey has been to space once before in 2016. Fun fact: he tried over 160 dishes while helping develop the menu on the ISS.";
    item['title'] = "Flight Engineer";
    item['location'] = "International Space Station";
    item['biolink'] = "http://en.roscosmos.ru/20617/";
    item['launchdate'] = "2019-03-14";
    item['biophoto'] = "http://howmanypeopleareinspacerightnow.com/app/biophotos/alexey-ovchinin.jpg";
    item['country'] = "russia";
    item['name'] = "Alexey Ovchinin";
    item['twitter'] = "https://twitter.com/alekseyovchinin";
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
