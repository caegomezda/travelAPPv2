import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginPage } from '../login/login.page';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  idUser:any;
  token:any;
  item:any;
  correoUsuario:any;
  dataUser:any;
  userCredential:any;
  dataDelivery:any;

  d = new Date();
  private userURL = environment.urlConfing.USERURL;
  private driverURL = environment.urlConfing.DRIVERTURL;
  private movementURL = environment.urlConfing.MOVEMENTURL;
  constructor() { }

  // saveUserCredential(userCredential){
  //   this.userCredential = userCredential;    
  // }

  // getUserCredential(){
  //   return this.userCredential
  // }

  saveUsu(correo){
    this.correoUsuario = correo;
  }

  sendUsu(){
    let result = this.correoUsuario;
    return result;
  }

  saveIdUser(id){
    this.idUser = id;
  }
  //Obtiene la id del usuario activo
  getIdUser(){
    return this.idUser;
  }

  saveTokenUser(token){
    this.token = token;
  }

  getToken(){
    return this.token;
  }

  async getDataUser(){
    return await this.dataUser;
  }

  async saveDataUser(data){
    this.dataUser = await data;
  }

  async getDataDelivery(){
    return await this.dataDelivery;
  }

  async saveDataDelivery(data){
    this.dataDelivery = await data;
  }

  getUrlType(urlType){
    switch (urlType) {
      case 1:
        return this.userURL;
      case 2:
        return this.driverURL;
      case 3:
        return this.movementURL;
      case 4:
        return this.movementURL;
      default:
        break;
    }
  }

  fechaHoyInv(Ndias){
    let dd = this.d.getDate() + Ndias;
    let mm = this.d.getMonth() + 1;
    let yy = this.d.getFullYear();
    let myDateString = yy + "-" + mm + "-" +dd
    if (dd<10 && mm>10) {
      myDateString = yy + "-" + mm + "-" + "0" + dd
    } else if (mm<10 && dd>10) {
      myDateString = yy + "-" + "0" + mm + "-"+dd
    }else if(dd<10 && mm<10){
      myDateString = yy + "-" +"0"+ mm + "-" + "0" + dd
    }
    return [myDateString,this.d]
    // + "T00:00:00-01:00";
  }
}
