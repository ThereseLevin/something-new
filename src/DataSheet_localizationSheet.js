import DataSheetBase from './DataSheetBase.js';

export default class DataSheet_localizationSheet extends DataSheetBase {

  constructor(id, updateCb) {
    super(id, updateCb);
    this.requestedKeyPath = "";  // this value can be specified in the React Studio data sheet UI
  }

  makeDefaultItems() {
    // eslint-disable-next-line no-unused-vars
    let key = 1;
    // eslint-disable-next-line no-unused-vars
    let item;
    
    item = {};
    this.items.push(item);
    item['key'] = "start_textblock_15129";
    item['en'] = "Nasa";
    
    item = {};
    this.items.push(item);
    item['key'] = "picoftheday3_textblock_289821";
    item['en'] = "Huvudrubtik";
    
    item = {};
    this.items.push(item);
    item['key'] = "picoftheday3_textblock2_82343";
    item['en'] = "TExt";
    
    item = {};
    this.items.push(item);
    item['key'] = "start_textblock2_321333";
    item['en'] = "text";
    
    item = {};
    this.items.push(item);
    item['key'] = "comp1_textblock_285414";
    item['en'] = "wgds";
    
    item = {};
    this.items.push(item);
    item['key'] = "start_button_200326";
    item['en'] = "Send";
    
    item = {};
    this.items.push(item);
    item['key'] = "start_field_746684";
    item['en'] = "Your name";
    
    item = {};
    this.items.push(item);
    item['key'] = "component1_textblock_386996";
    item['en'] = "uhi";
    
    item = {};
    this.items.push(item);
    item['key'] = "component1_textblock2_274709";
    item['en'] = "guyh";
    
    item = {};
    this.items.push(item);
    item['key'] = "start_field_831060";
    item['en'] = "Your name";
    
    item = {};
    this.items.push(item);
    item['key'] = "start_textblock2_262473";
    item['en'] = "Ditt namn:";
    
    item = {};
    this.items.push(item);
    item['key'] = "start_button_993644";
    item['en'] = "Send";
    
    item = {};
    this.items.push(item);
    item['key'] = "start_textblock3_537646";
    item['en'] = "JdvVtQCNM0A4vbylOsvY\nchevron_right\n\n";
    
    item = {};
    this.items.push(item);
    item['key'] = "listofnames_textblock_1019578";
    item['en'] = "esgdjn";
    
    item = {};
    this.items.push(item);
    item['key'] = "start_textblock3_829655";
    item['en'] = "Name";
    
    item = {};
    this.items.push(item);
    item['key'] = "listofnames_textblock2_188638";
    item['en'] = "text\n";
    
    item = {};
    this.items.push(item);
    item['key'] = "start_textarea_676871";
    item['en'] = "Your text";
    
    item = {};
    this.items.push(item);
    item['key'] = "peopleinspace_textblock_992877";
    item['en'] = "PEOPLE IN SPACE";
    
    item = {};
    this.items.push(item);
    item['key'] = "nasa_button2_826462";
    item['en'] = "Tell us";
    
    item = {};
    this.items.push(item);
    item['key'] = "tellus_button_363921";
    item['en'] = "Back";
    
    item = {};
    this.items.push(item);
    item['key'] = "peopleinspace_textblock2_754728";
    item['en'] = "Title";
    
    item = {};
    this.items.push(item);
    item['key'] = "peopleinspace_textblock2_888120";
    item['en'] = "Title";
    
    item = {};
    this.items.push(item);
    item['key'] = "peopleinspace_textblock3_1041746";
    item['en'] = "Dagar\n";
    
    item = {};
    this.items.push(item);
    item['key'] = "peopleinspace_textblock4_296273";
    item['en'] = "Land";
    
    item = {};
    this.items.push(item);
    item['key'] = "peopleinspace2_button_348529";
    item['en'] = "Back";
    
    item = {};
    this.items.push(item);
    item['key'] = "peopleinspace_textblock_632581";
    item['en'] = "Huvudrubrik";
    
    item = {};
    this.items.push(item);
    item['key'] = "peopleinspace_textblock_334501";
    item['en'] = "Huvudrubrik";
    
    item = {};
    this.items.push(item);
    item['key'] = "peopleinspace_textblock5_984531";
    item['en'] = " ";
    
    item = {};
    this.items.push(item);
    item['key'] = "peopleinspace_textblock6_967012";
    item['en'] = "Var\n";
    
    item = {};
    this.items.push(item);
    item['key'] = "nasa_button3_676110";
    item['en'] = "In space";
    
    item = {};
    this.items.push(item);
    item['key'] = "peopleinspace_textblock7_232071";
    item['en'] = "Bio";
    
    item = {};
    this.items.push(item);
    item['key'] = "nasa_button4_661543";
    item['en'] = "Number";
    
    item = {};
    this.items.push(item);
    item['key'] = "number2_button_268004";
    item['en'] = "Back";
    
    item = {};
    this.items.push(item);
    item['key'] = "number2_textblock_611624";
    item['en'] = "ojfpsgid";
    
    item = {};
    this.items.push(item);
    item['key'] = "number3_textblock_872961";
    item['en'] = "jkb";
    
    item = {};
    this.items.push(item);
    item['key'] = "nasa_button5_228190";
    item['en'] = "New button";
    
    item = {};
    this.items.push(item);
    item['key'] = "nasa_button6_37247";
    item['en'] = "New button";
    
    item = {};
    this.items.push(item);
    item['key'] = "nasa_button7_857400";
    item['en'] = "New button";
  }

  getStringsByLanguage = () => {
    let stringsByLang = {};
    for (let row of this.items) {
      const locKey = row.key;
      for (let key in row) {
        if (key === 'key')
          continue;
        let langObj = stringsByLang[key] || {};
        langObj[locKey] = row[key];
        stringsByLang[key] = langObj;
      }
    }
    return stringsByLang;
  }

}
