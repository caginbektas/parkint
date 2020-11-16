import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ParkHistory } from '../data/ParkHistory';
const PARK_HISTORY: string = "PARK_HISTORY";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  parkingHistory: Array<ParkHistory> = [];

  constructor(private storageController: Storage) {}

  ionViewDidEnter(){
    this.storageController.get(PARK_HISTORY).then((val) => {
      this.parkingHistory = val
      console.log(this.parkingHistory)
    });
  }
}
