import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UserRoleGuard } from './shared/guards/user-role.guard';

export const rootRouterConfig: Routes = [
  // { 
  //   path: '', 
  //   redirectTo: 'home', 
  //   pathMatch: 'full' 
  // },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
  //   data: { title: 'Choose A Demo' }
  // },
  {
    path: '',
    redirectTo: 'beam',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule),
        data: { title: 'Session' }
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { title: 'Dashboard', breadcrumb: 'Dashboard' }
      },
      {
        path: 'beam',
        loadChildren: () => import('./views/beam/beam.module').then(m => m.BeamModule),
        data: { title: 'My Beam', breadcrumb: 'Beam' }
      },
      {
        path: 'products',
        loadChildren: () => import('./views/products/products.module').then(m => m.ProductsModule),
        data: { title: 'Products', breadcrumb: 'Products' }
      },
      {
        path: 'material',
        loadChildren: () => import('./views/material-example-view/material-example-view.module').then(m => m.MaterialExampleViewModule),
        data: { title: 'Material', breadcrumb: 'Materail' }
      },
      {
        path: 'dialogs',
        loadChildren: () => import('./views/app-dialogs/app-dialogs.module').then(m => m.AppDialogsModule),
        data: { title: 'Dialogs', breadcrumb: 'Dialogs' }
      },
      {
        path: 'profile',
        loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule),
        data: { title: 'Profile', breadcrumb: 'Profile' }
      },
      {
        path: 'others',
        loadChildren: () => import('./views/others/others.module').then(m => m.OthersModule),
        data: { title: 'Others', breadcrumb: 'Others' }
      },
      {
        path: 'orders',
        loadChildren: () => import('./views/order/order.module').then(m => m.OrderModule),
        data: { title: 'Orders', breadcrumb: 'Orders' }
      },
      {
        path: 'tables',
        loadChildren: () => import('./views/tables/tables.module').then(m => m.TablesModule),
        data: { title: 'Tables', breadcrumb: 'Tables' }
      },
      {
        path: 'pricing',
        loadChildren: () => import('./views/app-pricing/app-pricing.module').then(m => m.AppPricingModule),
        data: { title: 'Pricing', breadcrumb: 'Pricing' }
      },

      {
        path: 'forms',
        loadChildren: () => import('./views/forms/forms.module').then(m => m.AppFormsModule),
        data: { title: 'Forms', breadcrumb: 'Forms' }
      },
      {
        path: 'chart',
        loadChildren: () => import('./views/chart-example-view/chart-example-view.module').then(m => m.ChartExampleViewModule),
        data: { title: 'Charts', breadcrumb: 'Charts' }
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/charts/charts.module').then(m => m.AppChartsModule),
        data: { title: 'Charts', breadcrumb: 'Charts' }
      },

      {
        path: 'help',
        loadChildren: () => import('./views/help/help.module').then(m => m.AppHelpModule),
        data: { title: 'Help', breadcrumb: 'Help' }
      },
      {
        path: 'inbox',
        loadChildren: () => import('./views/app-inbox/app-inbox.module').then(m => m.AppInboxModule),
        data: { title: 'Inbox', breadcrumb: 'Inbox' }
      },
      {
        path: 'broadcast',
        loadChildren: () => import('./views/broadcast/broadcast.module').then(m => m.BroadcastModule),
        data: { title: 'Broadcast', breadcrumb: 'Broadcast' }
      },
      {
        path: 'calendar',
        loadChildren: () => import('./views/app-calendar/app-calendar.module').then(m => m.AppCalendarModule),
        data: { title: 'Calendar', breadcrumb: 'Calendar' }
      },
      {
        path: 'chat',
        loadChildren: () => import('./views/app-chats/app-chats.module').then(m => m.AppChatsModule),
        data: { title: 'Chat', breadcrumb: 'Chat' }
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule),
        data: { title: 'Notifications', breadcrumb: 'Notifications' }
      },
      {
        path: 'suppliers',
        loadChildren: () => import('./views/suppliers/suppliers.module').then(m => m.SuppliersModule),
        data: { title: 'Suppliers', breadcrumb: 'Suppliers' }
      },
      {
        path: 'users',
        loadChildren: () => import('./views/users/users.module').then(m => m.UsersModule),
        data: { title: 'Users', breadcrumb: 'Users' }
      },
      {
        path: 'users-card',
        loadChildren: () => import('./views/users-card/users.module').then(m => m.UsersModule),
        data: { title: 'User', breadcrumb: 'User' }
      },
      {
        path: 'shop',
        loadChildren: () => import('./views/shop/shop.module').then(m => m.ShopModule),
        data: { title: 'Shop', breadcrumb: 'Shop' }
      },
      {
        path: 'search',
        loadChildren: () => import('./views/search-view/search-view.module').then(m => m.SearchViewModule)
      },
      {
        path: 'invoice',
        loadChildren: () => import('./views/invoice/invoice.module').then(m => m.InvoiceModule),
        data: { title: 'Invoice', breadcrumb: 'Pages' }
      },
      {
        path: 'todo',
        loadChildren: () => import('./views/todo/todo.module').then(m => m.TodoModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./views/order/order.module').then(m => m.OrderModule),
        data: { title: 'Orders', breadcrumb: 'Orders' }
      },
      {
        path: 'page-layouts',
        loadChildren: () => import('./views/page-layouts/page-layouts.module').then(m => m.PageLayoutsModule)
      },

      {
        path: 'icons',
        loadChildren: () => import('./views/mat-icons/mat-icons.module').then(m => m.MatIconsModule),
        data: { title: 'Icons', breadcrumb: 'Maticons' }
      },
      {
        path: 'colors',
        loadChildren: () => import('./views/colors/colors.module').then(m => m.ColorsModule),
        data: { title: 'Colors', breadcrumb: 'Colors' }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];

