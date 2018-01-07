import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { GroupService } from './group.service';
import { UserService } from './user.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              public menu: MenuController, private groupService: GroupService, private userService: UserService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // Load user and device information
      userService.load();
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

