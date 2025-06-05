import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  userType: string;
  category: string;
  variables?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class EmailTemplateServiceService {

  private apiUrl = 'https://localhost:7144/api/EmailTemplates';

  constructor(private http: HttpClient) { }

  // getEmailTemplates(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl);
  // }

  getGroupedEmailTemplates(): Observable<Record<string, EmailTemplate[]>> { 
    
    return this.http.get<EmailTemplate[]>(this.apiUrl).pipe(
    map((templates) => {
      const grouped: Record<string, EmailTemplate[]> = {
        Candidates: [],
        Recruiter: [],
        InterviewPanel: []
      };

      templates.forEach(t => {
        // console.log('Processing template:', t);
        const mappedTemplate = {
          ...t,
          variables: t.variables || []
        };

        if (t.userType === 'Candidate') grouped['Candidates'].push(mappedTemplate);
        else if (t.userType === 'Recruiter') grouped['Recruiter'].push(mappedTemplate);
        else if (t.userType === 'InterviewPanel') grouped['InterviewPanel'].push(mappedTemplate);
      });

      return grouped;
    })
  );

  }

  /**
   * Extract unique variables from all templates
   */
  // getAvailableVariables(): Observable<string[]> {
  //   return this.http.get<EmailTemplate[]>(this.apiUrl).pipe(
  //     map((templates) => {
  //       const variableSet = new Set<string>();
  //       templates.forEach(t => {
  //         (t.variables || []).forEach(v => variableSet.add(v));
  //       });
  //       return Array.from(variableSet);
  //     })
  //   );
  // }

//   classifyEmailTemplates(templates: EmailTemplate[]): Record<string, EmailTemplate[]> {
//   return templates.reduce((acc, template) => {
//     const key = template.category; // or template.type
//     if (!acc[key]) {
//       acc[key] = [];
//     }
//     acc[key].push(template);
//     return acc;
//   }, {} as Record<string, EmailTemplate[]>);
// }

}


    // return this.http.get<EmailTemplate[]>(this.apiUrl).pipe(
    //   map((templates) => {
    //     const grouped: Record<string, EmailTemplate[]> = {};

    //     templates.forEach(t => {
    //       const key = t.type;
    //       const template: EmailTemplate = {
    //         id: t.id,
    //         name: t.name,
    //         subject: t.subject,
    //         content: t.content,
    //         type: t.type,
    //         category: t.type,
    //         variables: t.variables || []
    //       };

    //       if (!grouped[key]) grouped[key] = [];
    //       grouped[key].push(template);
    //     });

    //     return grouped;
    //   })
    // );
    //