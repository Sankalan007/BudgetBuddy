import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { BudgetComponent } from './pages/budget/budget.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { GoalsComponent } from './pages/goals/goals.component';
import { NewtransactionComponent } from './pages/newtransaction/newtransaction.component';
import { AuthGuard } from './guard/auth/auth.guard';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard] },
  { path: 'budget', component: BudgetComponent, canActivate: [AuthGuard] },
  { path: 'goals', component: GoalsComponent, canActivate: [AuthGuard] },
  { path: 'analytics', component: AnalyticsComponent, canActivate: [AuthGuard] },

  { path: 'new-transaction', component: NewtransactionComponent, canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
