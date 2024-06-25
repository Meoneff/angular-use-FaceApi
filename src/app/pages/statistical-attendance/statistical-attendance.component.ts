
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as attendaceActions from '../../ngrx/actions/attendance.actions';
import { TuiAlertService, TuiAlertModule } from '@taiga-ui/core';
import { Store } from '@ngrx/store';
import { AttendanceState } from '../../ngrx/state/attendance.state';


@Component({
  selector: 'app-statistical-attendance',
  standalone: true,
  imports: [CommonModule, TuiAlertModule],
  templateUrl: './statistical-attendance.component.html',
  styleUrl: './statistical-attendance.component.scss',
})
export class StatisticalAttendanceComponent { 
  lesson: any[] = [];
  lessonChosen: number = 0;

  lesson$ = this.store.select('attendance','attendances');
  isEditSuccess$ = this.store.select('attendance','isEditSuccess');

  constructor(

    private store : Store<{attendance: AttendanceState}>,
    private readonly alerts: TuiAlertService,

    ){
      this.store.dispatch(attendaceActions.read({sheetName: 'Sheet1', column: 15, row: 6}));
      this.lesson$.subscribe((lesson) => {
        if(lesson.length){
          console.log(lesson);
          this.lesson = lesson;
        }
      });
      this.isEditSuccess$.subscribe((isEditSuccess) => {
        if(isEditSuccess){
          console.log('Điểm danh thành công');
          alert('Điểm danh thành công');
          this.alerts
          .open('', {label: 'Điểm danh thành công',status:'success'})
          .subscribe();
        }
      });
    }

  attendance(){
    const  attendances = sessionStorage.getItem('attendances');
    const attendancesAfterParse = JSON.parse(attendances??"[]");

    if(this.lessonChosen==0){
      this.alerts
            .open('', {label: 'Chưa chọn buổi học',status:'error'})
            .subscribe();
    }
    else{
      this.store.dispatch(attendaceActions.edit({sheetName: 'Sheet1', column: this.lessonChosen, attendances: attendancesAfterParse}));
    }
  }

  chooseLesson(lesson: any){
    console.log(lesson);
    
    if(lesson.attendance){
      this.alerts
            .open('', {label: 'Buổi học đã được điểm danh',status:'error'})
            .subscribe();
    }
    else{
      this.alerts
            .open('', {label: 'Chọn buổi học thành công',status:'success'})
            .subscribe();
      this.lessonChosen = lesson.column;
      console.log(this.lessonChosen);
    }

  }


}
