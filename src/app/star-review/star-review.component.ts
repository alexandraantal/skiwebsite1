import { FirebaseService } from './../firebase.service';
import { StarService } from './../star.service';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.scss']
})
export class StarReviewComponent implements OnInit {

  @Input() cazareId;

  stars: Observable<any>;
  avgRating: Observable<any>;

  constructor(private starService: StarService, private firebaseService: FirebaseService) { }

  userStatus = this.firebaseService.userStatus;

  ngOnInit() {
    
    this.stars = this.starService.getCazareStars(this.cazareId)
    
    this.avgRating = this.stars.map(arr => {
      const ratings = arr.map(v => v.value)
      return ratings.length ? 'Nota: '+ratings.reduce((total, val) => total + val) / arr.length : 'Nu exista note'
    })
  }


}
