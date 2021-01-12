import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { BroadcastService } from 'app/shared/services/broadcast.service';
import { InboxService } from 'app/shared/services/inbox.service';
import { UserService } from 'app/shared/services/user.service';
import { Subscription } from 'rxjs';
import { BroadCastComposeComponent } from './broadcast-compose.component';

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.scss']
})
export class BroadcastComponent implements OnInit {
  isMobile;
  screenSizeWatcher: Subscription;
  isSidenavOpen: Boolean = true;
  selectToggleFlag = false;
  // @ViewChild(MatSidenav) private sideNav: MatSidenav;
  broadcasts;
  users;
  private getAllBroadcastsub: Subscription
  constructor(private router: Router,
    private mediaObserver: MediaObserver,
    public composeDialog: MatDialog,
    private broadcastSvc: BroadcastService,
    private userService: UserService,
    private loader: AppLoaderService) { }

  ngOnInit(): void {
    this.getAllBroadcasts();
  }

  getAllBroadcasts() {
    this.loader.open();
    this.getAllBroadcastsub = this.broadcastSvc.getAllBroadcasts()
      .subscribe(response => {
        if (response.status == "success") {
          this.broadcasts = response.data;
        }
        else {
          this.broadcasts = []
        }
        this.loader.close();
      }, err => {
        this.broadcasts = [];
        this.loader.close();
      })
  }
  ngOnDestroy() {
    if (this.screenSizeWatcher) {
      this.screenSizeWatcher.unsubscribe()
    }
    if (this.getAllBroadcastsub) {
      this.getAllBroadcastsub.unsubscribe()
    }
  }
  openComposeDialog() {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.width = '80%'
    const dialogRef = this.composeDialog.open(BroadCastComposeComponent, matDialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllBroadcasts();
      }
    });
  }
  openReplyDialog(broadcast: any) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.width = '80%'
    matDialogConfig.data = { ...broadcast };
    const dialogRef = this.composeDialog.open(BroadCastComposeComponent, matDialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllBroadcasts();
      }
    });
  }
  selectToggleAll() {
    this.selectToggleFlag = !this.selectToggleFlag;
    this.broadcasts.forEach((msg) => { msg.selected = this.selectToggleFlag });
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

  public removeP_Tag(text: string) {
    while (text.includes("<p>") || text.includes("</p>")) {
      text = text.replace('<p>', '');
      text = text.replace('</p>', '');
    }
    return text
  }

}
