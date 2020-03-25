import { Cazare } from './../cazare.model';
import { FirebaseService } from './../firebase.service';
import { CazareService } from './../cazare.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cazare-list',
  templateUrl: './cazare-list.component.html',
  styleUrls: ['./cazare-list.component.scss']
})
export class CazareListComponent implements OnInit {


  cazari: Cazare[];

  constructor(private firebaseService: FirebaseService, private service: CazareService) { }

  userStatus = this.firebaseService.userStatus;

  ngOnInit(){
    
    this.service.getCazari().subscribe(data => {
      this.cazari = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...<any>e.payload.doc.data()
        } as Cazare;
      })
      
    });
  }

  create(cazare: Cazare){
    this.service.createCazare(cazare);
}

  delete(id: string) {
  this.service.deleteCazare(id);
} 

}
