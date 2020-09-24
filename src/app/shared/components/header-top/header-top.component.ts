import { Component, OnInit, Input, OnDestroy, Renderer2 } from '@angular/core';
import { NavigationService } from "../../../shared/services/navigation.service";
import { Subscription } from 'rxjs';
import { ThemeService } from '../../../shared/services/theme.service';
import { LayoutService } from '../../services/layout.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html'
})
export class HeaderTopComponent implements OnInit, OnDestroy {
  layoutConf: any;
  menuItems:any;
  menuItemSub: Subscription;
  marcoThemes: any[] = [];

  @Input() notificPanel;
  constructor(
    private layout: LayoutService,
    private navService: NavigationService,
    public themeService: ThemeService,
    private renderer: Renderer2,
    public jwtAuth: JwtAuthService
  ) { }

   // Dummy notifications
   notifications = [{
    message: 'New orders received',
    icon: 'assignment_ind',
    time: '3 min ago',
    route: '/inbox',
    color: 'primary'
  }, {
    message: 'New costumer has registered',
    icon: 'chat',
    time: '55 min ago',
    route: '/chat',
    color: 'accent'
  }, {
    message: 'Project has been appoved',
    icon: 'settings_backup_restore',
    time: '12 min ago',
    route: '/charts',
    color: 'warn'
  }, {
    message: 'Task has been finished',
    icon: 'account_box',
    time: '55 min ago',
    route: '/chat',
    color: 'accent'
  }, {
    message: 'New account added',
    icon: 'attach_file',
    time: '55 min ago',
    route: '/chat',
    color: 'accent'
  }]

  ngOnInit() {
    this.layoutConf = this.layout.layoutConf;
    this.marcoThemes = this.themeService.marcoThemes;
    this.menuItemSub = this.navService.menuItems$
    .subscribe(res => {
      res = res.filter(item => item.type !== 'icon' && item.type !== 'separator');
      let limit = 4
      let mainItems:any[] = res.slice(0, limit)
      if(res.length <= limit) {
        return this.menuItems = mainItems
      }
      let subItems:any[] = res.slice(limit, res.length - 1)
      mainItems.push({
        name: 'Morence',
        type: 'dropDown',
        tooltip: 'More',
        icon: 'more_horiz',
        sub: subItems
      }, {
        name: 'Kurence',
        type: 'dropDown',
        tooltip: 'More',
        icon: 'more_horiz',
        sub: subItems
      })
      this.menuItems = mainItems
    })
  }
  ngOnDestroy() {
    this.menuItemSub.unsubscribe()
  }

  changeTheme(theme) {
    this.layout.publishLayoutChange({matTheme: theme.name})
  }
  toggleNotific() {
    this.notificPanel.toggle();
  }
  toggleSidenav() {
    if(this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      })
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    })
  }
}
