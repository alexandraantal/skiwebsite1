import { AngularFirestore } from '@angular/fire/firestore';
import { Cazare } from './../cazare.model';
import { FirebaseService } from './../firebase.service';
import { CazareService } from './../cazare.service';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from "rxjs/operators";

import { AngularFireStorage } from '@angular/fire/storage';

import { faUpload, faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cazare-list',
  templateUrl: './cazare-list.component.html',
  styleUrls: ['./cazare-list.component.scss']
})
export class CazareListComponent implements OnInit {


  cazari: Cazare[];

  faUpload = faUpload;
  faTrash = faTrash;
  faEdit = faEdit;

  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;

  name: string;
  description: string;

  formTemplate = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    link: new FormControl(''),
    imageURL: new FormControl('')
  })

  isUpdate: boolean = false;
  editId: string;

  constructor(private firebaseService: FirebaseService, private storage: AngularFireStorage, private router: Router, private service: CazareService,private firestore: AngularFirestore) { }

  userStatus = this.firebaseService.userStatus;
  
  isModalActive: boolean = false;

  ngOnInit(){

    this.resetForm();
   
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

onEdit(cazare: Cazare,id: string){
  this.isModalActive=true;
    this.isUpdate = true; 
    this.editId = id;

    this.formTemplate.patchValue({
      name: cazare.name,
      description: cazare.description,
      category: cazare.category,
      link: cazare.link,
      imageURL: cazare.imageUrl  
    })

}

buttonPress(){
  this.isModalActive = !this.isModalActive;
}


onSubmit(formValue) {
  this.isSubmitted = true;
  if (this.formTemplate.valid) {
    let data = Object.assign({}, formValue);
    delete data.id;

    if(!this.isUpdate){
    var filePath = `images/${this.selectedImage.name}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          formValue['imageURL'] = url;
          this.firestore.collection('cazari').add(formValue);
        })
      })
    ).subscribe();
  }
  else{
    var filePath = `images/${this.selectedImage.name}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          data['imageURL'] = url;
          this.firestore.doc('cazari/'+ this.editId).update(data);
        })
      })
    ).subscribe();

      this.isUpdate = false;
  }
}


this.resetForm();
this.isModalActive=false;
  
  }

resetForm() {
this.formTemplate.reset();
this.formTemplate.setValue({
  name: '',
  description: '',
  category: 'Semenic',
  link:'',
  imageURL: ''
});
this.imgSrc = null;
this.selectedImage = null;
this.isSubmitted = false;
}


get formControls() {
return this.formTemplate['controls'];
}

toggleModal() {
  this.isModalActive = !this.isModalActive;
}

showPreview(event: any) {
  if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();
    reader.onload = (e: any) => this.imgSrc = e.target.result;
    reader.readAsDataURL(event.target.files[0]);
    this.selectedImage = event.target.files[0];
  }
  else {
    this.imgSrc = null;
    this.selectedImage = null;
  }
}

ratingPress(){
 
    this.router.navigate(["/login-email"]);  
}

buttonSemenic(){

  this.service.getCazariSemenic().subscribe(data => {
    this.cazari = data.map(e => {
      return {
        id: e.payload.doc.id,
        ...<any>e.payload.doc.data()
      } as Cazare;
    })
    
  });

}

buttonValiug(){

  this.service.getCazariValiug().subscribe(data => {
    this.cazari = data.map(e => {
      return {
        id: e.payload.doc.id,
        ...<any>e.payload.doc.data()
      } as Cazare;
    })
    
  });

}

buttontoate(){

  this.service.getCazari().subscribe(data => {
    this.cazari = data.map(e => {
      return {
        id: e.payload.doc.id,
        ...<any>e.payload.doc.data()
      } as Cazare;
    })
    
  });
}

}
