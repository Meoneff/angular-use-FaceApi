// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import * as attendanceActions from '../../ngrx/actions/attendance.actions';
// import { TuiAlertService, TuiAlertModule } from '@taiga-ui/core';
// import { Store } from '@ngrx/store';
// import { AttendanceState } from '../../ngrx/state/attendance.state';
// import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

// @Component({
//   selector: 'app-statistical-attendance',
//   standalone: true,
//   imports: [CommonModule, TuiAlertModule],
//   templateUrl: './statistical-attendance.component.html',
//   styleUrls: ['./statistical-attendance.component.scss'],
// })
// export class StatisticalAttendanceComponent {
//   lesson: any[] = [];
//   lessonChosen: number = 0;
//   selectedLessonText: string = 'Chọn Buổi';
//   dropdownOpen: boolean = false;

//   lesson$ = this.store.select('attendance', 'attendances');
//   isEditSuccess$ = this.store.select('attendance', 'isEditSuccess');

//   constructor(
//     private snackBar: MatSnackBar,
//     private store: Store<{ attendance: AttendanceState }>,
//     private readonly alerts: TuiAlertService
//   ) {
//     this.store.dispatch(
//       attendanceActions.read({ sheetName: 'Sheet1', column: 15, row: 6 })
//     );
//     this.lesson$.subscribe((lesson) => {
//       if (lesson.length) {
//         console.log(lesson);
//         this.lesson = lesson;
//       }
//     });
//     this.isEditSuccess$.subscribe((isEditSuccess) => {
//       if (isEditSuccess) {
//         console.log('Điểm danh thành công');
//         this.showSuccessSnackbar('Điểm danh thành công');
//         this.alerts
//           .open('', {
//             label: 'Điểm danh thành công',
//             status: 'success',
//             data: { className: 'custom-alert-success' },
//           })
//           .subscribe();
//       }
//     });

//     this.alerts
//       .open('', {
//         label: 'Alert Service Test',
//         status: 'success',
//         data: { className: 'custom-alert-success' },
//       })
//       .subscribe();
//   }

//   showSuccessSnackbar(message: string) {
//     this.snackBar.open(`${message}`, 'Đóng', {
//       duration: 3000,
//       horizontalPosition: 'right',
//       verticalPosition: 'top',
//       panelClass: ['success-snackbar'],
//     });
//   }

//   showErrorSnackbar(message: string) {
//     this.snackBar.open(`${message}`, 'Đóng', {
//       duration: 3000,
//       horizontalPosition: 'right',
//       verticalPosition: 'top',
//       panelClass: ['error-snackbar'],
//     });
//   }

//   attendance() {
//     console.log('Attendance button clicked');
//     const attendances = sessionStorage.getItem('attendances');
//     const attendancesAfterParse = JSON.parse(attendances ?? '[]');

//     if (this.lessonChosen == 0 || this.lessonChosen === null) {
//       console.log('Vui Lòng Chọn Lại Buổi');
//       this.showErrorSnackbar('Vui Lòng Chọn Lại Buổi');
//       this.alerts
//         .open('', {
//           label: 'Điểm danh thành công',
//           status: 'error',
//           data: { className: 'custom-alert-error' },
//         })
//         .subscribe();
//     } else {
//       this.store.dispatch(
//         attendanceActions.edit({
//           sheetName: 'Sheet1',
//           column: this.lessonChosen,
//           attendances: attendancesAfterParse,
//         })
//       );
//     }
//   }

//   chooseLesson(lesson: any) {
//     console.log('Lesson chosen:', lesson);

//     if (lesson === null) {
//       this.alerts
//         .open('', {
//           label: 'Vui lòng chọn buổi học hợp lệ',
//           status: 'error',
//           data: { className: 'custom-alert-error' },
//         })
//         .subscribe();
//       this.lessonChosen = 0;
//       this.selectedLessonText = 'Chọn Buổi';
//       this.dropdownOpen = false;
//     } else if (lesson.attendance) {
//       this.alerts
//         .open('', {
//           label: 'Buổi học đã được điểm danh',
//           status: 'error',
//           data: { className: 'custom-alert-error' },
//         })
//         .subscribe();
//     } else {
//       this.alerts
//         .open('', {
//           label: 'Chọn buổi học thành công',
//           status: 'success',
//           data: { className: 'custom-alert-success' },
//         })
//         .subscribe();
//       this.lessonChosen = lesson.column;
//       this.selectedLessonText = `Buổi ${lesson.column}`;
//       this.dropdownOpen = false;
//       console.log('Selected lesson:', this.lessonChosen);
//     }
//   }

