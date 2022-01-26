import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MainServiceService {

  constructor( private http:HttpClient) { }

  apiLink = `https://api.sl.se/api2/realtimedeparturesV4.json?key=9e3f3fb8f1934b44bc2b58fe0c99cc3d&siteid=1555&timewindow=60`

  getTramsPoints(){
    return this.http.get(this.apiLink)
  }

}