import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Device } from '@ionic-native/device';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { GroupService } from './group.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private device: Device, private storage: Storage,
              public menu: MenuController, private groupService: GroupService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      console.log(this.device);
    });
  }

  promptCreateGroup() {
    this.groupService.createGroup();
    this.menu.close();
  }

  promptJoinGroup() {
    this.groupService.joinGroup();
    this.menu.close();
  }
}

