import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ParkHistory } from '../data/ParkHistory';
import { ToastController } from '@ionic/angular';
const PARK_HISTORY: string = "PARK_HISTORY";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  parkingHistory: Array<ParkHistory> = [];

  constructor(private storageController: Storage,
    private sucukluTost: ToastController) {}

  ionViewDidEnter(){
    this.storageController.get(PARK_HISTORY).then((val) => {
      debugger;
      this.parkingHistory = val
    });
  }

  async presentToast(message: string, duration: number) {
    const toast = await this.sucukluTost.create({
      message: message,
      duration: duration
    });
    toast.present();
  }
}
