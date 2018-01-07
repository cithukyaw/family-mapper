import { Component, ViewChild, ElementRef } from '@angular/core';
import { AlertController, NavController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GroupService } from '../../app/group.service';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public geolocation: Geolocation, public toastCtrl: ToastController, private groupService: GroupService) {

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 16,
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
    this.groupService.createGroup();
  }

  promptJoinGroup() {
    this.groupService.joinGroup();
  }

}
