import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilitiesService } from './utilities.service';
import {map} from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseApiService {
  private  httpOptions:any= { headers: new HttpHeaders({ 'Content-Type':  'application/json'}) };

  constructor(
    private utilities : UtilitiesService,
    private http:HttpClient,
    private afs: AngularFirestore,

  ) { }

  async AddInstance(credential,form,urlType){
    let apiUrl = "";
    let uid = credential['uid'];
    let url = await this.utilities.getUrlType(urlType)
    let accessToken = await credential['token'];
    apiUrl = `${url}/${uid}.json?auth=${accessToken}`;
    if (urlType === 3) {
      apiUrl = `${url}/movements.json?auth=${accessToken}`;
    }
    let json = form
    json = JSON.stringify(json);
    return await this.http.post(`${apiUrl}`, json, this.httpOptions).pipe(map( data => data)).toPromise();
  }

  async addUser(credential,newForm,urlType){
    let credentialUser = {
      uid:credential.user.uid,
      token:await credential.user._delegate.accessToken
    }
    await this.AddInstance(credentialUser,newForm,urlType);
  }

  async getCredential(){
    let credential = {
      uid:  await this.utilities.getIdUser(),
      token:  await this.utilities.getToken()
    }
    return credential
  }

  async getAccountData(){
    let credential = await this.getCredential()
    let params = {}
    let result  = await this.fetchUserInfo2Api(credential,1,params);
    if(result === null){
      result  = await this.fetchUserInfo2Api(credential,2,params);
    }
    let data = await this.getData(result,1);
    return data
  }

  async getDeliveryData(status){
    let credential = await this.getCredential()
    let params = {}
    if (status === 1) {
      params = {
        orderBy:"isPending",
        equalTo:"true"
      }
    } else if( status === 2){
      params = {
        orderBy:"isTaken",
        equalTo:"true"
      }
    }else if (status === 3){
      params = {
        orderBy:"isDone",
        equalTo:"true"
      }
    }

    let result  = await this.fetchUserInfo2Api(credential,4,params);
    await this.getData(result,2);
  }

  async fetchUserInfo2Api(credential,urlType,params){
    let url = await this.utilities.getUrlType(urlType);
    let uid = credential["uid"];
    let accessToken = credential["token"];
    let apiUrl = `${url}/${uid}.json?auth=${accessToken}`;
    if (urlType === 4) {
        apiUrl = `${url}/movements.json?orderBy="${params['orderBy']}"&equalTo=${params['equalTo']}&auth=${accessToken}`;
    }
    let json = {}
    json = JSON.stringify(json);
    return  this.http.get(`${apiUrl}`, json).pipe(map( data => data)).toPromise();
  }

  async getData(dataJson,type){
    let data = [];
    if (type == 1) {
      for (let key in dataJson) {
        data = dataJson[key]
      }
    this.utilities.saveDataUser(data);
    }else if (type === 2){
      for (let key in dataJson) {
        data.push(dataJson[key])
      }
    this.utilities.saveDataDelivery(data);
    }
  }

  async taxiDelivery(userData,positionSet,positionSetString){

    let creationTime = await this.utilities.fechaHoyInv(0);
    let credential = {
      uid:userData['uid'],
      token:await this.utilities.getToken()
    }
    let newForm = {
      creationDate:creationTime[1],
      uiserId:credential['uid'],
      isActive:true,
      isPending:true,
      istaken:false,
      isDone:false,
      positionSet:positionSet,
      positionSetString:positionSetString
    }
    console.log('newForm',newForm);
    return await this.afs.doc(
      `movement/${credential['uid']}`
      ).set({
        creationDate:creationTime[1],
        uiserId:credential['uid'],
        isActive:true,
        isPending:true,
        istaken:false,
        isDone:false,
        // positionSet:positionSet,
        positionSet:"camilo estuvo aquii",
        positionSetString:positionSetString
      });
  }

}


