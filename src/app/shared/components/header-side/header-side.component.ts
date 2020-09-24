import { Component, OnInit, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { LayoutService } from '../../services/layout.service';
import { JwtAuthService } from '../../services/auth/jwt-auth.service';

@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.template.html'
})
export class HeaderSideComponent implements OnInit {
  @Input() notificPanel;



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

  public marcoThemes;
  public layoutConf:any;
  constructor(
    private themeService: ThemeService,
    private layout: LayoutService,
    private renderer: Renderer2,
    public jwtAuth: JwtAuthService
  ) {}
  ngOnInit() {
    this.marcoThemes = this.themeService.marcoThemes;
    this.layoutConf = this.layout.layoutConf;
  }

  changeTheme(theme) {
    // this.themeService.changeTheme(theme);
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

  toggleCollapse() {
    // compact --> full
    if(this.layoutConf.sidebarStyle === 'compact') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full',
        sidebarCompactToggle: false
      }, {transitionClass: true})
    }

    // * --> compact
    this.layout.publishLayoutChange({
      sidebarStyle: 'compact',
      sidebarCompactToggle: true
    }, {transitionClass: true})

  }

  onSearch(e) {
    //   console.log(e)
  }
}