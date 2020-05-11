import { Equip } from './equip.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from './../firebase.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent implements OnInit {

  faTrash = faTrash;
  faEdit = faEdit;  

  isSubmitted: boolean;


  formTemplate = new FormGroup({
    name: new FormControl(''),
    tarif: new FormControl('')
  })

  constructor(private firebaseService: FirebaseService, private firestore: AngularFirestore) { }

  userStatus = this.firebaseService.userStatus;
  isModalActive: boolean = false;

  isUpdate: boolean = false;
  editId: string;

  equips: Equip[];

  ngOnInit(): void {
    this.firestore.collection('equips').snapshotChanges().subscribe(data => {
      this.equips = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...<any>e.payload.doc.data()
        } as Equip;
      })
    });
  }

  toggleModal() {
    this.isModalActive = !this.isModalActive;
  }

  buttonPress(){
    this.isModalActive = !this.isModalActive;
  }

  onSubmit(formValue) {
    this.isSubmitted = true;
    
  if (this.formTemplate.valid) {
  let data = Object.assign({}, formValue);
  delete data.id;

  if(!this.isUpdate)
    this.firestore.collection('equips').add(data);
  else
    {
      this.firestore.doc('equips/'+ this.editId).update(data);
      this.isUpdate = false;
    }
  

  this.resetForm();
  this.isModalActive=false;
}
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      name: '',
      tarif: ''
    });
    this.isSubmitted = false;
    }

    delete(id: string) {
      this.firestore.doc('equips/' + id).delete();
    }

    onEdit(equip : Equip, id: string ){
       this.isModalActive=true;
       this.isUpdate = true; 
       this.editId = id;
  
       this.formTemplate.patchValue({
        name: equip.name,
        tarif: equip.tarif   
      })
    }

}
