import { Component, OnInit } from '@angular/core';
import { SesionService } from '../service/sesion.service';

@Component({
  selector: 'app-data-driver',
  templateUrl: './data-driver.page.html',
  styleUrls: ['./data-driver.page.scss'],
})
export class DataDriverPage implements OnInit {

  constructor(private sesion : SesionService) { }

  ionViewWillEnter(){
    this.sesion.sesionCaller()
  }
  ngOnInit() {
  }

}
