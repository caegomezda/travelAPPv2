import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { UtilitiesService } from '../service/utilities.service';
import { FirebaseAuthService } from '../service/firebase-auth.service';
import { FirebaseApiService } from '../service/firebase-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  passwordForm = {
    clave : "",
  }
  @ViewChild('passwordEyeRegister', { read: ElementRef }) passwordEye: ElementRef;
  credentialForm:FormGroup;
  verificaionFirebase:any;
  passwordTypeInput_1  =  'password';

  constructor(private fb:FormBuilder,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private firebaseApi:FirebaseApiService,
              private firebaseAuth : FirebaseAuthService,
              private router: Router,
              private utilities : UtilitiesService
                ) { }

  ngOnInit() {    
    //Credential login form EMAIL PASSWORD
      this.credentialForm = this.fb.group({
        email:['',[Validators.required, Validators.email]],
        password:['',[Validators.required,Validators.minLength(6)]],
      })
  }

  ionViewWillEnter(){
    //Credential login form EMAIL PASSWORD
    this.credentialForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
    })
  }

  async  signIn(){
      let newCredencialValue = {value:{email:this.credentialForm.value['email'],password:this.credentialForm.value['password']}}
      let emailUsu =this.credentialForm.value['email'];
      const loading = await this.loadingController.create();
      await loading.present();
      this.firebaseAuth.signIn(newCredencialValue.value).then( async res =>{
        if(this.firebaseAuth.isEmailVerified){      
          this.utilities.saveUsu(emailUsu);
          await this.utilities.saveIdUser(res.user.uid);
          await this.utilities.saveTokenUser(res.user.getIdToken());
          loading.dismiss();
          await this.loadDataFromApi();
        }else{
          loading.dismiss();
          this.isNotVerified();
        }
      }, async err =>{
        loading.dismiss();
        const alert = await this.alertController.create({
          header: ':(',
          message:'Correo o contraseña invalida, revisa e intentalo de nuevo',
          buttons: ['OK'],
        });
        console.log("err",err)
        await alert.present();
      })
  }
  
  async loadDataFromApi(){
    await this.firebaseApi.getAccountData();
    this.userSelector();
  }

  get email(){
    return this.credentialForm.get('email');
  }

  get password(){
    return this.credentialForm.get('password');
  }

  async userSelector(){
    let userData = await this.utilities.getDataUser();
    if(userData['userType'] === "driver"){
      this.router.navigateByUrl('/driver', { replaceUrl: true });
    }else if(userData['userType'] === "user"){
      this.router.navigateByUrl('/menu-principal', {replaceUrl: true});
    }else{
      console.log(" ",userData);
    }
  }

  async isNotVerified(){
    const alert2 = await this.alertController.create({
      header: ':(',
      message:'Correo no verificado, revisa tu correo',
      buttons: [{text:'OK',
      handler: () => {
        this.router.navigateByUrl('/login', {replaceUrl: true});
      }}],
    });
    await alert2.present();
  }

  togglePasswordMode(nPasswaord) {
    if (nPasswaord === 1) {
      this.passwordTypeInput_1 = this.passwordTypeInput_1 === 'text' ? 'password' : 'text';
    }
  }

}
