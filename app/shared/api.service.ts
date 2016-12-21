import {
  Injectable
} from '@angular/core';
import {
  Http,
  Response,
  RequestOptions,
  Headers
} from '@angular/http';
import {
  ConfigService
} from './config.service';
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Api {
  private hostUrl;
  private requestOpts;

  constructor(private http: Http, private configService: ConfigService) {
    this.init();
  }

  private init() {
    //init hosturl
    this.hostUrl = this.configService.hostURL;
    //init headers
    let headers = new Headers();
    //config your request headers here
    // headers.append('Accept', '*/*');
    // headers.append('Cache-Control', 'no-cache');
    this.requestOpts = new RequestOptions({
      headers: headers
    });
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

  getWithNoParam(url) {
    return this.http.get(this.hostUrl + url)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  get(url: string, params ? : any) {
    if (params) {
      let paramsArray = [];
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])))
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&')
      } else {
        url += '&' + paramsArray.join('&')
      }
    }
    return this.http.get(this.hostUrl + url, this.requestOpts)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  post(url, body) {
    return this.http.post(this.hostUrl + url, body, this.requestOpts)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  put(url, body) {
    return this.http.put(this.hostUrl + url, body, this.requestOpts)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  delete(url) {
    return this.http.delete(this.hostUrl + url, this.requestOpts)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

}