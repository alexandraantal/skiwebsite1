import { FirebaseService } from './../firebase.service';
import { CazareService } from './../cazare.service';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from "rxjs/operators";

import { AngularFireStorage } from '@angular/fire/storage';

import { faUpload} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cazare',
  templateUrl: './cazare.component.html',
  styleUrls: ['./cazare.component.scss']
})
export class CazareComponent implements OnInit {

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

  isModalActive: boolean = false;

  ngOnInit(): void {
    this.resetForm();
    console.log("am ajuns aici")

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

}
