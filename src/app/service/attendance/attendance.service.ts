import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private httpClient: HttpClient) {}

  edit(sheetName: string, column: number, attendances: any[]) {
    console.log(attendances);
    
    return this.httpClient.post(`http://localhost:3000/excel/edit?sheetName=${sheetName}&colum=${column}`, {attendances: attendances});
  }
  read(sheetName: string, column: number,row: number) {
    console.log(sheetName);
    
    return this.httpClient.post<any[]>(`http://localhost:3000/excel/read?sheetName=${sheetName}&colum=${column}&row=${row}`,{});
  }
  download() {
    return this.httpClient.get(`http://localhost:3000/excel/download`);
  }

}
