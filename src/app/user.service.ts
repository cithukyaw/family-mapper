import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device';
import { Storage } from '@ionic/storage';

declare var firebase;

@Injectable()
export class UserService {

  db: any;

  constructor(private device: Device, private storage: Storage) {
    this.db = firebase.database();
  }

  createGuid() {
     function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
     }

     return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  load() {
    // Check if userId exists
    this.storage.get('user').then((value) => {
      if (value === null) {
        console.log('New user!');

        // save user information if not exists
        let userId = this.db.ref().child('users').push().key;
        let uuid = this.device.uuid;
        if (uuid === null) {
          uuid = this.createGuid();
        }

        this.db.ref('users/' + userId).set({
          name: uuid
        });

        this.db.ref('users/' + userId + '/device').set({
            uuid        : uuid,
            platform    : this.device.uuid,
            model       : this.device.model,
            serial      : this.device.serial,
            version     : this.device.version,
            manufacturer: this.device.manufacturer,
            isVirtual   : this.device.isVirtual,
            cordova     : this.device.cordova
        });

        this.storage.set('user', userId);
      } else {
        console.log('Existing user!');
      }
    });

    console.log(this.device);
  }

}
