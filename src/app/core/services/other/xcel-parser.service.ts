// import { Injectable } from '@angular/core';
// import * as XLSX from 'xlsx';
// import * as Papa from 'papaparse';

// export interface CandidateData {
//   sNo: number;
//   date: string;
//   source: string;
//   subSource?: string;
//   candidateName: string;
//   proposedRole: string;
//   skill: string;
//   emailId: string;
//   contactNo: string;
//   linkedinUrl?: string;
//   totalExp: number;
//   relevantExp: number;
//   currentEmployer: string;
//   currentLocation: string;
//   preferredLocation: string;
//   noticePeriod: number;
//   cctcFixed: number;
//   ectc?: number;
// }

// export interface TableColumn {
//   key: string;
//   label: string;
//   type: 'string' | 'number' | 'date' | 'boolean';
//   sortable: boolean;
//   filterable: boolean;
// }

// export interface TableData {
//   columns: TableColumn[];
//   dataSource: any[];
//   globalFilterFields: string[];
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class XcelParserService {

//    private requiredFields = [
//     'S.No.',
//     'Date', 
//     'Source',
//     'Candidate Name',
//     'Proposed Role',
//     'Skill',
//     'Email ID',
//     'Contact No',
//     'Total Exp (yrs)',
//     'Relevant Exp (yrs)',
//     'Current Employer',
//     'Current Location',
//     'Preferred Location',
//     'Notice Period (Days)',
//     'CCTC-fixed'
//   ];

//   private optionalFields = [
//     'Sub Source',
//     'Linkedin URL',
//     'ECTC'
//   ];

//   private columnMappings = {
//     'S.No.': { key: 'sNo', label: 'S.No.', type: 'number' },
//     'Date': { key: 'date', label: 'Date', type: 'date' },
//     'Source': { key: 'source', label: 'Source', type: 'string' },
//     'Sub Source': { key: 'subSource', label: 'Sub Source', type: 'string' },
//     'Candidate Name': { key: 'candidateName', label: 'Candidate Name', type: 'string' },
//     'Proposed Role': { key: 'proposedRole', label: 'Proposed Role', type: 'string' },
//     'Skill': { key: 'skill', label: 'Skill', type: 'string' },
//     'Email ID': { key: 'emailId', label: 'Email ID', type: 'string' },
//     'Contact No': { key: 'contactNo', label: 'Contact No', type: 'string' },
//     'Linkedin URL': { key: 'linkedinUrl', label: 'LinkedIn URL', type: 'string' },
//     'Total Exp (yrs)': { key: 'totalExp', label: 'Total Exp (yrs)', type: 'number' },
//     'Relevant Exp (yrs)': { key: 'relevantExp', label: 'Relevant Exp (yrs)', type: 'number' },
//     'Current Employer': { key: 'currentEmployer', label: 'Current Employer', type: 'string' },
//     'Current Location': { key: 'currentLocation', label: 'Current Location', type: 'string' },
//     'Preferred Location': { key: 'preferredLocation', label: 'Preferred Location', type: 'string' },
//     'Notice Period (Days)': { key: 'noticePeriod', label: 'Notice Period (Days)', type: 'number' },
//     'CCTC-fixed': { key: 'cctcFixed', label: 'CCTC-fixed', type: 'number' },
//     'ECTC': { key: 'ectc', label: 'ECTC', type: 'number' }
//   };
//   constructor() { }

//     /**
//    * Parse uploaded file (CSV or XLSX) and return formatted data for table
//    */
//   async parseFile(file: File): Promise<TableData> {
//     try {
//       const fileExtension = file.name.split('.').pop()?.toLowerCase();
      
//       if (fileExtension === 'csv') {
//         return await this.parseCSV(file);
//       } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
//         return await this.parseExcel(file);
//       } else {
//         throw new Error('Unsupported file format. Please upload CSV or Excel files only.');
//       }
//     } catch (error) {
//       console.error('Error parsing file:', error);
//       throw error;
//     }
//   }

//   /**
//    * Parse CSV file
//    */
//   private parseCSV(file: File): Promise<TableData> {
//     return new Promise((resolve, reject) => {
//       Papa.parse(file, {
//         header: true,
//         skipEmptyLines: true,
//         dynamicTyping: true,
//         complete: (results) => {
//           try {
//             const tableData = this.processRawData(results.data);
//             resolve(tableData);
//           } catch (error) {
//             reject(error);
//           }
//         },
//         error: (error) => {
//           console.error('CSV parsing error:', error);
//           reject(new Error('Failed to parse CSV file'));
//         }
//       });
//     });
//   }

//   /**
//    * Parse Excel file
//    */
//   private async parseExcel(file: File): Promise<TableData> {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
      
//       reader.onload = (e) => {
//         try {
//           const data = new Uint8Array(e.target?.result as ArrayBuffer);
//           const workbook = XLSX.read(data, { type: 'array' });
          
//           // Get first worksheet
//           const worksheetName = workbook.SheetNames[0];
//           const worksheet = workbook.Sheets[worksheetName];
          
//           // Convert to JSON
//           const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
//             header: 1,
//             defval: ''
//           });
          
//           // Process the data
//           const processedData = this.processExcelData(jsonData as any);
//           const tableData = this.processRawData(processedData);
          
//           resolve(tableData);
//         } catch (error) {
//           console.error('Excel parsing error:', error);
//           reject(new Error('Failed to parse Excel file'));
//         }
//       };
      
//       reader.onerror = () => {
//         reject(new Error('Failed to read file'));
//       };
      
//       reader.readAsArrayBuffer(file);
//     });
//   }

//   /**
//    * Process Excel data from array format to object format
//    */
//   private processExcelData(data: any[][]): any[] {
//     if (data.length < 2) {
//       throw new Error('Excel file must have at least header and one data row');
//     }

//     const headers = data[0];
//     const rows = data.slice(1);

//     return rows.map(row => {
//       const obj: any = {};
//       headers.forEach((header, index) => {
//         obj[header] = row[index] || '';
//       });
//       return obj;
//     });
//   }

//   /**
//    * Process raw data and validate required fields
//    */
//   private processRawData(data: any[]): TableData {
//     if (!data || data.length === 0) {
//       throw new Error('No data found in file');
//     }

//     // Validate headers
//     const fileHeaders = Object.keys(data[0]);
//     this.validateHeaders(fileHeaders);

//     // Transform data
//     const transformedData = data.map((row, index) => {
//       const transformedRow: any = {};
      
//       // Process each field
//       Object.keys(row).forEach(originalKey => {
//         const mapping = this.columnMappings[originalKey as keyof typeof this.columnMappings];
//         if (mapping) {
//           const value = row[originalKey];
//           transformedRow[mapping.key] = this.transformValue(value, mapping.type, originalKey);
//         }
//       });

//       // Validate required fields for each row
//       this.validateRowData(transformedRow, index + 1);
      
//       return transformedRow;
//     });

//     // Add remove action to each row
//     const dataWithActions = transformedData.map(row => ({
//       ...row,
//     }));

//     // Generate columns configuration
//     const columns = this.generateColumns();

//     // Generate global filter fields
//     const globalFilterFields = columns.map(col => col.key);

//     return {
//       columns,
//       dataSource: dataWithActions,
//       globalFilterFields
//     };
//   }

//   /**
//    * Validate file headers
//    */
//   private validateHeaders(fileHeaders: string[]): void {
//     const missingRequired = this.requiredFields.filter(field => !fileHeaders.includes(field));
    
//     if (missingRequired.length > 0) {
//       const errorMsg = `Missing required fields: ${missingRequired.join(', ')}`;
//       console.error('Header validation error:', errorMsg);
//       throw new Error(errorMsg);
//     }

//     // Check for unexpected headers
//     const allExpectedFields = [...this.requiredFields, ...this.optionalFields];
//     const unexpectedHeaders = fileHeaders.filter(header => !allExpectedFields.includes(header));
    
//     if (unexpectedHeaders.length > 0) {
//       console.warn('Unexpected headers found:', unexpectedHeaders.join(', '));
//     }
//   }

//   /**
//    * Validate individual row data
//    */
//   private validateRowData(row: any, rowNumber: number): void {
//     const requiredKeys = [
//       'sNo', 'date', 'source', 'candidateName', 'proposedRole', 
//       'skill', 'emailId', 'contactNo', 'totalExp', 'relevantExp',
//       'currentEmployer', 'currentLocation', 'preferredLocation', 
//       'noticePeriod', 'cctcFixed'
//     ];

//     const missingFields = requiredKeys.filter(key => {
//       const value = row[key];
//       return value === null || value === undefined || value === '';
//     });

//     if (missingFields.length > 0) {
//       const errorMsg = `Row ${rowNumber}: Missing required data in fields: ${missingFields.join(', ')}`;
//       console.error('Row validation error:', errorMsg);
//       throw new Error(errorMsg);
//     }

//     // Validate email format
//     if (row.emailId && !this.isValidEmail(row.emailId)) {
//       console.warn(`Row ${rowNumber}: Invalid email format: ${row.emailId}`);
//     }

//     // Validate numeric fields
//     const numericFields = ['sNo', 'totalExp', 'relevantExp', 'noticePeriod', 'cctcFixed'];
//     numericFields.forEach(field => {
//       if (row[field] !== undefined && isNaN(Number(row[field]))) {
//         console.warn(`Row ${rowNumber}: Invalid numeric value in ${field}: ${row[field]}`);
//       }
//     });
//   }

//   /**
//    * Transform value based on column type
//    */
//   private transformValue(value: any, type: string, originalKey: string): any {
//     if (value === null || value === undefined || value === '') {
//       return type === 'number' ? 0 : '';
//     }

//     switch (type) {
//       case 'number':
//         const numValue = Number(value);
//         return isNaN(numValue) ? 0 : numValue;
      
//       case 'date':
//         return this.formatDate(value);
      
//       case 'string':
//       default:
//         return String(value).trim();
//     }
//   }

//   /**
//    * Format date to dd/mm/yyyy
//    */
//   private formatDate(dateValue: any): string {
//     if (!dateValue) return '';

//     try {
//       let date: Date;

//       if (dateValue instanceof Date) {
//         date = dateValue;
//       } else if (typeof dateValue === 'string') {
//         // Handle various string formats
//         if (dateValue.includes('/')) {
//           // Assume dd/mm/yyyy format
//           const parts = dateValue.split('/');
//           if (parts.length === 3) {
//             date = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
//           } else {
//             date = new Date(dateValue);
//           }
//         } else {
//           date = new Date(dateValue);
//         }
//       } else if (typeof dateValue === 'number') {
//         // Excel serial date
//         date = new Date((dateValue - 25569) * 86400 * 1000);
//       } else {
//         date = new Date(dateValue);
//       }

//       if (isNaN(date.getTime())) {
//         console.warn('Invalid date value:', dateValue);
//         return '';
//       }

//       // Format as dd/mm/yyyy
//       const day = date.getDate().toString().padStart(2, '0');
//       const month = (date.getMonth() + 1).toString().padStart(2, '0');
//       const year = date.getFullYear();

//       return `${day}/${month}/${year}`;
//     } catch (error) {
//       console.error('Date formatting error:', error);
//       return '';
//     }
//   }

//   /**
//    * Generate columns configuration for table
//    */
//   private generateColumns(): TableColumn[] {
//     const columns: TableColumn[] = [];

//     // Add all mapped columns
//     Object.values(this.columnMappings).forEach(mapping => {
//       columns.push({
//         key: mapping.key,
//         label: mapping.label,
//         type: mapping.type as any,
//         sortable: true,
//         filterable: true
//       });
//     });

//     // Add actions column
//     columns.push({
//       key: 'actions',
//       label: 'Actions',
//       type: 'string',
//       sortable: false,
//       filterable: false
//     });

//     return columns;
//   }

//   // /**
//   //  * Remove row from data source
//   //  */
//   // removeRow(dataSource: any[], rowData: any): any[] {
//   //   const index = dataSource.findIndex(item => 
//   //     item.sNo === rowData.sNo && 
//   //     item.candidateName === rowData.candidateName &&
//   //     item.emailId === rowData.emailId
//   //   );
    
//   //   if (index > -1) {
//   //     dataSource.splice(index, 1);
//   //     console.log('Row removed:', rowData.candidateName);
//   //   }
    
//   //   return [...dataSource]; // Return new array reference
//   // }

//   /**
//    * Validate email format
//    */
//   private isValidEmail(email: string): boolean {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   }

//   /**
//    * Get action methods for table component
//    */
//   // getActionMethods(dataSource: any[], updateCallback: (newData: any[]) => void): { [key: string]: (rowData: any) => void } {
//   //   return {
//   //     'Remove': (rowData: any) => {
//   //       const updatedData = this.removeRow(dataSource, rowData);
//   //       updateCallback(updatedData);
//   //     }
//   //   };
//   // }

//   /**
//    * Export current data back to CSV format
//    */
//   exportToCSV(dataSource: any[], filename: string = 'candidate-data.csv'): void {
//     // Remove actions column for export
//     const exportData = dataSource.map(row => {
//       const { actions, ...exportRow } = row;
      
//       // Transform back to original headers
//       const originalFormatRow: any = {};
//       Object.entries(this.columnMappings).forEach(([originalKey, mapping]) => {
//         if (exportRow[mapping.key] !== undefined) {
//           originalFormatRow[originalKey] = exportRow[mapping.key];
//         }
//       });
      
//       return originalFormatRow;
//     });

//     const csv = Papa.unparse(exportData);
//     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
    
//     if (link.download !== undefined) {
//       const url = URL.createObjectURL(blob);
//       link.setAttribute('href', url);
//       link.setAttribute('download', filename);
//       link.style.visibility = 'hidden';
//       document.body.appendChild(link);
//       link.click();
//       // document.body.removeChild(link);
//     }
//   }


// }

import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as Papa from 'papaparse';

// This is the core data model. It remains unchanged.
export interface CandidateData {
  sNo: number;
  date: string;
  source: string;
  subSource?: string;
  candidateName: string;
  proposedRole: string;
  skill: string;
  emailId: string;
  contactNo: string;
  linkedinUrl?: string;
  totalExp: number;
  relevantExp: number;
  currentEmployer: string;
  currentLocation: string;
  preferredLocation: string;
  noticePeriod: number;
  cctcFixed: number;
  ectc?: number;
}

// NOTE: TableColumn and TableData interfaces have been removed as they are UI-specific.

@Injectable({
  providedIn: 'root'
})
export class XcelParserService {

   private requiredFields = [
    'S.No.', 'Date', 'Source', 'Candidate Name', 'Proposed Role', 'Skill', 'Email ID',
    'Contact No', 'Total Exp (yrs)', 'Relevant Exp (yrs)', 'Current Employer',
    'Current Location', 'Preferred Location', 'Notice Period (Days)', 'CCTC-fixed'
  ];

  private optionalFields = ['Sub Source', 'Linkedin URL', 'ECTC'];

  private columnMappings = {
    'S.No.': { key: 'sNo', type: 'number' },
    'Date': { key: 'date', type: 'date' },
    'Source': { key: 'source', type: 'string' },
    'Sub Source': { key: 'subSource', type: 'string' },
    'Candidate Name': { key: 'candidateName', type: 'string' },
    'Proposed Role': { key: 'proposedRole', type: 'string' },
    'Skill': { key: 'skill', type: 'string' },
    'Email ID': { key: 'emailId', type: 'string' },
    'Contact No': { key: 'contactNo', type: 'string' },
    'Linkedin URL': { key: 'linkedinUrl', type: 'string' },
    'Total Exp (yrs)': { key: 'totalExp', type: 'number' },
    'Relevant Exp (yrs)': { key: 'relevantExp', type: 'number' },
    'Current Employer': { key: 'currentEmployer', type: 'string' },
    'Current Location': { key: 'currentLocation', type: 'string' },
    'Preferred Location': { key: 'preferredLocation', type: 'string' },
    'Notice Period (Days)': { key: 'noticePeriod', type: 'number' },
    'CCTC-fixed': { key: 'cctcFixed', type: 'number' },
    'ECTC': { key: 'ectc', type: 'number' }
  };

  constructor() { }

  /**
   * Parse uploaded file (CSV or XLSX) and return a clean array of candidate data.
   */
  async parseFile(file: File): Promise<CandidateData[]> {
    try {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      
      if (fileExtension === 'csv') {
        return await this.parseCSV(file);
      } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        return await this.parseExcel(file);
      } else {
        throw new Error('Unsupported file format. Please upload CSV or Excel files only.');
      }
    } catch (error) {
      console.error('Error parsing file:', error);
      throw error;
    }
  }

  /**
   * Parse CSV file
   */
  private parseCSV(file: File): Promise<CandidateData[]> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (results) => {
          try {
            const candidateData = this.processRawData(results.data);
            resolve(candidateData);
          } catch (error) {
            reject(error);
          }
        },
        error: (error) => {
          console.error('CSV parsing error:', error);
          reject(new Error('Failed to parse CSV file'));
        }
      });
    });
  }

  /**
   * Parse Excel file
   */
  private parseExcel(file: File): Promise<CandidateData[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          
          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName];
          
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
          
          const processedData = this.processExcelData(jsonData as any[][]);
          const candidateData = this.processRawData(processedData);
          
          resolve(candidateData);
        } catch (error) {
          console.error('Excel parsing error:', error);
          reject(new Error('Failed to parse Excel file'));
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsArrayBuffer(file);
    });
  }

  /**
   * Process Excel data from array format to object format
   */
  private processExcelData(data: any[][]): any[] {
    if (data.length < 2) {
      throw new Error('Excel file must have at least a header and one data row');
    }
    const headers = data[0];
    const rows = data.slice(1);
    return rows.map(row => {
      const obj: any = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] || '';
      });
      return obj;
    });
  }

  /**
   * Process raw data, validate, and return a clean array of CandidateData.
   */
  private processRawData(data: any[]): CandidateData[] {
    if (!data || data.length === 0) {
      throw new Error('No data found in file');
    }

    const fileHeaders = Object.keys(data[0]);
    this.validateHeaders(fileHeaders);

    const transformedData = data.map((row, index) => {
      const transformedRow: any = {};
      
      Object.keys(row).forEach(originalKey => {
        const mapping = this.columnMappings[originalKey as keyof typeof this.columnMappings];
        if (mapping) {
          const value = row[originalKey];
          transformedRow[mapping.key] = this.transformValue(value, mapping.type);
        }
      });

      this.validateRowData(transformedRow, index + 1);
      
      return transformedRow as CandidateData;
    });

    return transformedData;
  }

  /**
   * Validate file headers
   */
  private validateHeaders(fileHeaders: string[]): void {
    const missingRequired = this.requiredFields.filter(field => !fileHeaders.includes(field));
    if (missingRequired.length > 0) {
      const errorMsg = `Missing required fields: ${missingRequired.join(', ')}`;
      console.error('Header validation error:', errorMsg);
      throw new Error(errorMsg);
    }

    const allExpectedFields = [...this.requiredFields, ...this.optionalFields];
    const unexpectedHeaders = fileHeaders.filter(header => !allExpectedFields.includes(header));
    if (unexpectedHeaders.length > 0) {
      console.warn('Unexpected headers found:', unexpectedHeaders.join(', '));
    }
  }

  /**
   * Validate individual row data
   */
  private validateRowData(row: any, rowNumber: number): void {
    const requiredKeys: (keyof CandidateData)[] = [
      'sNo', 'date', 'source', 'candidateName', 'proposedRole', 'skill', 'emailId',
      'contactNo', 'totalExp', 'relevantExp', 'currentEmployer', 'currentLocation',
      'preferredLocation', 'noticePeriod', 'cctcFixed'
    ];

    const missingFields = requiredKeys.filter(key => {
      const value = row[key];
      return value === null || value === undefined || value === '';
    });

    if (missingFields.length > 0) {
      const errorMsg = `Row ${rowNumber}: Missing required data in fields: ${missingFields.join(', ')}`;
      console.error('Row validation error:', errorMsg);
      throw new Error(errorMsg);
    }

    if (row.emailId && !this.isValidEmail(row.emailId)) {
      console.warn(`Row ${rowNumber}: Invalid email format: ${row.emailId}`);
    }

    const numericFields: (keyof CandidateData)[] = ['sNo', 'totalExp', 'relevantExp', 'noticePeriod', 'cctcFixed'];
    numericFields.forEach(field => {
      if (row[field] !== undefined && isNaN(Number(row[field]))) {
        console.warn(`Row ${rowNumber}: Invalid numeric value in ${field}: ${row[field]}`);
      }
    });
  }

  /**
   * Transform value based on column type
   */
  private transformValue(value: any, type: string): any {
    if (value === null || value === undefined || value === '') {
      return type === 'number' ? 0 : '';
    }
    switch (type) {
      case 'number':
        const numValue = Number(value);
        return isNaN(numValue) ? 0 : numValue;
      case 'date':
        return this.formatDate(value);
      case 'string':
      default:
        return String(value).trim();
    }
  }

  /**
   * Format date to dd/mm/yyyy
   */
  private formatDate(dateValue: any): string {
    if (!dateValue) return '';
    try {
      let date: Date;
      if (dateValue instanceof Date) {
        date = dateValue;
      } else if (typeof dateValue === 'number') {
        date = new Date((dateValue - 25569) * 86400 * 1000);
      } else if (typeof dateValue === 'string') {
        date = dateValue.includes('/')
          ? new Date(parseInt(dateValue.split('/')[2]), parseInt(dateValue.split('/')[1]) - 1, parseInt(dateValue.split('/')[0]))
          : new Date(dateValue);
      } else {
        date = new Date(dateValue);
      }
      if (isNaN(date.getTime())) {
        console.warn('Invalid date value:', dateValue);
        return '';
      }
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error('Date formatting error:', error);
      return '';
    }
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Export current data back to CSV format
   */
  exportToCSV(dataSource: CandidateData[], filename: string = 'candidate-data.csv'): void {
    const exportData = dataSource.map(row => {
      const originalFormatRow: any = {};
      Object.entries(this.columnMappings).forEach(([originalKey, mapping]) => {
        const key = mapping.key as keyof CandidateData;
        if (row[key] !== undefined) {
          originalFormatRow[originalKey] = row[key];
        }
      });
      return originalFormatRow;
    });

    const csv = Papa.unparse(exportData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}