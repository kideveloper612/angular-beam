import { Routes } from "@angular/router";


import { DefaultDashboardComponent } from "./default-dashboard/default-dashboard.component";
import { UserRoleGuard } from "app/shared/guards/user-role.guard";
import { config } from "config";

export const DashboardRoutes: Routes = [
  {
    path: "",
    component: DefaultDashboardComponent,
    canActivate: [UserRoleGuard],
    data: { title: "Default", breadcrumb: "Main Dashboard", roles: config.authRoles.sa }
  },

];
