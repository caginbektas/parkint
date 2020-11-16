import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ToastController } from '@ionic/angular';
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

  constructor(private geolocation: Geolocation, private sucukluTost: ToastController) {}

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
  getCurrentLocatin(){
    this.geolocation.getCurrentPosition().then((resp) => {
      var marker = L.marker([ resp.coords.latitude, resp.coords.longitude]).addTo(this.map);

      this.map.flyTo(new L.LatLng(resp.coords.latitude, resp.coords.longitude), 30, {
        animate: false
      });
     }).catch((error) => {
       console.log('Error getting location');
       this.presentToast("Error getting location", 2000);
     });
  }
  async presentToast(message: string, duration: number) {
    const toast = await this.sucukluTost.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}