import DataSheetBase from './DataSheetBase.js';

export default class DataSheet_picOfTheDa extends DataSheetBase {

  constructor(id, updateCb) {
    super(id, updateCb);
    this.requestedKeyPath = "";  // this value can be specified in the React Studio data sheet UI
  }

  makeDefaultItems() {
    // eslint-disable-next-line no-unused-vars
    let key = 1;
    // eslint-disable-next-line no-unused-vars
    let item;

    // The contents of this data sheet will be loaded by plugin 'Generic JSON'.
    
    item = {};
    this.items.push(item);
    item['title'] = "Meteors, Comet, and Big Dipper over La Palma";
    item['copyright'] = "Vincent Duparc";
    item['media_type'] = "image";
    item['hdurl'] = "https://apod.nasa.gov/apod/image/1904/Quadrantids_Duparc_1830.jpg";
    item['explanation'] = "Meteor showers are caused by streams of solid particles, dust size and larger, moving as a group through space.  In most cases, the orbits of these meteor streams can be identified with dust expelled from a comet.  When the Earth passes through a stream, the particles leave brilliant trails through the night sky as they disintegrate in Earth's atmosphere.  The meteor paths are all parallel to each other, but, like train tracks, the effect of perspective causes them to appear to originate from a radiant point in the distance.  The featured image composite was taken during January's Quadrantid meteor shower from La Palma, one of Spain's Canary Islands, off the northwest coast of Africa. The Quadrantids radiant is visible just below the handle of the Big Dipper. A careful eye will also discern the faint green coma of Comet Wirtanen.  Tonight is the peak of the modest Lyrid meteor shower, with several meteors per hour visible from dark locations with clear skies.";
    item['service_version'] = "v1";
    item['date'] = "2019-04-23";
    item['url'] = "https://apod.nasa.gov/apod/image/1904/Quadrantids_Duparc_960.jpg";
    item.key = key++;
  }

  
  urlFromOptions(options) {
    const baseUrl = "https://api.nasa.gov/planetary/apod?api_key=UuiccuagLcMdMZukzoquWfbrvSg3crG4QGKveMlA";
    
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
