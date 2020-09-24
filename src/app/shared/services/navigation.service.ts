import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

interface IMenuItem {
  type: string; // Possible values: link/dropDown/icon/separator/extLink
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
  icon?: string; // Material icon name
  tooltip?: string; // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
}
interface IChildItem {
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;
  sub?: IChildItem[];
}

interface IBadge {
  color: string; // primary/accent/warn/hex color codes(#fff000)
  value: string; // Display text
}

@Injectable()
export class NavigationService {
  constructor() {}
  iconMenu: IMenuItem[] = [
    {
      name: "Home",
      type: "icon",
      tooltip: "Home",
      icon: "home",
      state: "home"
    },
    {
      name: "Profile",
      type: "icon",
      tooltip: "Profile",
      icon: "person",
      state: "profile/overview"
    },
    {
      name: "Tour",
      type: "icon",
      tooltip: "Tour",
      icon: "flight_takeoff",
      state: "tour"
    },
    {
      name: "Dashboard",
      type: "dropDown",
      tooltip: "Dashboard",
      icon: "dashboard",
      state: "dashboard",
      sub: [
        { name: "Default", state: "default" },
        
      ]
    },
    {
      type: "separator",
      name: "APPS"
    },
    {
      name: "Chat",
      type: "link",
      tooltip: "Chat",
      icon: "chat",
      state: "chat",
      badges: [{ color: "primary", value: "New" }],
    },
    {
      name: "Calendar",
      type: "link",
      tooltip: "Calendar",
      icon: "date_range",
      state: "calendar"
    },
    {
      name: "Todo",
      type: "link",
      tooltip: "Todo",
      icon: "center_focus_strong",
      state: "todo",
      badges: [{ color: "#7367f0", value: "4" }]
    },
    
    {
      name: "E-commerce",
      type: "dropDown",
      tooltip: "Shop",
      icon: "shopping_cart",
      state: "shop",
      sub: [
        { name: "Product", state: "" },
        { name: "Product Details", state: "products/5a9ae2106f155194e5c95d67" },
        { name: "Cart", state: "cart" },
        { name: "Checkout", state: "checkout" }
      ]
    },
    {
      name: "Users",
      type: "dropDown",
      tooltip: "Users",
      icon: "face",
      state: "users",
     
      sub: [
        { name: "List", state: "list" },
        // { name: "User grid", state: "analytics" },
      ]
    },
    {
      name: "Inbox",
      type: "link",
      tooltip: "Inbox",
      icon: "email",
      state: "inbox",
      badges: [{ color: "#03a9f4", value: "3" }]
    },
    {
      type: "separator",
      name: "PAGES"
    },
    {
      name: "Authentication",
      type: "dropDown",
      tooltip: "Pages",
      icon: "https",
      state: "auth",
      sub: [
        { name: "Sign up", type: "dropDown", 
        sub: [
          { name: "Sign up", state: "signup" },
          { name: "Sign up 2", state: "signup2" },
          { name: "Sign up 3", state: "signup3" },
          { name: "Sign up 4", state: "signup4" },
        ]
      },
      { name: "Sign in", type: "dropDown", 
      sub: [
        { name: "Sign in", state: "signin" },
        { name: "Sign in 2", state: "signin2" },
        { name: "Sign in 3", state: "signin3" },
        { name: "Sign in 4", state: "signin4" },
      ]
    },
        
        { name: "FORGOT", state: "forgot-password" },
        { name: "Error 404", state: "404" },
        { name: "Error 500", state: "error" },
        { name: "Coming Soon", state: "coming-soon" }
      ]
    },
    {
      name: "Invoice",
      type: "link",
      icon: "receipt",
      state: "invoice/list",
      badges: [{ color: "#4caf50", value: "2" }],
    },
   
    
    {
      name: "Profile",
      type: "dropDown",
      tooltip: "Profile",
      icon: "person",
      state: "profile",
      
      sub: [
        { name: "Overview", state: "overview" },
        { name: "Settings", state: "settings" },
        { name: "Blank", state: "blank" }
      ]
    },
    {
      name: "Pricing",
      type: "link",
      tooltip: "Pricing",
      icon: "attach_money",
      state: "pricing"
    },
    
    
    {
      name: "Help",
      type: "dropDown",
      tooltip: "Help",
      icon: "add_location",
      state: "help",
      sub: [
        { name: "Home", state: "help-home" },
        { name: "FAQs", state: "faq" },
        { name: "Support ", state: "support" }
      ]
    },

    
    
    
    {
      type: "separator",
      name: "UI ELEMENTS"
    },
    {
      name: "Components",
      type: "dropDown",
      tooltip: "Material",
      icon: "favorite",
      state: "material",
      
      sub: [
        
            { name: "Autocomplete", state: "autocomplete" },
            { name: "Checkbox", state: "checkbox" },
            { name: "Datepicker", state: "datepicker" },
            { name: "Form Field", state: "form-field" },
            { name: "Input Field", state: "input-field" },
            { name: "Radio Button", state: "radio-button" },
            { name: "Select", state: "select" },
            { name: "Slider", state: "slider" },
            { name: "Slider Toggle", state: "slider-toggle" },
         
        {
          name: "Navigation",
          type: "dropDown",
          sub: [
            { name: "Menu", state: "menu" },
            { name: "Sidenav", state: "sidenav" },
            { name: "Toolbar", state: "toolbar" }
          ]
        },
            { name: "Card", state: "card" },
            { name: "Divider", state: "divider" },
            { name: "Expansion Panel", state: "expansion-panel" },
            { name: "Grid", state: "grid" },
            { name: "List", state: "list" },
            { name: "Stepper", state: "stepper" },
            { name: "Tab", state: "tab-group" },
            { name: "Tree", state: "tree" }
         ,
        
       
            { name: "BUTTONS", state: "buttons" },
            { name: "Button Toggle", state: "button-toggle" },
            { name: "Badge", state: "badge" },
            { name: "Chips", state: "chips" },
            { name: "Icons", state: "icons" },
            { name: "Progress Spinner", state: "progress-spinner" },
            { name: "Progress Bar", state: "progress-bar" },
            { name: "Ripples", state: "ripples" 
          
        },
       
            { name: "Tooltip", state: "tooltip" },
            { name: "Bottom Sheet", state: "bottom-sheet" },
            { name: "Dialog", state: "dialog" },
            { name: "Snackbar", state: "snackbar" },
         
        {
          name: "Data Table",
          type: "dropDown",
          sub: [
            { name: "paginator", state: "paginator" },
            { name: "Sort Header", state: "sort-header" },
            { name: "Table", state: "table" }
          ]
        },
        { name: "Buttons Loading", state: "loading-buttons" }
      ]
    },
    {
      name: "Dialogs",
      type: "dropDown",
      tooltip: "Dialogs",
      icon: "filter_none",
      state: "dialogs",
      sub: [
        { name: "CONFIRM", state: "confirm" },
        { name: "LOADER", state: "loader" }
      ]
    },
    
   
    {
      name: "Page Layouts",
      type: "dropDown",
      icon: "view_carousel",
      state: "page-layouts",
      sub: [
        { name: "Left sidebar card", state: "left-sidebar-card" },
        { name: "Full width card", state: "full-width-card" },
        { name: "Full width card tab", state: "full-width-card-tab" },

 
      ]
    },
   
   

    {
      name: "Others",
      type: "dropDown",
      tooltip: "Extras",
      icon: "bubble_chart",
      state: "others",
      sub: [
        { name: "GALLERY", state: "gallery" },
        { name: "Colors", state: "colors" },
        { name: "BLANK", state: "blank" }
      ]
    },
    {
      name: "Maticons",
      type: "link",
      tooltip: "Material Icons",
      icon: "store",
      state: "icons"
    },
 
    {
      type: "separator",
      name: "Forms & Table"
    },  {
      name: "Forms",
      type: "dropDown",
      tooltip: "Forms",
      icon: "description",
      state: "forms",
      sub: [
        { name: "BASIC", state: "basic" },
        { name: "EDITOR", state: "editor" },
        { name: "UPLOAD", state: "upload" },
        { name: "WIZARD", state: "wizard" }
      ]
    },
    {
      name: "Tables",
      type: "dropDown",
      tooltip: "Tables",
      icon: "format_line_spacing",
      state: "tables",
      sub: [
        { name: "FULLSCREEN", state: "fullscreen" },
        { name: "PAGING", state: "paging" },
        { name: "FILTER", state: "filter" }
      ]
    },
    {
      type: "separator",
      name: "CUSTOMIZE"
    },
    {
      name: "Configuration",
      type: "extLink",
      tooltip: "Configuration",
      icon: "library_books",
      state: "http://"
    }
  ];

