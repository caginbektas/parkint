import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common'
import * as L from "leaflet";
import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon-2x.png";
import { ParkHistory } from '../data/ParkHistory';
const LAST_PARKING: string = "LAST_PARKING";
const PARK_HISTORY: string = "PARK_HISTORY";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  map: L.Map
  marker: any
  location: L.LatLng
  parkInfo: ParkHistory = new ParkHistory();
  parkingHistory: Array<ParkHistory> = [];
  //location: L.LatLng = new L.LatLng(52.101627, 21.952208);

  constructor(private geolocation: Geolocation, 
    private sucukluTost: ToastController, 
    private alertController: AlertController,
    private storageController: Storage,
    private datePipe: DatePipe) {}

  ngOnInit() {
    //this.storage.clear()
    this.getInitialLocation();
    //this.generateMap()
  }

  getInitialLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.location = new L.LatLng(resp.coords.latitude, resp.coords.longitude)
      this.presentToast("Location updated", 1000);
      this.generateMap();
     }).catch((error) => {
       this.presentToast("Error getting location", 2000);
     });
  }

  generateMap(){
    this.map = L.map('map', {
      center: this.location,
      zoom: 16,
      renderer: L.canvas()
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map)


    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);

    this.createMarker(this.location)
  }

  updateCurrentLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.location = new L.LatLng(resp.coords.latitude, resp.coords.longitude)
      this.presentToast("Location updated", 1000);
      this.updateMap();
     }).catch((error) => {
       this.presentToast("Error getting location", 2000);
     });
  }

  updateMap(){
    this.map.flyTo(this.location, 16, {
      animate: false
    });
    this.createMarker(this.location);
  }

  createMarker(location: L.LatLng){
    if(this.marker && this.marker != undefined)
      this.deleteMarker();
     this.marker = L.marker([ location.lat, location.lng]);
     this.marker.addTo(this.map);
  }

  deleteMarker(){
    this.map.removeLayer(this.marker)
  }

  async presentToast(message: string, duration: number) {
    const toast = await this.sucukluTost.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Select an option',
      buttons: [
        {
          text: 'Improve location',
          handler: () => {
            this.presentToast("Location improving...", 1000);
            this.updateCurrentLocation();
          }
        }, 
        {
          text: 'Navigate to last parking',
          handler: () => {
            this.presentToast("WIP...", 1000);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: (blah) => {
          }
        }
      ]
    });

    await alert.present();
  }

  async parkNowClick() {
    let prompt = await this.alertController.create({
      inputs: [
        {
          name: 'note',
          placeholder: 'Note',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.parkInfo.id = new Date().getTime();
            this.parkInfo.note = data.note;
            this.parkInfo.lat = this.location.lat;
            this.parkInfo.lng = this.location.lng;
            let temp = new Date();
            let date =this.datePipe.transform(temp, 'dd.MM.yyy HH:mm').toString();
            debugger;
            this.parkInfo.dateTime = date
            this.saveParking();
          }
        }
      ]
    });
    await prompt.present();
  }
  
  saveParking(){
    this.storageController.set(LAST_PARKING, this.parkInfo);
    this.storageController.get(PARK_HISTORY).then((val) => {
      if(val)
        this.parkingHistory = val;
      this.parkingHistory.push(this.parkInfo)
      this.storageController.set(PARK_HISTORY, this.parkingHistory);
    });
  }
}