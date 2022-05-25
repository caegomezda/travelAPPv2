import { Component, OnInit } from '@angular/core';
import { FirebaseApiService } from '../service/firebase-api.service';
import { UtilitiesService } from '../service/utilities.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.page.html',
  styleUrls: ['./driver.page.scss'],
})
export class DriverPage implements OnInit {
  userData:any;
  deliveryData:Observable<any[]>;
  isDeliveryDataLoad: Boolean = false;
  movements: Observable<any[]>;
  filteredItems: Observable<any[]>;
  constructor(
    private utilities : UtilitiesService,
    private firebaseApi:FirebaseApiService,
    private alertController : AlertController,
    private router : Router,
    private firestore: AngularFirestore
    ) {
      this.deliveryData = this.firestore.collection('movement',ref => ref.where('isPending', '==', true)).valueChanges()
      // this.deliveryData = this.firestore.collection('movement').
      // afs.collection('items', ref => ref.where('size', '==', 'large'))
    }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getUserData();
  }

  async getDeliveryData(){
    let result = await this.utilities.getDataDelivery();
    this.deliveryData = result
    this.isDeliveryDataLoad = true
  }
  
  async getUserData(){
    let result = await this.utilities.getDataUser();
    this.userData = result
    await this.firebaseApi.getDeliveryData(1);
    this.isDeliveryDataLoad = true
  }

  presentarAlerta(deliveries){
    console.log('deliveries',deliveries);
    this.presentAlertConfirm(deliveries['uiserId']);
  }

  async presentAlertConfirm(uid) {
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
            this.updateMovement(uid);
            this.router.navigateByUrl('/driver-map', { replaceUrl: true });
          }
        }
      ]
    });

    await alert.present();
  }

  async updateMovement(uid){
    await this.firestore.collection(`movement`).doc(uid).ref.update({"isPending":false,"isTaken":true})
  }
}

