import {
  Component,
  Input,
} from '@angular/core';
import { Icons, SidebarConfig, SidebarItem } from './sideBar.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sideBar.component.html',
  styleUrls: ['./sideBar.component.scss'],
})
export class SideBarComponent {
  iconLeft: any;
  iconRight: any;
  message: string = 'loading :(';
  @Input() sidebarConfig: SidebarConfig = {
    toggleSideBar: true,
    sidebarItems: [],
    sidebarTitle: {
      show: { svgIcon: '', name: 'transcom-logo-open' },
      hidden: { svgIcon: '', name: 'transcom-logo-closed' },
    },
  };

  constructor(private router: Router) { }

  ngAfterViewInit() { }

  ngOnChanges() {
    setTimeout(() => {
      let cont = 0;
      this.sidebarConfig.sidebarItems.forEach((items) => {
        if (items.checked) {
          this.openSubMenus(items.id + cont, items);
          items.subMenuItemns?.forEach((subMenuItem) => {
            if (subMenuItem.checked) {
              this.clearClassSubMenu();
              let subMenu = document.getElementById(subMenuItem.id);
              subMenu?.classList.add('list-show-subMenu');
            }
          });
        }
        cont++;
      });
      this.toggleSidebar(true);
      this.iconLeft = Icons.left;
      this.iconRight = Icons.right;
    }, 0);
  }

  onCLickItem(item: any, event: any) {
    event.stopPropagation();
    if (item?.callback == undefined) {
      if (this.sidebarConfig.toggleSideBar) {
        this.toggleSidebar();
      }
      return;
    }
    item.callback();
  }

  hiddenCaret(item: SidebarItem) {
    return this.sidebarConfig.toggleSideBar || item.subMenuItemns == null;
  }

  toggleSidebar(close: boolean = false) {
    const sidebar: any = document.querySelector('.sidebar');
    if (!close) {
      this.sidebarConfig.toggleSideBar = !this.sidebarConfig.toggleSideBar;
      sidebar.classList.toggle('open');
    }
    else {
      sidebar.classList.remove('open');
      this.sidebarConfig.toggleSideBar = true;
    }
    let index = 0;
    this.sidebarConfig.sidebarItems.forEach((element) => {
      const subMenu: any = document.querySelector('.' + element.id + index);
      if (this.sidebarConfig.toggleSideBar) {
        subMenu.classList.remove('openMenuSideBar');
        subMenu.classList.add('closeAllSidebars');
      } else {
        if (!element.hidden) {
          subMenu.classList.add('openMenuSideBar');
        }
        subMenu.classList.remove('closeAllSidebars');
      }
      index++;
    });
  }

  openSubMenus(id: any, item: any) {
    let hidden: any = false;
    let index = 0;
    this.sidebarConfig.sidebarItems.forEach((element) => {
      if (element.id != item.id) {
        let menu: any = document.querySelector('.' + element.id + index);
        menu.classList.remove('openMenuSideBar');
        menu.style.height = '0px';
        element.hidden = true;
      } else {
        if (!this.sidebarConfig.toggleSideBar) {
          element.hidden = !element.hidden;
          hidden = element.hidden;
        } else {
          hidden = false;
          element.hidden = false;
        }
      }
      index++;
    });
    const subMenu: any = document.querySelector('.' + id);
    if (!hidden) {
      subMenu.style.height = item.size;
      subMenu.classList.add('openMenuSideBar');
    } else {
      subMenu.classList.remove('openMenuSideBar');
      subMenu.style.height = '0px';
    }
    if (item.subMenuItemns == undefined) {
      this.clearClassSubMenu();
      this.clearClassMainMenu();
      item.checked = true;
    }
  }

  clearClassMainMenu() {
    this.sidebarConfig.sidebarItems.forEach((element) => {
      element.checked = false;
    });
  }

  clearClassSubMenu() {
    this.sidebarConfig.sidebarItems.forEach((element) => {
      if (element.subMenuItemns != null) {
        for (let cont = 0; cont < element.subMenuItemns.length; cont++) {
          const subMenuIds = element.subMenuItemns[cont].id;
          let subMenus = document.getElementById(subMenuIds);
          subMenus!.classList.remove('list-show-subMenu');
        }
      }
    });
  }
}
