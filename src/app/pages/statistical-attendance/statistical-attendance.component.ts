import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as xlsx from 'xlsx';



@Component({
  selector: 'app-statistical-attendance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistical-attendance.component.html',
  styleUrl: './statistical-attendance.component.scss'
})
export class StatisticalAttendanceComponent {
  attendancesToRender: any[] = [];
  workbook: xlsx.WorkBook | null = null;
  fileName: string | null = null;
  downloadLink: string | null = null;
  

  // Handle file input change
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        this.workbook = xlsx.read(data, { type: 'array' });
      };
      reader.readAsArrayBuffer(file);
    }
  }
  serialToDate(serial: number) {


    const date = new Date(1900, 0, serial );
    return date.toISOString().split('T')[0]; // Trả về chuỗi ngày tháng ở định dạng yyyy-mm-dd
  }
  getCurrentDay() {
    const today = new Date();
    return today.getDate(); // Lấy ngày trong tháng (1-31)
}

  // Edit the file in memory
  editFile() {
    const  attendances = sessionStorage.getItem('attendances');
    const attendancesAfterParse = JSON.parse(attendances??"[]");
    console.log(attendancesAfterParse);
    this.attendancesToRender = attendancesAfterParse;  
    if (this.workbook) {
      const sheetName = 'Sheet1'; // Replace with your actual sheet name
      const sheet = this.workbook.Sheets[sheetName];
      if (!sheet) {
        console.error(`Sheet ${sheetName} not found!`);
        return;
      }


      
      // Đặt định dạng ô cho các ngày tháng
      const dateRow = 0; // Hàng chứa ngày tháng (0-based)
      for (let c = 1; c <= 32; c++) { // Giả sử ngày tháng ở trong 31 cột đầu tiên (0-based)
        const cellAddress = xlsx.utils.encode_cell({ r: dateRow, c });
        const cell = sheet[cellAddress];
        if (cell && cell.t === 'n') { // 'n' is for numeric type
          const date = this.serialToDate(cell.v);
          console.log(cell.v, 'cell.v');
          
          console.log(date, 'date');
          
          sheet[cellAddress] = { t: 's', v: date }; // 's' is for string type
        }
    }
      const row = 1; // Row number (0-based) hàng
      const column = this.getCurrentDay(); // Column number (0-based) cột
      console.log(column, 'column');
      
      // Encode the cell address
      this.attendancesToRender.forEach(attendance => {
        console.log(attendance.name, attendance.attendance);
        
        if(attendance.attendance) {
          console.log(attendance.attendance, 'attendance.attendance as true');
          const cellAddress = xlsx.utils.encode_cell({ r: attendance.row, c: column });
          console.log(cellAddress, 'cellAddress');
          
          sheet[cellAddress] = { t: 's', v: "đã điểm danh" }; // 's' is for string type
        }else{
          console.log(attendance.attendance, 'attendance.attendance as false');
          const cellAddress = xlsx.utils.encode_cell({ r: attendance.row, c: column });
          console.log(cellAddress, 'cellAddress');
          sheet[cellAddress] = { t: 's', v: "vắng" }; // 's' is for string type
        }

      
      })


      // Generate a download link for the edited file
      const newWorkbook = xlsx.write(this.workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([newWorkbook], { type: 'application/octet-stream' });
      this.downloadLink = URL.createObjectURL(blob);

      alert('File edited successfully!');
    } else {
      alert('No file loaded');
    }
  }
  click() {

  }
  
}
