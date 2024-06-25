import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ListAttendanceComponent } from './app/pages/list-attendance/list-attendance.component';
import { StatisticalAttendanceComponent } from './app/pages/statistical-attendance/statistical-attendance.component';


bootstrapApplication(StatisticalAttendanceComponent, appConfig)
  .catch((err) => console.error(err));
bootstrapApplication(ListAttendanceComponent, appConfig)
  .catch((err) => console.error(err));



  








