import { Component, OnInit, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { LayoutService } from '../../services/layout.service';
import { JwtAuthService } from '../../services/auth/jwt-auth.service';
import { MessagingService } from 'app/shared/services/messaging.service';
import moment from 'moment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'app/shared/services/user.service';
import { UserPopupComponent } from 'app/views/users/user-lists/user-popup/user-popup.component';
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
  public layoutConf: any;
  constructor(
    private themeService: ThemeService,
    private layout: LayoutService,
    private renderer: Renderer2,
    public jwtAuth: JwtAuthService,
    public messagingSvc: MessagingService,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private userSvc: UserService,
    private loader: AppLoaderService
  ) { }
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
    if (this.layoutConf.sidebarStyle === 'closed') {
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
    if (this.layoutConf.sidebarStyle === 'compact') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full',
        sidebarCompactToggle: false
      }, { transitionClass: true })
    }

    // * --> compact
    this.layout.publishLayoutChange({
      sidebarStyle: 'compact',
      sidebarCompactToggle: true
    }, { transitionClass: true })

  }

  onSearch(e) {
    //   console.log(e)
  }

  logout() {
    this.jwtAuth.signout();
  }

  public getFormattedDateTime(dt) {
    return moment(dt).format('DD/MM/YYYY hh:mm:ss')
  }

  public updateProfile() {
    let dialogRef: MatDialogRef<any> = this.dialog.open(UserPopupComponent, {
      width: '720px',
      disableClose: false,
      data: {
        title: 'My Profile', payload: {
          name: this.jwtAuth.user.name,
          email: this.jwtAuth.user.email,
          verified: true,
          role: 'admin',
          phoneNumber: this.jwtAuth.user.phoneNumber,
          imagePath: this.jwtAuth.user.imagePath
        }, isNew: false
      }
    })
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          // If user press cancel
          return;
        }
        this.loader.open();
        res = {
          ...res,
          email: this.jwtAuth.user.email,
          verified: true,
          role: 'admin',
        }
        this.jwtAuth.update(res)
          .subscribe(data => {
            this.loader.close();
            if (data.status == 'success') {
              this.snack.open('My Profile has been updated!', 'OK', { duration: 4000 })
            }
            else
              this.snack.open(data.msg, 'OK', { duration: 4000 })
          }, err => {
            this.snack.open('Failed', 'OK', { duration: 4000 })
            this.loader.close();
          })
      })
  }
}