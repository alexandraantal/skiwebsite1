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

  getUserStars(userId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('userId', '==', userId) );
    return starsRef.valueChanges();
  }

  getCazareStars(cazareId) {
    const starsRef = this.afs.collection('stars', ref => ref.where('cazareId', '==', cazareId) );
    return starsRef.valueChanges();
  }

  setStar(userId, cazareId, value) {
    const star: Star = { userId, cazareId, value };

    const starPath = `stars/${star.userId}_${star.cazareId}`;

    return this.afs.doc(starPath).set(star)
  }
}