//   toggleDropdown() {
//     this.dropdownOpen = !this.dropdownOpen;
//   }
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as attendanceActions from '../../ngrx/actions/attendance.actions';
import { TuiAlertService, TuiAlertModule } from '@taiga-ui/core';
import { Store } from '@ngrx/store';
import { AttendanceState } from '../../ngrx/state/attendance.state';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-statistical-attendance',
  standalone: true,
  imports: [CommonModule, TuiAlertModule],
  templateUrl: './statistical-attendance.component.html',
  styleUrls: ['./statistical-attendance.component.scss'],
})
export class StatisticalAttendanceComponent {
  lesson: any[] = [];
  lessonChosen: number = 0;
  selectedLessonText: string = 'Chọn Buổi';
  dropdownOpen: boolean = false;
  dropdownError: boolean = false;

  lesson$ = this.store.select('attendance', 'attendances');
  isEditSuccess$ = this.store.select('attendance', 'isEditSuccess');

  constructor(
    private snackBar: MatSnackBar,
    private store: Store<{ attendance: AttendanceState }>,
    private readonly alerts: TuiAlertService
  ) {
    this.store.dispatch(
      attendanceActions.read({ sheetName: 'Sheet1', column: 15, row: 6 })
    );
    this.lesson$.subscribe((lesson) => {
      if (lesson.length) {
        console.log(lesson);
        this.lesson = lesson;
      }
    });
    this.isEditSuccess$.subscribe((isEditSuccess) => {
      if (isEditSuccess) {
        console.log('Điểm danh thành công');
        this.showSuccessSnackbar('Điểm danh thành công');
        this.alerts
          .open('', {
            label: 'Điểm danh thành công',
            status: 'success',
            data: { className: 'custom-alert-success' },
          })
          .subscribe();
      }
    });

    this.alerts
      .open('', {
        label: 'Alert Service Test',
        status: 'success',
        data: { className: 'custom-alert-success' },
      })
      .subscribe();
  }

  showSuccessSnackbar(message: string) {
    this.snackBar.open(`${message}`, 'Đóng', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar', 'custom-snackbar'],
    });
  }

  showErrorSnackbar(message: string) {
    this.snackBar.open(`${message}`, 'Đóng', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['error-snackbar', 'custom-snackbar'],
    });
  }

  attendance() {
    console.log('Attendance button clicked');
    const attendances = sessionStorage.getItem('attendances');
    const attendancesAfterParse = JSON.parse(attendances ?? '[]');

    if (this.lessonChosen == 0 || this.lessonChosen === null) {
      console.log('Vui Lòng Chọn Lại Buổi');
      this.showErrorSnackbar('Vui Lòng Chọn Lại Buổi');
      this.dropdownError = true;
      this.alerts
        .open('', {
          label: 'Điểm danh thành công',
          status: 'error',
          data: { className: 'custom-alert-error' },
        })
        .subscribe();
    } else {
      this.dropdownError = false;
      this.store.dispatch(
        attendanceActions.edit({
          sheetName: 'Sheet1',
          column: this.lessonChosen,
          attendances: attendancesAfterParse,
        })
      );
    }
  }

  chooseLesson(lesson: any) {
    console.log('Lesson chosen:', lesson);

    if (lesson === null) {
      this.showErrorSnackbar('Vui lòng chọn buổi học hợp lệ')
      this.lessonChosen = 0;
      this.selectedLessonText = 'Chọn Buổi';
      this.dropdownOpen = false;
    } else if (lesson.attendance) {
      this.showErrorSnackbar('Buổi học đã được điểm danh');
      this.dropdownOpen = false;
      this.dropdownError = false;

    } else {
      this.alerts
        .open('', {
          label: 'Chọn buổi học thành công',
          status: 'success',
          data: { className: 'custom-alert-success' },
        })
        .subscribe();
      this.lessonChosen = lesson.column;
      this.selectedLessonText = `Buổi ${lesson.column}`;
      this.dropdownOpen = false;
      this.dropdownError = false;
      console.log('Selected lesson:', this.lessonChosen);
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
