import { Component, OnInit, Input, Renderer2 } from "@angular/core";
import { NavigationService } from "../../../shared/services/navigation.service";
import { LayoutService } from "../../../shared/services/layout.service";
import PerfectScrollbar from "perfect-scrollbar";
import { CustomizerService } from "app/shared/services/customizer.service";
import { ThemeService, ITheme } from "app/shared/services/theme.service";

@Component({
  selector: "app-customizer",
  templateUrl: "./customizer.component.html",
  styleUrls: ["./customizer.component.scss"]
})
export class CustomizerComponent implements OnInit {
  isCustomizerOpen: boolean = false;
  viewMode: 'options' | 'json' = 'options';
  sidenavTypes = [
    {
      name: "Default Menu",
      value: "default-menu"
    },
    {
      name: "Separator Menu",
      value: "separator-menu"
    },
    {
      name: "Icon Menu",
      value: "icon-menu"
    }
  ];
  sidebarColors: any[];
  topbarColors: any[];

  layoutConf;
  selectedMenu: string = "icon-menu";
  selectedLayout: string;
  istopbarFixed = false;
  isFooterFixed = false;
  isRTL = false;
  marcoThemes: ITheme[];
  perfectScrollbarEnabled: boolean = true;

  constructor(
    private navService: NavigationService,
    public layout: LayoutService,
    private themeService: ThemeService,
    public customizer: CustomizerService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.layoutConf = this.layout.layoutConf;
    this.selectedLayout = this.layoutConf.navigationPos;
    this.istopbarFixed = this.layoutConf.topbarFixed;
    this.isRTL = this.layoutConf.dir === "rtl";
    this.marcoThemes = this.themeService.marcoThemes;
  }
  changeTheme(theme) {
    // this.themeService.changeTheme(theme);
    this.layout.publishLayoutChange({matTheme: theme.name})
  }
  changeLayoutStyle(data) {
    this.layout.publishLayoutChange({ navigationPos: this.selectedLayout });
  }

  toggleBreadcrumb(data) {
    this.layout.publishLayoutChange({ useBreadcrumb: data.checked });
  }
  toggletopbarFixed(data) {
    this.layout.publishLayoutChange({ topbarFixed: data.checked });
  }
  toggleDir(data) {
    let dir = data.checked ? "rtl" : "ltr";
    this.layout.publishLayoutChange({ dir: dir });
  }
  tooglePerfectScrollbar(data) {
    this.layout.publishLayoutChange({perfectScrollbar: this.perfectScrollbarEnabled})
  }
  
}
