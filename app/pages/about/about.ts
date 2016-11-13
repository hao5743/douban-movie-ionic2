import {Component} from '@angular/core';
import {NavController,LoadingController,ToastController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {
  constructor(private navCtrl: NavController,
  public LoadingController:LoadingController,
  public ToastController:ToastController
) {
  }
  presentLoading() {
    let loader = this.LoadingController.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }
  presentToast() {
  let toast = this.ToastController.create({
    message: 'User was added successfully',
    duration: 3000,
    position:'middle',
    showCloseButton:true
  });
  toast.present();
}
}
