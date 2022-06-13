import { Component, OnInit } from '@angular/core';
import { SesionService } from '../service/sesion.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor(private sesion : SesionService ) { }

  ionViewWillEnter(){
    this.sesion.sesionCaller()
  }
  
  ngOnInit() {
  }

}
