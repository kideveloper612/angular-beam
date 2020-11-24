import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';

import { AppInboxService } from './app-inbox.service';
import { MailComposeComponent } from './mail-compose.component';
import { InboxService } from 'app/shared/services/inbox.service';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { SupplierService } from 'app/shared/services/supplier.service';
import { UserService } from 'app/shared/services/user.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './app-inbox.component.html',
  styleUrls: ['./app-inbox.component.css'],
  providers: [AppInboxService]
})
export class AppInboxComponent implements OnInit, OnDestroy {
  isMobile;
  screenSizeWatcher: Subscription;
  isSidenavOpen: Boolean = true;
  selectToggleFlag = false;
  // @ViewChild(MatSidenav) private sideNav: MatSidenav;
  messages;
  users;
  private getAllMessageSub: Subscription
  constructor(private router: Router,
    private mediaObserver: MediaObserver,
    public composeDialog: MatDialog,
    private inboxService: InboxService,
    private userService: UserService,
    private loader: AppLoaderService) { }

  ngOnInit() {
    // this.inboxSideNavInit();
    this.getAllMessages();
  }

  getAllMessages() {
    this.loader.open();
    this.getAllMessageSub = this.inboxService.getAllMessages()
      .subscribe(response => {
        if (response.status == "success") {
          this.messages = response.data;
        }
        else {
          this.messages = []
        }
        this.loader.close();
      }, err => {
        this.messages = [];
        this.loader.close();
      })
  }
  ngOnDestroy() {
    if (this.screenSizeWatcher) {
      this.screenSizeWatcher.unsubscribe()
    }
    if (this.getAllMessageSub) {
      this.getAllMessageSub.unsubscribe()
    }
  }
  openComposeDialog() {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.width = '80%'
    const dialogRef = this.composeDialog.open(MailComposeComponent, matDialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllMessages();
      }
    });
  }
  openReplyDialog(message: any) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.width = '80%'
    const dialogRef = this.composeDialog.open(MailComposeComponent, {
      width: '80%',
      data: { ...message }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllMessages();
      }
    });
  }
  selectToggleAll() {
    this.selectToggleFlag = !this.selectToggleFlag;
    this.messages.forEach((msg) => { msg.selected = this.selectToggleFlag });
  }

  stopProp(e) {
    e.stopPropagation()
  }

  updateSidenav() {
    let self = this;
    setTimeout(() => {
      self.isSidenavOpen = !self.isMobile;
      // self.sideNav.mode = self.isMobile ? 'over' : 'side';
    })
  }
  // inboxSideNavInit() {
  //   this.isMobile = this.mediaObserver.isActive('xs') || this.mediaObserver.isActive('sm');
  //   this.updateSidenav();
  //   this.screenSizeWatcher = this.mediaObserver.media$.subscribe((change: MediaChange) => {
  //     this.isMobile = (change.mqAlias == 'xs') || (change.mqAlias == 'sm');
  //     this.updateSidenav();
  //   });
  // }
}
