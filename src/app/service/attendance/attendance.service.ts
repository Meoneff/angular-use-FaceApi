import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private httpClient: HttpClient) {}

  edit(sheetName: string, column: number, attendances: any[]) {
    return this.httpClient.put(`http://localhost:3000/excel/edit?sheetName=${sheetName}&colum=${column}`, {attendances: attendances});
  }
  read(sheetName: string, column: number,row: number) {
    return this.httpClient.get<any[]>(`http://localhost:3000/excel/read?sheetName=${sheetName}&column=${column}`);
  }

}
