import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Api,ConfigService} from "../../shared";

import {MOVIE} from'./mock/movie.mock'
import {ACTOR} from'./mock/actor.mock'
@Injectable()
export class MovieService {
  constructor(private http: Http,private api:Api, private configService:ConfigService) {}

  getTom250(start,count) :any {
    // return this.api.get('/v2/movie/top250',{start,count});
    
    return this.api.testGet('/v2/movie/top250?start=0&count=3','');
    // console.log(start);
    // return Promise.resolve({subjects:MOVIE.subjects.slice(start,start+count)});
  }

  getMovie(id) {
    return this.api.get('/v2/movie/subject/'+id);
  }

  getActor(id):Promise<any>{
    return this.api.get('/v2/movie/celebrity/'+id);
    // return Promise.resolve(ACTOR);
  }

}

