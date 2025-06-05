import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailTemplateServiceService {

  private apiUrl = 'https://localhost:7144/api/EmailTemplates';

  constructor() { }
}
