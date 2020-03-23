import { Component, OnInit } from '@angular/core';

import { faFacebookSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { faPhoneSquare, faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  faFacebook = faFacebookSquare;
  faInstagram = faInstagramSquare;
  faPhone = faPhoneSquare;
  faEnvelope = faEnvelopeSquare;

  constructor() { }

  ngOnInit(): void {
  }

}
