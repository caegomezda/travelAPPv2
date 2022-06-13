import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

import { Geolocation } from '@capacitor/geolocation';
import { GoogleMapsService } from '../service/google-maps.service';
import { AlertController } from '@ionic/angular';
import { SesionService } from '../service/sesion.service';

declare var google;

@Component({
  selector: 'app-driver-map',
  templateUrl: './driver-map.page.html',
  styleUrls: ['./driver-map.page.scss'],
})
export class DriverMapPage implements OnInit {

  @Input () position = {
    lat: 5.0507972,
    lng: -75.4927164
  };
  label = {
    titulo: 'Mi ubicación',
    subtitulo: 'Mi ubicación '
  }
  map: any;
  marker: any;
  infowindow: any;
  positionSet: any;
  isAcept:Boolean;
  isAceptCod:Boolean;
  // public search:string='';
  @ViewChild('map') divMap: ElementRef;


constructor(private renderer:Renderer2,
            private googlemapsService: GoogleMapsService,
            private alertController : AlertController,
            private sesion: SesionService,
            @Inject(DOCUMENT) private document,
            ) {
}


ngOnInit(): void {
  this.init();
  this.myLocation();
  Geolocation.requestPermissions();
}

ionViewWillEnter(){
  this.isAcept = false;
  this.isAceptCod = false;
  this.sesion.sesionCaller()
}

async init() {
  this.googlemapsService.init(this.renderer, this.document). then( () =>{
          this.initMap();
  }).catch( (err) => {
         console. log(err);
  });
}

initMap() {
const position = this.position;
let latLng = new google.maps.LatLng (position.lat, position.lng);
let mapOptions = {
      center: latLng,
      zoom: 15,
      disableDefaultUI: true,
      clickableIcons: false,
};


this.map = new google.maps.Map(this.divMap.nativeElement,mapOptions);

this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      draggable: true,
});

this.clickHandleEvent ();
this.infowindow = new google.maps.InfoWindow();
    this. addMarker (position);
    this.setInfoWindow(this.marker, this.label.titulo, this.label.subtitulo)
}

clickHandleEvent() {
this.map.addListener('click', (event: any) => {
      const position = {
            lat: event. latLng. lat(),
            lng: event. latLng. lng(),
      };
      this.addMarker(position);
});
}

addMarker(position: any): void {
  let latLng = new google.maps.LatLng (position. lat, position.lng);
  this.marker.setPosition(latLng);
  this.map.panTo(position);
  this.positionSet = position;
}

setInfoWindow(marker: any, titulo: string, subtitulo: string) {
  const contentString = '<div id="contentInsideMap">'+
                        '<p style="font-weight: bold; margin-bottom: 5px;">'+ titulo + '</p>'
                        '<div id="bodyContent">' +
                        '<p>'+ subtitulo + '</p>'+
                        '</div>'+
                        '</div>';
  this.infowindow.setContent(contentString);
  this.infowindow.open(this.map, marker);
}

async myLocation() {
  console.log('mylocation() click')
  Geolocation.getCurrentPosition().then( (res) => {
        const position = {
               lat: res.coords.latitude,
               lng: res.coords.longitude,
        }
         this.addMarker(position);
  });
}

aceptar() {
  this.presentAlertConfirm();
}

aceptar2() {
  this.presentAlertConfirm2();
}

async presentAlertConfirm() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    mode:'ios',
    message: 'Ingrese el codigo de confirmacion',
    buttons: [
      {
        text: 'Rechazar',
        role: 'cancel',
        cssClass: 'secondary',
        id: 'cancel-button',
      }, {
        text: 'Aceptar',
        id: 'confirm-button',
        handler: () => {
          this.isAcept = true;
          console.log('this.isAcept',this.isAcept);
          console.log('this.isAceptCod',this.isAceptCod);
        }
      }
    ]
  });
  await alert.present();
}

async presentAlertConfirm2() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    mode:'ios',
    message: 'Se ha aceptado el servicio',
    buttons: [
      {
        text: 'Rechazar',
        role: 'cancel',
        cssClass: 'secondary',
        id: 'cancel-button',
      }, {
        text: 'Aceptar',
        id: 'confirm-button',
        handler: () => {
          this.isAceptCod = true;
          console.log('this.isAceptCod',this.isAceptCod);
        }
      }
    ]
  });
  await alert.present();
}

}
