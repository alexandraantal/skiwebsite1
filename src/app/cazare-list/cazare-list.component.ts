import { Cazare } from './../cazare.model';
import { FirebaseService } from './../firebase.service';
import { CazareService } from './../cazare.service';
import { Component, OnInit } from '@angular/core';

import { AngularFireStorageModule } from 'angularfire2/storage';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from "rxjs/operators";

import { AngularFireStorage } from '@angular/fire/storage';

import { faUpload} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cazare-list',
  templateUrl: './cazare-list.component.html',
  styleUrls: ['./cazare-list.component.scss']
})
export class CazareListComponent implements OnInit {


  cazari: Cazare[];

  faUpload = faUpload;

  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;

  name: string;
  description: string;

  formTemplate = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    imageURL: new FormControl('')
  })

  constructor(private firebaseService: FirebaseService, private storage: AngularFireStorage, private router: Router, private service: CazareService) { }

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

buttonPress(){
  this.isModalActive = !this.isModalActive;
}

onSubmit(formValue) {
this.isSubmitted = true;
if (this.formTemplate.valid) {
  var filePath = `images/${this.selectedImage.name}_${new Date().getTime()}`;
  const fileRef = this.storage.ref(filePath);
  this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
    finalize(() => {
      fileRef.getDownloadURL().subscribe((url) => {
        formValue['imageURL'] = url;
        this.firebaseService.newCazare(formValue);
        this.resetForm();
        this.isModalActive=false;
      })
    })
  ).subscribe();
}
}

resetForm() {
this.formTemplate.reset();
this.formTemplate.setValue({
  name: '',
  description: '',
  category: 'Semenic',
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


}
