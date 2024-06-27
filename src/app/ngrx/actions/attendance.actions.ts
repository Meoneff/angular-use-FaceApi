import { createAction, props } from "@ngrx/store";

export const edit = createAction(
    '[Attendance] Edit',
    props<{sheetName: string, column: number, attendances: any[]}>()
    );
export const editSuccess = createAction(
    '[Attendance] Edit Success',
    props<{result:boolean}>()
    );
export const editFailure = createAction(
    '[Attendance] Edit Failure',
    props<{error: string}>()
    );

export const read = createAction(
    '[Attendance] Read',
    props<{sheetName: string, column: number,row: number}>()
    );
export const readSuccess = createAction(
    '[Attendance] Read Success',
    props<{attendances: any[]}>()
    );
export const readFailure = createAction(
    '[Attendance] Read Failure',
    props<{error: string}>()
    );

    export const download = createAction(
        '[Attendance] Download',
        );
    export const downloadSuccess = createAction(
        '[Attendance] Download Success',
        );
    export const downloadFailure = createAction(
        '[Attendance] Download Failure',
        props<{error: string}>()
        );
