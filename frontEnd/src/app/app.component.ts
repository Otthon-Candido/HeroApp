import { Component } from '@angular/core';
import { SidebarConfig, SubmenuItem } from './utils/sideBar/sideBar.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'superHeroClientApp';
  mainApplications: SubmenuItem[] = [];
  sidebarConfig: SidebarConfig = {
    toggleSideBar: true,
    sidebarItems: [],
    sidebarTitle: {
      show: {
        svgIcon: '',
        name: 'transcom-logo-open',
      },
      hidden: {
        svgIcon: '',
        name: 'transcom-logo-closed',
      },
    },
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadModules();
  }

  loadModules() {
    this.mainApplications = [ 
      {
      id: 'heroes',
      checked: this.verifyUrl('heroes'),
      svgIcon: `../../../assets/images-svg/pac-man.svg`,
      name: 'Heróis',
      callback: () => {
        this.router.navigate(['/heroes']);
      },
    
  },
  {
    id: 'super-power',
    checked: this.verifyUrl('super-power'),
    svgIcon: `../../../assets/images-svg/boxing.svg`,
    name: 'Super-Poderes',
    callback: () => {
      this.router.navigate(['/super-power']);
    },
  
}]
this.sidebarConfig.sidebarItems = this.mainApplications;
}

  verifyUrl(module: string) {
    if (window.location.href.includes(module)) {
      return true;
    } else {
      return false;
    }
  }
}
