import { Component } from '@angular/core';
import * as L from "leaflet";
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon-2x.png";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  map: L.Map

  constructor() {}

  generateMap(){
    this.map = L.map('map', {
      center: [ -42.737669, 147.436224 ],
      zoom: 60,
      renderer: L.canvas()
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map)


    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);

    var marker = L.marker([ -42.737669, 147.436224]).addTo(this.map);
  }

  ngOnInit() {
    this.generateMap();
  }
  
  populateCurrentLocation(){
    this.map.flyTo(new L.LatLng(40.987579, 29.036931), 40, {
      animate: false
    });

  }
}