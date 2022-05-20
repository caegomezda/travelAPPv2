import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit, Renderer2, ViewChild } from '@angular/core';


// import { Plugins } from '@capacitor/core';

import { Geolocation } from '@capacitor/geolocation';
import { GoogleMapsService } from '../service/google-maps.service';
import { UtilitiesService } from '../service/utilities.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FirebaseApiService } from '../service/firebase-api.service';

// const {Geolocation} = Plugins;
// declare var google: any;

declare var google;

// interface para los marcadores externos
interface Marker {
  position: {
    lat: number,
    lng: number,
  };
}


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  
  // array de markers
  markers: Marker[] = [
    {
      position: {
        lat: 5.0514684683498391,
        lng: -75.489938501083023,
      }
    },
    {
      position: {
        lat: 5.0546330167657505,
        lng: -75.49148403333304,
      }
    }
  ];
  

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
  userData: any;
  positionSetString:String = "ESTA ES LA DIRECCION";
  // public search:string='';
  @ViewChild('map') divMap: ElementRef;


constructor(private renderer:Renderer2,
            @Inject(DOCUMENT) private document,
            private googlemapsService: GoogleMapsService,
            private alertController : AlertController,
            private utilities : UtilitiesService,
            private loandingCtrl: LoadingController,
            private router: Router,
            private firebaseApi:FirebaseApiService,

            ) {
}

ngOnInit(): void {
  this.init();
  this.myLocation();
  Geolocation.requestPermissions();
}

ionViewWillEnter(){
  this.getUserData();
}

async getUserData(){
  let result = await this.utilities.getDataUser();
  this.userData = result
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

// Seleccionamos donde estara  nuestro mapa
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
this.renderMarkers();

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

// funcion que renderisa todos los markers de el array 
renderMarkers() {
  this.markers.forEach(marker => {
    this.addMarkers(marker);
  });
}

// funcion addMarkers: pinta los markers del arreglo
addMarkers(marker: Marker) {
  return new google.maps.Marker({
    position: marker.position,
    icon: 'assets/icon/car-sport.svg',
    map: this.map
  });
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
  Geolocation.getCurrentPosition().then( (res) => {
    const position = {
            lat: res.coords.latitude,
            lng: res.coords.longitude,
    }
    this.addMarker(position);
  });
}

aceptar() {
  this.presentAlertConfirm()
}

async presentAlertConfirm() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    mode:'ios',
    message: 'Realizando el pedido ...',
    buttons: [
      {
        text: 'Rechazar',
        role: 'cancel',
        cssClass: 'secondary',
        id: 'cancel-button',
      }, {
        text: 'Aceptar',
        handler: async () => {
            await this.presentLoading();
          }
      }
    ]
  });

  await alert.present();
}

async presentLoading() {
  const loading = await this.loandingCtrl.create({
    cssClass: 'my-custom-class',
    message: 'Realizando pedido...',
    duration: 5000
  });
  let result  = await this.generateTaxiDelivery();
  await loading.present();
  this.router.navigateByUrl('/data-driver', {replaceUrl: true});
}

async generateTaxiDelivery(){
  return await this.firebaseApi.taxiDelivery(this.userData,this.positionSet,this.positionSetString);
}


}
