import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

export interface Star {
  userId: any;
  cazareId: any;
  value: number;
}

@Injectable({
  providedIn: 'root'
})


export class StarService {

  constructor(private afs: AngularFirestore) { }

  // Star reviews that belong to a user
  getUserStars(userId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('userId', '==', userId) );
    return starsRef.valueChanges();
  }

  // Get all stars that belog to a Movie
  getCazareStars(cazareId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('cazareId', '==', cazareId) );
    return starsRef.valueChanges();
  }

  // Create or update star
  setStar(userId, cazareId, value) {
    // Star document data
    const star: Star = { userId, cazareId, value };

    // Custom doc ID for relationship
    const starPath = `stars/${star.userId}_${star.cazareId}`;

    // Set the data, return the promise
    return this.afs.doc(starPath).set(star)
  }
}
