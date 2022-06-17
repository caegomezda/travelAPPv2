import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { FirebaseApiService } from '../service/firebase-api.service';
import { SesionService } from '../service/sesion.service';
import { UtilitiesService } from '../service/utilities.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  userData:any;
  credentialForm:FormGroup;

  constructor(private sesion : SesionService,
              private utilities : UtilitiesService,
              private fb:FormBuilder,
              private firebaseApi:FirebaseApiService,
              private alertController : AlertController,
              private router : Router
              ) {

               }

  ngOnInit() {    
    this.credentialForm = this.fb.group({
      vrtitle: [''],
      description:[''],
    });
  }

  ionViewWillEnter(){
    this.sesion.sesionCaller()
    this.credentialForm = this.fb.group({
      vrtitle: [''],
      description: [''],
    });
    this.getUserData()
  }

  async getUserData(){
    this.userData = await this.utilities.getDataUser()

  }

  get vrtitle(){
    return this.credentialForm.get('vrtitle');
  }

  get description(){
    return this.credentialForm.get('description');
  }

  async sendPQRS(){

    let token = await this.utilities.getToken();
    let formCrea = this.credentialForm.value
    let newForm = {
      creationDate:this.userData.creationDate,
      email:this.userData.email,
      tilte: formCrea.vrtitle,
      description: formCrea.description 
    }

    let credential = {
      ui:this.userData.uid,
      token:token
    }

    if(formCrea.title === "" || formCrea.description === "") {
      this.alertCrtl(1);
    }else{
      this.alertCrtl(2);
      this.firebaseApi.addPQRS(credential,newForm,5);
    }
  }

  async alertCrtl(n){
    if (n === 1) {
      const alert1 = await this.alertController.create({
        // header: '',
        message:'Vuelva a intentarlo,campos sin llenar',
        buttons: [{text:'OK',
        handler: () => {
        }}],
      });
      await alert1.present();
    }else if(n === 2){

      const alert2 = await this.alertController.create({
        header: ':(',
        message:'El servicio de soporte dara pronta respuesta a su solicitud',
        buttons: [{text:'OK',
        handler: () => {
          this.router.navigateByUrl('/menu-principal', {replaceUrl: true});
        }}],
      });
      await alert2.present();
    }
  }

}
