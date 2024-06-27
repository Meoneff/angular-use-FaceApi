import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AttendanceService } from "../../service/attendance/attendance.service";
import { map, mergeMap } from "rxjs";
import * as AttendanceActions from "../actions/attendance.actions";

@Injectable()
export class AttendanceEffects {
  constructor(
    private actions$: Actions,
    private attendanceService: AttendanceService
  ) {}
  edi$ = createEffect(() => this.actions$.pipe(
    ofType(AttendanceActions.edit),
    mergeMap(action => this.attendanceService.edit(action.sheetName, action.column, action.attendances).pipe(
      map(() => AttendanceActions.editSuccess({result: true}))
    ))
  ));
    read$ = createEffect(() => this.actions$.pipe(
        ofType(AttendanceActions.read),
        mergeMap(action => this.attendanceService.read(action.sheetName, action.column, action.row).pipe(
        map(attendances => AttendanceActions.readSuccess({attendances}))
        ))
    ));
    download$ = createEffect(() => this.actions$.pipe(
        ofType(AttendanceActions.download),
        mergeMap(() => this.attendanceService.download().pipe(
        map(() => AttendanceActions.downloadSuccess())
        ))
    ));
}