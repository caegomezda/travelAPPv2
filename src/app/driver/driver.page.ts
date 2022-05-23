import { Component, OnInit } from '@angular/core';
import { FirebaseApiService } from '../service/firebase-api.service';
import { UtilitiesService } from '../service/utilities.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.page.html',
  styleUrls: ['./driver.page.scss'],
})
export class DriverPage implements OnInit {
  userData:any;
  deliveryData:any;
  isDeliveryDataLoad: Boolean = false;
  constructor(
    private utilities : UtilitiesService,
    private firebaseApi:FirebaseApiService,
    private alertController : AlertController,
    private router : Router
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getUserData();
  }

  async getDeliveryData(){
    let result = await this.utilities.getDataDelivery();
    console.log('result',result);
    this.deliveryData = result
    console.log('this.deliveryData',this.deliveryData);
    this.isDeliveryDataLoad = true
  }
  
  async getUserData(){
    let result = await this.utilities.getDataUser();
    this.userData = result
    await this.firebaseApi.getDeliveryData(1);
    await this.getDeliveryData();
  }

  presentarAlerta(){
    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      backdropDismiss: false,
      header: 'Camilo Gomez',
      mode: 'ios',
      message: '<ion-icon name="location"></ion-icon><strong>Calle 60 #45 b-21</strong>',
      buttons: [
        {
          text: 'Rechazar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',

          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          id: 'confirm-button',
          handler: () => {
            this.router.navigateByUrl('/driver-map', { replaceUrl: true });
          }
        }
      ]
    });

    await alert.present();
  }
}
