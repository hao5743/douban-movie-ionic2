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
    this.movies.fetching = true;
    this.getMovies(0).then(res=>this.movies.fetching = false);
  }

  private getMovies(start: number) {
    if (start === 0) {
      this.pagination.start = 0;
      this.movies.subjects = [];
    }
    return this.movieService.getTom250(this.pagination.start, this.pagination.count).then(res=> {
      let movies = res.subjects;
      if (movies.length < this.pagination.count) {
        this.movies.hasMore = false;
      }
      this.pagination.start = this.pagination.start + this.pagination.count;
      this.movies.subjects = this.movies.subjects.concat(movies);
    })
  }

  pullToRefresh(refresher) {
    this.getMovies(0).then(res=>refresher.complete());
  }

  doInfinite(infiniteScroll) {
    if (!this.movies.hasMore) return;
    this.getMovies(this.pagination.start).then(res=>infiniteScroll.complete());
  }

  showMovieInfo(info) {
    let alert = this.AlertController.create({
      title: '电影信息',
      subTitle: info,
      buttons: ['好的']
    });
    alert.present();
  }


  goDetail(item) {
    this.nav.push(MovieDetailPage, {
      id: item.id
    });
  }

  showChooseMovieType() {

  }

}