  separatorMenu: IMenuItem[] = [
    {
      type: "separator",
      name: "Custom components"
    },
    {
      name: "Dashboard",
      type: "link",
      tooltip: "Dashboard",
      icon: "dashboard",
      state: "dashboard"
    },
    {
      name: "Inbox",
      type: "link",
      tooltip: "Inbox",
      icon: "inbox",
      state: "inbox"
    },
    {
      name: "Chat",
      type: "link",
      tooltip: "Chat",
      icon: "chat",
      state: "chat"
    },
    {
      name: "Users",
      type: "link",
      tooltip: "Users",
      icon: "format_list_bulleted",
      state: "users/user-list"
    },
    {
      name: "Dialogs",
      type: "dropDown",
      tooltip: "Dialogs",
      icon: "filter_none",
      state: "dialogs",
      sub: [
        { name: "CONFIRM", state: "confirm" },
        { name: "LOADER", state: "loader" }
      ]
    },
    {
      name: "Profile",
      type: "dropDown",
      tooltip: "Profile",
      icon: "person",
      state: "profile",
      sub: [
        { name: "OVERVIEW", state: "overview" },
        { name: "SETTINGS", state: "settings" },
        { name: "BLANK", state: "blank" }
      ]
    },
    {
      name: "Tour",
      type: "link",
      tooltip: "Tour",
      icon: "flight_takeoff",
      state: "tour"
    },
    {
      type: "separator",
      name: "Integrated components"
    },
    {
      name: "Calendar",
      type: "link",
      tooltip: "Calendar",
      icon: "date_range",
      state: "calendar"
    },
    {
      name: "Material",
      type: "dropDown",
      tooltip: "Material",
      icon: "favorite",
      state: "material",
      sub: [
        { name: "BUTTONS", state: "buttons" },
        { name: "Button Toggle", state: "button-toggle" },
        { name: "Buttons Loading", state: "loading-buttons" },
        { name: "CARDS", state: "cards" },
        { name: "GRIDS", state: "grids" },
        { name: "LISTS", state: "lists" },
        { name: "MENU", state: "menu" },
        { name: "TABS", state: "tabs" },
        { name: "SELECT", state: "select" },
        { name: "RADIO", state: "radio" },
        { name: "AUTOCOMPLETE", state: "autocomplete" },
        { name: "SLIDER", state: "slider" },
        { name: "PROGRESS", state: "progress" },
        { name: "SNACKBAR", state: "snackbar" }
      ]
    },
  
    {
      name: "MAP",
      type: "link",
      tooltip: "Map",
      icon: "add_location",
      state: "map"
    },
    {
      name: "Charts",
      type: "link",
      tooltip: "Charts",
      icon: "show_chart",
      state: "charts"
    },
    
    {
      type: "separator",
      name: "Other components"
    },
    {
      name: "SESSIONS",
      type: "dropDown",
      tooltip: "Pages",
      icon: "view_carousel",
      state: "sessions",
      sub: [
        { name: "SIGNUP", state: "signup" },
        { name: "SIGNIN", state: "signin" },
        { name: "FORGOT", state: "forgot-password" },
        { name: "LOCKSCREEN", state: "lockscreen" },
        { name: "NOTFOUND", state: "404" },
        { name: "ERROR", state: "error" }
      ]
    },
    {
      name: "Others",
      type: "dropDown",
      tooltip: "Others",
      icon: "blur_on",
      state: "others",
      sub: [
        { name: "GALLERY", state: "gallery" },
        { name: "PRICINGS", state: "pricing" },
        { name: "USERS", state: "users" },
        { name: "BLANK", state: "blank" }
      ]
    },
    {
      name: "Maticons",
      type: "link",
      tooltip: "Material Icons",
      icon: "store",
      state: "icons"
    },{
      name: "Colors",
      type: "link",
      tooltip: "Colors",
      icon: "color_lens",
      state: "colors"
    },
    {
      name: "DOC",
      type: "extLink",
      tooltip: "Configuration",
      icon: "library_books",
      state: "http://"
    }
  ];

