import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class GroupService {

  constructor(public alertCtrl: AlertController) { }

  createGroup() {

    let prompt = this.alertCtrl.create({
      title: 'Create Group',
      message: 'Enter a group name that represents your family or group of friends',
      inputs: [
        {
          name: 'group',
          placeholder: 'Group Name'
        },
        {
          name: 'name',
          placeholder: 'Your Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Create',
          handler: data => {
            console.log(data);
            console.log('Create clicked');
          }
        }
      ]
    });

    prompt.present();

  }

  joinGroup() {

    let prompt = this.alertCtrl.create({
      title: 'Join Group',
      message: 'Enter a group code of your family/friend group. If you don\'t know the code, ask the group owner.',
      inputs: [
        {
          name: 'group',
          placeholder: 'Group Code'
        },
        {
          name: 'name',
          placeholder: 'Your Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Join',
          handler: data => {
            console.log(data);
            console.log('Join clicked');
          }
        }
      ]
    });

    prompt.present();

  }

}
