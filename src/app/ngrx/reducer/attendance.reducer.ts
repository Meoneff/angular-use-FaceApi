import { createReducer, on } from "@ngrx/store";
import { AttendanceState } from "../state/attendance.state";
import * as AttendanceActions from "../actions/attendance.actions";

export const initialState: AttendanceState = {
    isEditing: false,
    isEditSuccess: false,
    editError: "",
    isReading: false,
    isReadSuccess: false,
    readError: "",
    attendances: [],
    downloadError: "",
    isDownloading: false,
    isDownloadSuccess: false
};

export const attendanceReducer = createReducer(
    initialState,
    on(AttendanceActions.edit, (state,action) => {
        return {
            ...state,
            isEditing: true,
            isEditSuccess: false,
            editError: ""
        };
    }),
    on(AttendanceActions.editSuccess, (state,action) => {
        return {
            ...state,
            isEditing: false,
            isEditSuccess: true
        };
    }),
    on(AttendanceActions.editFailure, (state,action) => {
        return {
            ...state,
            isEditing: false,
            isEditSuccess: false,
            editError: action.error
        };
    }),
    on(AttendanceActions.read, (state,action) => {
        return {
            ...state,
            isReading: true,
            isReadSuccess: false,
            readError: ""
        };
    }),
    on(AttendanceActions.readSuccess, (state,action) => {
        return {
            ...state,
            isReading: false,
            isReadSuccess: true,
            attendances: action.attendances
        };
    }),
    on(AttendanceActions.readFailure, (state,action) => {
        return {
            ...state,
            isReading: false,
            isReadSuccess: false,
            readError: action.error
        };
    }),
    on(AttendanceActions.download, (state,action) => {
        return {
            ...state,
            isDownloading: true,
            isDownloadSuccess: false,
            downloadError: ""
        };
    }),
    on(AttendanceActions.downloadSuccess, (state,action) => {
        return {
            ...state,
            isDownloading: false,
            isDownloadSuccess: true
        };
    }),
    on(AttendanceActions.downloadFailure, (state,action) => {
        return {
            ...state,
            isDownloading: false,
            isDownloadSuccess: false,
            downloadError: action.error
        };
    })
    
    
)