  plainMenu: IMenuItem[] = [
    {
      name: "DASHBOARD",
      type: "link",
      tooltip: "Dashboard",
      icon: "dashboard",
      state: "dashboard"
    },
    {
      name: "INBOX",
      type: "link",
      tooltip: "Inbox",
      icon: "inbox",
      state: "inbox"
    },
    {
      name: "CHAT",
      type: "link",
      tooltip: "Chat",
      icon: "chat",
      state: "chat"
    },
    {
      name: "CRUD Table",
      type: "link",
      tooltip: "CRUD Table",
      icon: "format_list_bulleted",
      state: "cruds/ngx-table"
    },
    {
      name: "CALENDAR",
      type: "link",
      tooltip: "Calendar",
      icon: "date_range",
      state: "calendar"
    },
    {
      name: "DIALOGS",
      type: "dropDown",
      tooltip: "Dialogs",
      icon: "filter_none",
      state: "dialogs",
      sub: [
        { name: "CONFIRM", state: "confirm" },
        { name: "LOADER", state: "loader" }
      ]
    },
    {
      name: "MATERIAL",
      type: "dropDown",
      icon: "favorite",
      state: "component",
      sub: [
        { name: "BUTTONS", state: "buttons" },
        { name: "Button Toggle", state: "button-toggle" },
        { name: "Buttons Loading", state: "loading-buttons" },
        { name: "CARDS", state: "cards" },
        { name: "GRIDS", state: "grids" },
        { name: "LISTS", state: "lists" },
        { name: "MENU", state: "menu" },
        { name: "TABS", state: "tabs" },
        { name: "SELECT", state: "select" },
        { name: "RADIO", state: "radio" },
        { name: "AUTOCOMPLETE", state: "autocomplete" },
        { name: "SLIDER", state: "slider" },
        { name: "PROGRESS", state: "progress" },
        { name: "SNACKBAR", state: "snackbar" }
      ]
    },
    {
      name: "FORMS",
      type: "dropDown",
      tooltip: "Forms",
      icon: "description",
      state: "forms",
      sub: [
        { name: "BASIC", state: "basic" },
        { name: "EDITOR", state: "editor" },
        { name: "UPLOAD", state: "upload" },
        { name: "WIZARD", state: "wizard" }
      ]
    },
    {
      name: "TABLES",
      type: "dropDown",
      tooltip: "Tables",
      icon: "format_line_spacing",
      state: "tables",
      sub: [
        { name: "FULLSCREEN", state: "fullscreen" },
        { name: "PAGING", state: "paging" },
        { name: "FILTER", state: "filter" }
      ]
    },
    {
      name: "PROFILE",
      type: "dropDown",
      tooltip: "Profile",
      icon: "person",
      state: "profile",
      sub: [
        { name: "OVERVIEW", state: "overview" },
        { name: "SETTINGS", state: "settings" },
        { name: "BLANK", state: "blank" }
      ]
    },
    {
      name: "TOUR",
      type: "link",
      tooltip: "Tour",
      icon: "flight_takeoff",
      state: "tour"
    },
    {
      name: "MAP",
      type: "link",
      tooltip: "Map",
      icon: "add_location",
      state: "map"
    },
    {
      name: "CHARTS",
      type: "link",
      tooltip: "Charts",
      icon: "show_chart",
      state: "charts"
    },
    {
      name: "DND",
      type: "link",
      tooltip: "Drag and Drop",
      icon: "adjust",
      state: "dragndrop"
    },
    {
      name: "SESSIONS",
      type: "dropDown",
      tooltip: "Pages",
      icon: "view_carousel",
      state: "sessions",
      sub: [
        { name: "SIGNUP", state: "signup" },
        { name: "SIGNIN", state: "signin" },
        { name: "FORGOT", state: "forgot-password" },
        { name: "LOCKSCREEN", state: "lockscreen" },
        { name: "NOTFOUND", state: "404" },
        { name: "ERROR", state: "error" }
      ]
    },
    {
      name: "OTHERS",
      type: "dropDown",
      tooltip: "Others",
      icon: "blur_on",
      state: "others",
      sub: [
        { name: "GALLERY", state: "gallery" },
        { name: "PRICINGS", state: "pricing" },
        { name: "USERS", state: "users" },
        { name: "BLANK", state: "blank" }
      ]
    },
    {
      name: "MATICONS",
      type: "link",
      tooltip: "Material Icons",
      icon: "store",
      state: "icons"
    },
    
    {
      name: "DOC",
      type: "extLink",
      tooltip: "Configuration",
      icon: "library_books",
      state: "http://"
    }
  ];

  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle: string = "Frequently Accessed";
  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();

  // Customizer component uses this method to change menu.
  // You can remove this method and customizer component.
  // Or you can customize this method to supply different menu for
  // different user type.
  
}
