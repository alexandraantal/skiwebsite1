import { Component, OnInit } from '@angular/core';

import { faSkiing, faTools, faMitten } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-servicii',
  templateUrl: './servicii.component.html',
  styleUrls: ['./servicii.component.scss']
})
export class ServiciiComponent implements OnInit {

  faSkiing = faSkiing;
  faTools = faTools;
  faMitten = faMitten;
  

  constructor() { }

  ngOnInit(): void {
  }

}
