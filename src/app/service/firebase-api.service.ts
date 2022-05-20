import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilitiesService } from './utilities.service';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FirebaseApiService {
  private  httpOptions:any= { headers: new HttpHeaders({ 'Content-Type':  'application/json'}) };

  constructor(
    private utilities : UtilitiesService,
    private http:HttpClient,

  ) { }

  async AddInstance(credential,form,urlType){
    let apiUrl = "";
    console.log('AddInstance');
    let uid = credential['uid'];
    let url = await this.utilities.getUrlType(urlType)
    let accessToken = await credential['token'];
    apiUrl = `${url}/${uid}.json?auth=${accessToken}`;
    if (urlType === 3) {
      apiUrl = `${url}/movements.json?auth=${accessToken}`;
    }
    console.log('apiUrl',apiUrl);
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
    let credential = this.getCredential()
    let params = {}
    let result  = await this.fetchUserInfo2Api(credential,1,params);
    console.log('result',result);
    if(result === null){
      result  = await this.fetchUserInfo2Api(credential,2,params);
    }
    let data = await this.getData(result);
    return data
  }

  async getDeliveryData(status){
    let credential = this.getCredential()
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

    let data  = await this.fetchUserInfo2Api(credential,4,params);
    return data 
  }

  async fetchUserInfo2Api(credential,urlType,params){
    let url = await this.utilities.getUrlType(urlType);
    let uid = credential["uid"];
    let accessToken = credential["token"]
    let apiUrl = `${url}/${uid}.json?auth=${accessToken}`;
    if (urlType === 4) {
        apiUrl = `${url}/${uid}.json?orderBy=${params['orderBy']}&equalTo=${params['equalTo']}&auth=${accessToken}`;
    }
    console.log('apiUrl',apiUrl);
    let json = {}
    json = JSON.stringify(json);
    return  this.http.get(`${apiUrl}`, json).pipe(map( data => data)).toPromise();
  }

  async getData(dataJson){
    let data = [];
    for (let key in dataJson) {
      data = dataJson[key] 
    }
    this.utilities.saveDataUser(data);
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
    await this.AddInstance(credential,newForm,3);
  }

}
