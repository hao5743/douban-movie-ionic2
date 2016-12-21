import {Component, OnInit} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import 'rxjs/add/operator/map';

import {Api, ConfigService} from '../../shared';
import {MovieService} from './movie.service';
import {MovieDetailPage} from './movie-detail.component'
import {Movie} from './model/movie.model';

interface Movies {
  fetching: boolean,
  hasMore: boolean,
  subjects: Movie[]
}

interface Pagination {
  start: number,
  count: number
}

@Component({
  providers: [Api, ConfigService, MovieService],
  templateUrl: 'build/pages/movie/movie-list.html'
})
export class MoviePage implements OnInit {
  private movies: Movies = {
    fetching: false,
    hasMore: true,
    subjects: []
  };
  private pagination: Pagination = {
    start: 0,
    count: 15
  };

  constructor(public movieService: MovieService,
              public nav: NavController,
              public AlertController: AlertController) {
  }

  ngOnInit() {
    this.firstGet();
  }

  firstGet() {
     this.movies.subjects = [];
     this.pagination.start = 0;
     this.getMovies().then();
  }

  private getMovies() {
    this.movies.fetching = true;
    return this.movieService.getTom250(this.pagination.start, this.pagination.count).then(res=> {
      let movies : any = res.subjects;
      if (movies.length < this.pagination.count) {
        this.movies.hasMore = false;
      }
      this.pagination.start = this.pagination.start + this.pagination.count;
      movies.forEach((e)=>{
        e.castsStr = e.casts.map(e=>e.name).join(',');
        e.genresStr = e.genres.join(' / ');
      })
      this.movies.subjects = this.movies.subjects.concat(movies);
       this.movies.fetching = false;
    })
  }

  pullToRefresh(refresher) {
     this.movies.subjects = [];
     this.pagination.start = 0;
     this.getMovies().then(res=>refresher.complete());
  }

  doInfinite(infiniteScroll) {
    if (!this.movies.hasMore) return;
    this.getMovies().then(res=>infiniteScroll.complete());
  }

  showMovieInfo(info) {
    // console.log('123');
    // console.log(info);
    // let alert = this.AlertController.create({
    //   title: '电影信息',
    //   subTitle: info,
    //   buttons: ['好的']
    // });
    // alert.present();
    this.goDetail(info);

  }


  goDetail(item) {
    this.nav.push(MovieDetailPage, {
      id: item.id
    });
  }

  showChooseMovieType() {

  }

}
