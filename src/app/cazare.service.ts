import { Cazare } from './cazare.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CazareService {


  constructor(private firestore: AngularFirestore) { }

  getCazari() {
    return this.firestore.collection('cazari').snapshotChanges();
}

getCazariSemenic(){
  return this.firestore.collection('cazari',ref => ref.where('category', '==', "Semenic")).snapshotChanges();
}

getCazariValiug(){
  return this.firestore.collection('cazari',ref => ref.where('category', '==', "Valiug")).snapshotChanges();
}

deleteCazare(cazareId: string){
  this.firestore.doc('cazari/' + cazareId).delete();
}

createCazare(cazare: Cazare){
  return this.firestore.collection('cazari').add(cazare);
}
}
