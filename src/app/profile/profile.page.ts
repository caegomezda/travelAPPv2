import { Component, OnInit } from '@angular/core';
import { SesionService } from '../service/sesion.service';
import { UtilitiesService } from '../service/utilities.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userData : any;
  edit: boolean = false;
  constructor(private utilities : UtilitiesService,
              private sesion: SesionService,
              ) { }
  
  ngOnInit() {
  }

  ionViewWillEnter(){
    this.sesion.sesionCaller()
    this.userData = this.utilities.getDataUser();
    console.log('this.userData',this.userData);
  }

  editData(){
    this.edit=true;
  }
  saveData(){
    this.edit=false;
  }
}
