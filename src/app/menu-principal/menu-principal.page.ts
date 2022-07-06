import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { SesionService } from '../service/sesion.service';
import { UtilitiesService } from '../service/utilities.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})
export class MenuPrincipalPage implements OnInit {
subjects1={
  icon: 'assets/icon/car-sport-outline.svg',
  name: 'Servicio de taxis',
  id: '/principal'
}
subjects2={
  icon: 'assets/icon/navigate-outline.svg',
  name: 'Intermunicipal',
  id: '/intermunicipal'
}
subjects3={
  icon: 'assets/icon/help-outline.svg',
  name: 'Contáctanos',
  id: '/contact'
}
  constructor(
    private router: Router,
    private utilities : UtilitiesService,
    private sesion:SesionService,
    ) { }

  ionViewWillEnter(){
    // this.sesion.sesionCaller()
  }
  
  ngOnInit() {
          // {
      //   icon: 'assets/icon/person-outline.svg',
      //   name: 'Perfil',
      //   id: '/profile'
      // },


  }
  

  goToSubject(item){
    this.router.navigateByUrl(item.id, {replaceUrl: true});
  }
}
