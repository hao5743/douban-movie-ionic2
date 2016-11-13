import {Component, OnInit} from '@angular/core';
import {NavController,AlertController,NavParams} from 'ionic-angular';
import 'rxjs/add/operator/map';
import {MovieService} from './movie.service';
import {ConfigService} from '../../shared/config.service';
import {Api} from '../../shared/api.service';
import {Movie} from './model/movie.model';

import {ActorPage} from './actor.component';

@Component({
  providers: [MovieService,ConfigService,Api],
  templateUrl: 'build/pages/movie/movie-detail.html'
})
export class MovieDetailPage implements OnInit{
  private movie: Movie;
  private fetching:boolean;

  constructor(private movieService:MovieService,
              private nav:NavController,
              private navParams:NavParams){
    this.fetching = false;
  }

  ngOnInit(){
    this.getMovie();
  }

  getMovie(){
    this.fetching = true;
    let id = this.navParams.get('id');
    this.movieService.getMovie(id).then(res=>{
      this.fetching = false;
      this.movie = res;
      console.log(res);
    })
  }

  goBack() {
    this.nav.pop();
  }

  getCasts(casts){
    return casts.map((e)=>e.name).join(' / ');
  }

  goActor(item){
    this.nav.push(ActorPage, {
      actorId: item.id
    });
  }

}
