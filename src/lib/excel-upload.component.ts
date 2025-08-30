import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ExcelUploadService } from '../public-api';
import * as XLSX from 'xlsx';

@Component({
  selector: 'angay-excel-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.scss']
})
export class ExcelUploadComponent {
  isVisible = false;
  errorMessage = '';
  excelFile: File | null = null;
  namesList: string[] = [];

  constructor(private excelUploadModalService: ExcelUploadService,
  ) { }

  ngOnInit() {
    this.excelUploadModalService.modalState$.subscribe((state) => {
      this.isVisible = state.isVisible;
    });
  }

  fileChangeEvent(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
        file.type !== 'application/vnd.ms-excel') {
        this.errorMessage = 'Invalid file type. Please upload an Excel file.';
        return;
      }

      if (file.size === 0) {
        this.errorMessage = 'File is empty. Please upload a valid Excel file.';
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        this.errorMessage = 'File is too large. Please upload an Excel file smaller than 2MB.';
        return;
      }

      this.errorMessage = '';
      this.excelFile = file;

      // Read the Excel file
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Take first sheet
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert sheet to JSON
        const sheetData: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Extract first column (ignoring empty rows)
        const names: string[] = sheetData
          .map((row) => row[0]) // take first column
          .filter((name) => name !== undefined && name !== null && name !== ''); // remove blanks

        this.namesList = names; // store in component variable
      };

      reader.readAsArrayBuffer(file);
    }
  }

  onSave() {
    this.excelUploadModalService.closeModal(this.namesList);
    this.excelFile = null;
  }

  closeModal() {
    this.excelUploadModalService.closeModal(null);
  }
}
