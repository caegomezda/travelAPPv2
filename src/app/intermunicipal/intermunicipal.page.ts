import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

// import { Plugins } from '@capacitor/core';

import { Geolocation } from '@capacitor/geolocation';
import { GoogleMapsService } from '../service/google-maps.service';
import { SesionService } from '../service/sesion.service';

// const {Geolocation} = Plugins;
declare var google: any;

declare var google;
@Component({
  selector: 'app-intermunicipal',
  templateUrl: './intermunicipal.page.html',
  styleUrls: ['./intermunicipal.page.scss'],
})
export class IntermunicipalPage implements OnInit {

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
  positionSet: any
  // public search:string='';
  @ViewChild('map') divMap: ElementRef;


constructor(private renderer: Renderer2,
            private googlemapsService: GoogleMapsService,
            private sesion: SesionService,
            @Inject(DOCUMENT) private document,
            ) {
}

ionViewWillEnter(){
  // this.sesion.sesionCaller()
}

ngOnInit(): void {
  this.init();
  this.myLocation();
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

         console. log('my location() - > get')

        const position = {
               lat: res.coords.latitude,
               lng: res.coords.longitude,
        }
         this.addMarker(position);
         
  });
}

aceptar() {
  console. log('click aceptar ->',this.positionSet);

}

  // integracion temporal del mapa- se cambio a geolocation
  // loadMap() {
  //   // create a new map by passing HTMLElement
  //   const mapEle: HTMLElement = document.getElementById('map');
  //   // create LatLng object
  //   const myLatLng = {lat: 5.058859029717547, lng: -75.48927077310586};
  //   // create map
  //   this.map = new google.maps.Map(mapEle, {
  //     center: myLatLng,
  //     zoom: 17
  //   });
  
  //   google.maps.event.addListenerOnce(this.map, 'idle', () => {
  //     // this.renderMarkers();
  //     mapEle.classList.add('show-map');
  //   });
  // }

  // ngOnInit() {
  //   // this.loadMap(); parte del codigo temporal 
  // }

}
