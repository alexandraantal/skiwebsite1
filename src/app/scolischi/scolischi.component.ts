import { Scoala } from '../scoala.model';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from './../firebase.service';
import { Component, OnInit } from '@angular/core';


import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-scolischi',
  templateUrl: './scolischi.component.html',
  styleUrls: ['./scolischi.component.scss']
})
export class ScolischiComponent implements OnInit {

  faTrash = faTrash;
  faEdit = faEdit;  

  isSubmitted: boolean;


  formTemplate = new FormGroup({
    name: new FormControl(''),
    tarif: new FormControl(''),
    tel: new FormControl('')
  })

  constructor(private firebaseService: FirebaseService, private firestore: AngularFirestore) { }

  userStatus = this.firebaseService.userStatus;
  isModalActive: boolean = false;

  isUpdate: boolean = false;
  editId: string;

  scoli: Scoala[];

  ngOnInit(): void {
    this.firestore.collection('scoli').snapshotChanges().subscribe(data => {
      this.scoli = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...<any>e.payload.doc.data()
        } as Scoala;
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
    this.firestore.collection('scoli').add(data);
  else
    {
      this.firestore.doc('scoli/'+ this.editId).update(data);
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
      tarif: '',
      tel: ''
    });
    this.isSubmitted = false;
    }


    delete(id: string) {
      this.firestore.doc('scoli/' + id).delete();
    }

    onEdit(scoala : Scoala, id: string ){
       this.isModalActive=true;
       this.isUpdate = true; 
       this.editId = id;
  
       this.formTemplate.patchValue({
        name: scoala.name,
        tarif: scoala.tarif,
        tel: scoala.tel    
      })
    }

}
