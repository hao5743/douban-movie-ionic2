import {Injectable} from '@angular/core';


const devURL =  "https://api.douban.com";
const releaseURL =  "https://api.douban.com";
@Injectable()
export class ConfigService {
  mode = 'dev'; //dev or release
  hostURL = '';

  constructor() {
    this.initEnvironment();
  }

  initEnvironment(){
    if(this.mode=='dev'){
      //do sth
      this.hostURL = devURL;
    }else{
      //do sth
      this.hostURL = releaseURL;
    }
  }

  getHost() {
    return this.hostURL;
  }
}
