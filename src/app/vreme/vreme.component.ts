import { VremeService } from './../vreme.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vreme',
  templateUrl: './vreme.component.html',
  styleUrls: ['./vreme.component.scss']
})
export class VremeComponent implements OnInit {

  constructor(private weatherService: VremeService) { }

  ngOnInit(): void {

    // let request = this.weatherService.getWeatherData();

    // const locationsSubscription = request.subscribe({
    //   next(position) {
    //     console.log('Current Position: ', position);
    //   },
    //   error(msg) {
    //     console.log('Error Getting Location: ', msg);
    //   }
    // });

   // console.log(request);
  }

}
