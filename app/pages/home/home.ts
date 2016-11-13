import {Component} from '@angular/core';
import {NavController,ActionSheetController,AlertController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(private navCtrl: NavController,
    public ActionSheetController:ActionSheetController,
    public AlertController : AlertController
  ) { }
  heros = ['Tom','Mary','Liu','WuBi'];
  showAlert() {
    let alert = this.AlertController.create({
      title: 'New Friend!',
      subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    alert.present();
  }
  presentActionSheet() {
   let actionSheet = this.ActionSheetController.create({
     title: 'Modify your album',
     buttons: [
       {
         text: 'Destructive',
         role: 'destructive',
         handler: () => {
           console.log('Destructive clicked');
         }
       },{
         text: 'Archive',
         handler: () => {
           console.log('Archive clicked');
         }
       },{
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
   });
   actionSheet.present();
 }
}
