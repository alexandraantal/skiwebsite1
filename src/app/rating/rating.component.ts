import { FirebaseService } from './../firebase.service';
import { StarService } from './../star.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

   @Input() userId;
   @Input() cazareId;

   stars: Observable<any>;

  constructor(private starService: StarService, private firebaseService: FirebaseService) { }

  userStatus = this.firebaseService.userStatus;

  ngOnInit(): void {
  }

  starHandler(value) {

    this.starService.setStar(this.userId, this.cazareId, value)
  }

}
