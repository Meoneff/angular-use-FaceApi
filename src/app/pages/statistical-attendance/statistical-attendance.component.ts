import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as xlsx from 'xlsx';
// import* as path from 'path';

@Component({
  selector: 'app-statistical-attendance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistical-attendance.component.html',
  styleUrl: './statistical-attendance.component.scss',
})
export class StatisticalAttendanceComponent {
  attendancesToRender: any[] = [];
  //worksheet
  showAttendanceSheet = false;

  workSheetName = `Attendance_${new Date()
    .toLocaleDateString()
    .split('/')
    .join('-')}`;
  filePath = `../../Attendance_${new Date()
    .toLocaleDateString()
    .split('/')
    .join('-')}.xlsx`;
  workSheetColumnName = ['ID', 'Name', 'Date'];
  click() {
    this.showAttendanceSheet = !this.showAttendanceSheet;
    if (this.showAttendanceSheet) {
      this.renderAttendanceSheet();
    } else {
      this.clearAttendanceSheet();
    }

    const attendances = sessionStorage.getItem('attendances');
    const attendancesAfterParse = JSON.parse(attendances ?? '[]');
    console.log(attendancesAfterParse);
    this.attendancesToRender = attendancesAfterParse;
    const workBook = xlsx.utils.book_new();
    const workSheetData = [
      this.workSheetColumnName,
      ...attendancesAfterParse.map(
        (user: { id: any; name: any; timeAttendance: any }) => [
          user.id,
          user.name,
          user.timeAttendance,
        ]
      ),
    ];
    console.log(workSheetData);
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, this.workSheetName);
    xlsx.writeFile(workBook, this.filePath);
    console.log(workSheet);
    // console.log(path.resolve(this.filePath))
  }

  renderAttendanceSheet() {
    const sheet = document.getElementById('attendanceSheet');
    if (sheet) {
      sheet.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            ${this.attendancesToRender
              .map(
                (attendance) => `
              <tr>
                <td>${attendance.name}</td>
                <td>${attendance.date}</td>
                <td>${attendance.time}</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      `;
    }
  }
  clearAttendanceSheet() {
    const sheet = document.getElementById('attendanceSheet');
    if (sheet) {
      sheet.innerHTML = '';
    }
  }
}
