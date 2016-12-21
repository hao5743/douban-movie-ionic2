import {Injectable} from  '@angular/core';
import {Http,RequestOptions,Headers} from '@angular/http';
import {ConfigService} from './config.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class Api{
  private hostUrl;

  constructor(private http:Http, private configService:ConfigService){
    this.hostUrl = this.configService.getHost();
  }

  testGet(url,param){
    return new Promise(resolve => {
      this.http.get(this.hostUrl+url)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  makeRequest(type,u,body):Promise<any>{
    const url = this.hostUrl+u;

    let headers,opts;
    headers = new Headers();
    headers.append('Accept', '*/*');
    headers.append('Cache-Control','no-cache');
    opts = new RequestOptions({
      headers:headers
    });

    var that = this;
    function myRequest(){
      switch (type){
        case 'get':
          return that.http.get(url,opts);
        case 'delete':
          return that.http.delete(url,opts);
        case 'put':
          return that.http.put(url,body,opts);
        case 'post':
          return that.http.post(url,body,opts);
      }
    }
    // return new Promise((resolve) => {
    //   myRequest()
    //     .toPromise()
    //     .then(res => res.json().data)
    //     .catch((err) => {
    //         return Observable.throw(err.json().error || 'Server error');
    //     })
    //     // .subscribe(data => {
    //     //   resolve(data);
    //     // })
    //     // .catch(err => {
    //     //   console.log(err || 'Server error');
    //     //   return err;
    //     //   // return Observable.throw(err.json().error || 'Server error');
    //     // })
      
    // });
    return  myRequest()
        .toPromise()
        .then(res => res.json())
        .catch((err) => {
            console.log(err.json().error || 'Server error.');
            return err.json();
            // return Observable.throw(err.json().error || 'Server error');
        })

  }

  get(url:string, params?: any){
    if (params) {
      let paramsArray = [];
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])))
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&')
      } else {
        url += '&' + paramsArray.join('&')
      }
    }
    console.log(url);
    return this.makeRequest('get',url, null);
  }
  post(url, body){
    return this.makeRequest('post',url, body);
  }
  put(url, body){
    return this.makeRequest('put',url, body);
  }
  delete(url){
    return this.makeRequest('delete',url, null);
  }



}
