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
    {
        path: 'list-attendance',
        loadChildren: () =>
            import('./pages/list-attendance/list-attendance.routes').then((m) => m.LISTATTENDANCE_ROUTERS),
    }



];
