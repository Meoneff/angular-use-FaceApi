import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
    },

    {
        path: 'statistical-attendance',
        loadChildren: () =>
            import('./pages/statistical-attendance/statistical-attendance.routes').then(
                (m) => m.STATISTICALATTENDANCE_ROUTERS
            ),
    },
    {
        path: '',
        loadChildren: () =>
            import('./pages/statistical-attendance/statistical-attendance.routes').then((m) => m.STATISTICALATTENDANCE_ROUTERS),
    },



];
