import {
  Directive,
  OnInit,
  OnDestroy,
  HostBinding,
  Input,
  HostListener
} from "@angular/core";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { MatchMediaService } from "app/shared/services/match-media.service";
import { marcoSidenavHelperService } from "./marco-sidenav-helper.service";
import { MatSidenav } from "@angular/material/sidenav";
import { MediaObserver } from "@angular/flex-layout";

@Directive({
  selector: "[marcoSidenavHelper]"
})
export class marcoSidenavHelperDirective implements OnInit, OnDestroy {
  @HostBinding("class.is-open")
  isOpen: boolean;

  @Input("marcoSidenavHelper")
  id: string;

  @Input("isOpen")
  isOpenBreakpoint: string;

  private unsubscribeAll: Subject<any>;

  constructor(
    private matchMediaService: MatchMediaService,
    private marcoSidenavHelperService: marcoSidenavHelperService,
    private matSidenav: MatSidenav,
    private mediaObserver: MediaObserver
  ) {
    // Set the default value
    this.isOpen = true;

    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.marcoSidenavHelperService.setSidenav(this.id, this.matSidenav);

    if (this.mediaObserver.isActive(this.isOpenBreakpoint)) {
      this.isOpen = true;
      this.matSidenav.mode = "side";
      this.matSidenav.toggle(true);
    } else {
      this.isOpen = false;
      this.matSidenav.mode = "over";
      this.matSidenav.toggle(false);
    }

    this.matchMediaService.onMediaChange
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        if (this.mediaObserver.isActive(this.isOpenBreakpoint)) {
          this.isOpen = true;
          this.matSidenav.mode = "side";
          this.matSidenav.toggle(true);
        } else {
          this.isOpen = false;
          this.matSidenav.mode = "over";
          this.matSidenav.toggle(false);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}

@Directive({
  selector: "[marcoSidenavToggler]"
})
export class marcoSidenavTogglerDirective {
  @Input("marcoSidenavToggler")
  public id: any;

  constructor(private marcoSidenavHelperService: marcoSidenavHelperService) {}

  @HostListener("click")
  onClick() {
    // console.log(this.marcoSidenavHelperService.getSidenav(this.id))
    this.marcoSidenavHelperService.getSidenav(this.id).toggle();
  }
}
