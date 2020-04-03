import { AngularFirestore } from '@angular/fire/firestore';
import { Partie } from './partie.model';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PartiiServiceService {

  constructor(private firestore: AngularFirestore) { }

  getPartii() {
    return this.firestore.collection('partii').snapshotChanges();
}

  createPartie(partie: Partie){
  return this.firestore.collection('partii').add(partie);
}

  updatePartie(partie: Partie){
  delete partie.name;
  this.firestore.doc('partii/' + partie.name).update(partie);
}

  deletePartie(partieId: string){
  this.firestore.doc('partii/' + partieId).delete();
}
}
