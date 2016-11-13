import {Component, OnInit} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
import 'rxjs/add/operator/map';

import {Api,ConfigService} from '../../shared';
import {MovieService} from './movie.service';
import {Actor} from './model/actor.model';
import {MovieDetailPage} from './movie-detail.component'

@Component({
  providers: [MovieService,ConfigService,Api],
  templateUrl: 'build/pages/movie/actor.html'
})
export class ActorPage implements OnInit{
  private actor: Actor;
  private fetching: boolean;

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
    let id = this.navParams.get('actorId');
    this.movieService.getActor(id).then(res=>{
      this.actor = res;
      this.fetching = false;
    })
  }

  goMovieDetail(item){
    console.log(item.id);
    this.nav.push(MovieDetailPage, {
      id: item.id
    });
  }

  goBack() {
    this.nav.pop();
  }


}
