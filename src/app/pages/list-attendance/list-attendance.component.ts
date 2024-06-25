import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list-attendance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-attendance.component.html',
  styleUrl: './list-attendance.component.scss'
})
export class ListAttendanceComponent {
  attendancesToRender: any[] = [];
  showAttendance(){
    const attendances = sessionStorage.getItem('attendances');
    const attendancesAfterParse = JSON.parse(attendances??"[]");
  
    this.attendancesToRender = attendancesAfterParse;
  }

}
