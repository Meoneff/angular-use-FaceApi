import { Component } from '@angular/core';

@Component({
  selector: 'app-statistical-attendance',
  standalone: true,
  imports: [],
  templateUrl: './statistical-attendance.component.html',
  styleUrl: './statistical-attendance.component.scss'
})
export class StatisticalAttendanceComponent {
  click() {
    const  attendances = sessionStorage.getItem('attendances');
    const attendancesAfterParse = JSON.parse(attendances??"[]");
    console.log(attendancesAfterParse);
  }
}
