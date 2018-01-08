import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

declare var firebase;

@Injectable()
export class GroupService {

  db: any;

  constructor(public alertCtrl: AlertController) {
    this.db = firebase.database();
  }

  createGroup() {

    let prompt = this.alertCtrl.create({
      title: 'Create Group',
      message: 'Enter a group name that represents your family or group of friends',
      inputs: [
        {
          name: 'group',
          placeholder: 'Group Name'
        }
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

            let newGroupKey = this.db.ref().child('groups').push().key;
            let response = this.db.ref('groups/' + newGroupKey).set({
              name: data.group
            });

            console.log(response);
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
        }
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
