import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../../shared/main-service.service';
import { animate, animation, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Tram , VehiclePoints } from '../../shared/model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  animations: [
    trigger('showItems', [
      transition('* => *', [
        query('.one-item', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.5s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})


export class HomepageComponent implements OnInit {

  constructor(private MainServiceService: MainServiceService) { }

  result: VehiclePoints = {
    StatusCode: 0,
    Message: '',
    ExecutionTime: 0,
    ResponseData: {
      Trams: []
    }
  };

  responseIsEmpty:boolean = false;

  errorMsg: string;

  getTramsPoints() {

    this.result = {
      StatusCode: 0,
      Message: '',
      ExecutionTime: 0,
      ResponseData: {
        Trams: []
      }
    };
    
    this.responseIsEmpty = false;

    this.MainServiceService.getTramsPoints().subscribe((res: VehiclePoints) => {

      if (res.ResponseData.Trams.length > 0) {
        res.ResponseData.Trams.map((oneTram: Tram) => {
          if (oneTram.JourneyDirection == 1) { // if tram heading towards Gullmarsplan station
            this.result.ResponseData.Trams.push(oneTram); // push tram data in array 
          }
        })
      } else {
        this.responseIsEmpty = true;
      }

    }, (error) => {
      this.errorMsg = error;
    }
    );
  }

  ngOnInit(): void {
    this.getTramsPoints(); // call api to get trams at first time
  }

}