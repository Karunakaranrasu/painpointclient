import { Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserCrudComponent } from './admin/user-crud/user-crud.component';
import { EmployeeComponent } from './employee/employee.component';
import { PageNotFoundComponent } from './shared/layouts/page-not-found/page-not-found.component';
import { AdminAuthGuardLogin, AdminAuthGaurdService, BuyerAuthGaurdService, SellerAuthGaurdService, SellerBuyerAuthGuardLogin } from './shared/services/auth-guard.service';

export const routes: Routes = [
  { path: "", redirectTo: "admin-login", pathMatch: "full" },
  { path: "admin-login", component: AdminLoginComponent },
  
  //admin
  {
    path: '', canActivate:[AdminAuthGuardLogin] ,children: [
      { path: "admin-login", component: AdminLoginComponent }
    ]
  },
  {
    path: '', canActivate:[AdminAuthGaurdService], children: [
      { path: "admin-dashboard", component: AdminDashboardComponent },
      { path: "admin/employee", component: UserCrudComponent },
      { path: "admin/ereport", component: EmployeeComponent },
      { path: "admin/my-profile", component: UserProfileComponent },
      { path: "admin/contact-us", component: ContactUsComponent },
    ]
  },
  {path:"**", component:PageNotFoundComponent}
];
