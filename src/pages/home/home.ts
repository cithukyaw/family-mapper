import { Component, ViewChild, ElementRef } from '@angular/core';
import { AlertController, NavController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public geolocation: Geolocation, public toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.addMarker();

    }, (err) => {
      console.log(err);
      if (err.code === 2) {
        let toast = this.toastCtrl.create({
          message: 'No Internet Connection',
          duration: 3000
        });
        toast.present();
      }
    });

  }

  addMarker() {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = '<h4>My current location!</h4>';

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  promptCreateGroup() {

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

  promptJoinGroup() {

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
