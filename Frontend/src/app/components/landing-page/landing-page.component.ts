import { Component, OnInit,HostListener } from '@angular/core';
import { MovieService } from 'src/app/service/movie.service';
import { Movie } from 'src/app/models/movie';
import { ActivatedRoute } from '@angular/router';
import { Providers } from 'src/app/models/providers';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  latestMovies: any = [];
  currentMovie: Movie = {};

  searchMovies: any = [];
  search: Movie = {};
  isSearchMovie: boolean = true;

  currentIndex = -1;
  title = '';

  pageYoffset = 0;
  
  @HostListener('window:scroll', ['$event']) onScroll(event: any){
    this.pageYoffset = window.pageYOffset;
  }

  constructor(private movieService: MovieService, private route: ActivatedRoute,private scroll: ViewportScroller) { 

  }

  ngOnInit(): void {
    this.getMovies();
  }
  scrollToTop(){
    this.scroll.scrollToPosition([0,0]);
  }

  getMovies() {
    this.movieService.getMovies().subscribe(
    (data: any) => {
      this.latestMovies = data.results;
      //console.log(data.results);
    });
  }

  setActive(latestMovies: Movie, index: number): void {
    this.currentMovie = latestMovies;
    this.currentIndex = index;
  }

  searchMovie(){
    this.currentMovie = {};
    this.currentIndex -1;

    this.movieService.searchMovie(this.title).subscribe((res: any) => {
      this.searchMovies = res.results;
      if(this.searchMovie.length == 0)
      {
        this.isSearchMovie = false;
      }
      console.log(this.searchMovies);
      // next: (data) => {
      //   this.searchMovies = data.search;
      //   console.log(this.searchMovies);
      // },
      // error: (e) => console.error(e)

      
    });
  }
}
