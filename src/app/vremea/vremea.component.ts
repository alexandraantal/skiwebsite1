import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vremea',
  templateUrl: './vremea.component.html',
  styleUrls: ['./vremea.component.scss']
})
export class VremeaComponent implements OnInit {

  semenic: boolean;
  valiug: boolean;

  constructor() { }

  ngOnInit(){

    this.semenic= true;
    this.valiug=true;

    console.log(this.valiug, this.semenic)
}

buttonSemenic(){

  this.semenic = true;
  this.valiug = false;
}

buttonValiug(){
  
  this.semenic = false;
  this.valiug = true;

}

}
