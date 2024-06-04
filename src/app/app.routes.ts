import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SendSmsComponent } from './pages/send-sms/send-sms.component';
import { EmailSenderComponent } from './pages/email-sender/email-sender.component';
import { AuthGuard } from './service/auth.guard.service';

export const routes: Routes = [    
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: '', component: LayoutComponent, canActivate: [AuthGuard],
        children:[
            {
                path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]
            },
            {
                path: 'send-sms', component: SendSmsComponent, canActivate: [AuthGuard]
            },
            {
                path: 'send-email', component: EmailSenderComponent, canActivate: [AuthGuard]
            }
        ]
    }
];
