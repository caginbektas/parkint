import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ParkHistory } from '../data/ParkHistory';
import { ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
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
    private platform: Platform,
    private alertController: AlertController) {}

  ionViewDidEnter(){
    this.storageController.get(PARK_HISTORY).then((val) => {
      debugger;
      this.parkingHistory = val
      this.parkingHistory = this.parkingHistory.sort((a, b) => (a.id < b.id) ? 1 : -1)
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

  async removeHistoryDialog(id: number){
    const alert = await this.alertController.create({
      header: 'Deleting the parking history can not be undone',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.removeHistoryItem(id);
          }
        }
      ]
    });

    await alert.present();
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
        window.location.href = "https://www.google.com/maps/dir//" + lat + "," + lng + "/@" + lat + "," + lng;
  }
}
