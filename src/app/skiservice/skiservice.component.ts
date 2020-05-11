import { Skiservice } from './../skiservice.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from './../firebase.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-skiservice',
  templateUrl: './skiservice.component.html',
  styleUrls: ['./skiservice.component.scss']
})
export class SkiserviceComponent implements OnInit {

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

  skiservices: Skiservice[];

  ngOnInit(): void {
    this.firestore.collection('skiservices').snapshotChanges().subscribe(data => {
      this.skiservices = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...<any>e.payload.doc.data()
        } as Skiservice;
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
    this.firestore.collection('skiservices').add(data);
  else
    {
      this.firestore.doc('skiservices/'+ this.editId).update(data);
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
      this.firestore.doc('skiservices/' + id).delete();
    }

    onEdit(skiservice : Skiservice, id: string ){
       this.isModalActive=true;
       this.isUpdate = true; 
       this.editId = id;
  
       this.formTemplate.patchValue({
        name: skiservice.name,
        tarif: skiservice.tarif    
      })
    }

}
