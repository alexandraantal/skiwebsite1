import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { FirebaseService } from './../firebase.service';
import { PartiiServiceService } from './../partii-service.service';
import { Partie } from '../partie.model';
import { Component, OnInit } from '@angular/core';

import { faSquare, faCheck, faTimes, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-partii-list',
  templateUrl: './partii-list.component.html',
  styleUrls: ['./partii-list.component.scss']
})
export class PartiiListComponent implements OnInit {

  faSquare = faSquare;
  faTimes = faTimes;
  faCheck = faCheck;
  faTrash = faTrash;
  faEdit = faEdit;  
  
  partii: Partie[];

  isSubmitted: boolean;

 

  formTemplate = new FormGroup({
    name: new FormControl(''),
    level: new FormControl(''),
    length: new FormControl(''),
    nocturna: new FormControl(''),
    lift: new FormControl('')
  })

  constructor(private partiiService: PartiiServiceService, private firebaseService: FirebaseService, private firestore: AngularFirestore) { }

  userStatus = this.firebaseService.userStatus;
  isModalActive: boolean = false;
  isUpdate: boolean = false;
  editId: string;



  ngOnInit() {
    this.partiiService.getPartii().subscribe(data => {
      this.partii = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...<any>e.payload.doc.data()
        } as Partie;
      })
    });
  }

  create(partie: Partie){
      this.partiiService.createPartie(partie);
  }

  update(partie: Partie) {
    this.partiiService.updatePartie(partie);
  }

  delete(id: string) {
    this.partiiService.deletePartie(id);
  }


  
  buttonPress(){
    this.isModalActive = !this.isModalActive;
  }

  toggleModal() {
    this.isModalActive = !this.isModalActive;
  }

  onSubmit(formValue) {
    this.isSubmitted = true;
    
if (this.formTemplate.valid) {
  let data = Object.assign({}, formValue);
  delete data.id;
  console.log(formValue.id)

  // if(formValue.id == null)
  //    this.firestore.collection('partii').add(data);
  // else
  //    //this.firestore.doc('partii/'+ formValue.id).update(data);
  //    this.update(data);

  if(!this.isUpdate)
    this.firestore.collection('partii').add(data);
  else
    {
      this.firestore.doc('partii/'+ this.editId).update(data);
      this.isUpdate = false;
    }

  this.resetForm();
  this.isModalActive=false;
    
}
  }

  onEdit(prt : Partie,  id: string ){
    this.isModalActive=true;
    this.isUpdate = true; 
    this.editId = id;

    this.formTemplate.patchValue({
      name: prt.name,
      level: prt.level,
      length: prt.length,
      nocturna: prt.nocturna,
      lift: prt.lift
  
    })
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      name: '',
      level: '',
      length: '',
      nocturna: '',
      lift: ''
    });
    this.isSubmitted = false;
    }

}
