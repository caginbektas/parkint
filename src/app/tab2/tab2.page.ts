import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ParkHistory } from '../data/ParkHistory';
import { ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
const PARK_HISTORY: string = "PARK_HISTORY";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  parkingHistory: Array<ParkHistory> = [];

  constructor(private storageController: Storage,
    private sucukluTost: ToastController,
    private platform: Platform) {}

  ionViewDidEnter(){
    this.storageController.get(PARK_HISTORY).then((val) => {
      debugger;
      this.parkingHistory = val
    });
  }

  async presentToast(message: string, duration: number) {
    const toast = await this.sucukluTost.create({
      message: message,
      duration: duration,
      position: "top"
    });
    toast.present();
  }

  updateHistory(){
    this.storageController.set(PARK_HISTORY, this.parkingHistory);
  }

  removeHistoryItem(id: number){
    this.parkingHistory = this.parkingHistory.filter(function( obj ) {
      return obj.id !== id;
    });
    this.updateHistory();
  }

  navigateLocation(lat: number, lng: number){
      if (this.platform.is('android')) {
        this.presentToast("andro", 500)
        //window.location.href = 'geo:dir//' + lat + "," + lng;
        window.location.href = "https://www.google.com/maps/dir//" + lat + "," + lng + "/@" + lat + "," + lng;
      } else {
        window.location.href = 'maps://maps.apple.com/?q=' + lat + "," + lng;
      }
  }
}
