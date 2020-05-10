import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vremea',
  templateUrl: './vremea.component.html',
  styleUrls: ['./vremea.component.scss']
})
export class VremeaComponent implements OnInit {

  semenic: boolean;
  valiug: boolean;
  start: boolean;
  strat: boolean;

  constructor() { }

  ngOnInit(){

    this.semenic= false;
    this.valiug=false;
    this.start = true;
    this.strat = false;

    console.log(this.valiug, this.semenic)
}

buttonSemenic(){

  this.semenic = true;
  this.valiug = false;
  this.start=false;
  this.strat = false;
}

buttonValiug(){
  
  this.semenic = false;
  this.valiug = true;
  this.start=false;
  this.strat = false;
}

buttonStrat(){
  
  this.semenic = false;
  this.valiug = false;
  this.start=false;
  this.strat = true;
}

}
