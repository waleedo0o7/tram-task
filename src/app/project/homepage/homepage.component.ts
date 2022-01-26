import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../../shared/main-service.service';
import { animate, animation, query, stagger, state, style, transition, trigger } from '@angular/animations';

interface Tram {
  "TransportMode": string,
  "LineNumber": number,
  "Destination": string,
  "JourneyDirection": number,
  "GroupOfLine": string,
  "StopAreaName": string,
  "StopAreaNumber": number,
  "StopPointNumber": number,
  "StopPointDesignation": string,
  "TimeTabledDateTime": string,
  "ExpectedDateTime": string,
  "DisplayTime": string,
  "JourneyNumber": number,
  "Deviations": string
}

interface VehiclePoints {
  "StatusCode": number,
  "Message": string,
  "ExecutionTime": number,
  "ResponseData": {
    "Trams": Tram[]
  }
}

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

    this.MainServiceService.getTramsPoints().subscribe((res: VehiclePoints) => {

      if (res.ResponseData.Trams.length > 0) {
        res.ResponseData.Trams.map((oneTram: Tram) => {
          if (oneTram.JourneyDirection == 1) { // if tram heading towards Gullmarsplan station
            this.result.ResponseData.Trams.push(oneTram); // push tram data in array 
          }
        })
      } 

    }, (error) => {
      this.errorMsg = error;
    }
    );
  }

  ngOnInit(): void {
    this.getTramsPoints(); // call api to get trams first time
    setInterval(() => { // call api evry 1m to get new data 
      this.getTramsPoints();
    }, 60000);
  }

}