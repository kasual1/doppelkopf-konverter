import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  constructor() {}

  toCSV(headers: string[], values: Array<number[]>): string {
    return (
      'data:text/csv;charset=utf-8,' +
      headers.join(',') +
      '\n' +
      values.map((v, i) => `${i > 0 ? '\n' : ''}` + v.join(','))
    );
  }

  downloadCSV(csv: string): void {
    const encodedUri = encodeURI(csv);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'my_data.csv');
    document.body.appendChild(link);
    link.click();
  }
}
