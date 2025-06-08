import { Injectable } from '@angular/core';
import mammoth from 'mammoth';

export interface JobRequisitionData {
  role?: string;
  requestedDate?: string;
  requestedBy?: string;
  businessUnit?: string;
  hiringManager?: string;
  skillsMandatory?: string[];
  skillsPrimary?: string[];
  skillsGoodToHave?: string[];
  totalExperience?: string;
  relevantExperience?: string;
  qualification?: string;
  workLocation?: string;
  expectedOnboardingDate?: string;
  numberOfPositions?: number;
  workShifts?: string;
  onsiteOpportunity?: boolean | null;
  billable?: boolean | null;
  clientInterview?: boolean | null;
  projectRole?: string;
  projectName?: string;
  clientName?: string;
  clientCountry?: string;
  expectedSalaryRange?: string;
  jobPurpose?: string;
  jobDescription?: string[];
  skillsAndCompetencies?: string[];
  contractType?: string;
  rate?: string;
  onsiteWorkLocation?: string;
  preferredVisaStatus?: string;
  contractDuration?: string;
  preferredTimeZone?: string;
  clientBackground?: string;
  clientLocation?: string;
  reportingTo?: string;
  interviewProcess?: string;
  idealStartDate?: string;
  h1TransferAccepted?: boolean | null;
  travelRequirements?: string;
}

@Injectable({ providedIn: 'root' })
export class DocxParserService {
  async parseJobRequisitionFile(file: File): Promise<JobRequisitionData> {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return this.parseJobRequisitionText(result.value);
  }

  private parseJobRequisitionText(text: string): JobRequisitionData {
    const data: JobRequisitionData = {};
    let normalizedText = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/–/g, '-');

    const getVal = (label: string) => this.extractTableValue(normalizedText, label);

    data.role = normalizedText.match(/Role\s*[-:]\s*(.+?)(?=\n|$)/i)?.[1]?.trim();
    data.requestedDate = getVal('Requested Date') ?? undefined;
    data.requestedBy = getVal('Requested By') ?? undefined;
    data.businessUnit = getVal('Business Unit') ?? undefined;
    data.hiringManager = getVal('Hiring Manager') ?? undefined;

    data.skillsMandatory = this.extractSkillList(normalizedText, 'Skills - Mandatory');
    data.skillsPrimary = this.extractSkillList(normalizedText, 'Skills - Primary');
    data.skillsGoodToHave = this.extractSkillList(normalizedText, 'Skills - Good to have');

    data.qualification = getVal('Qualification') ?? undefined;
    data.totalExperience = getVal('Total Experience(?: \\(.*?\\))?') ?? undefined;
    data.relevantExperience = getVal('Relevant Experience(?: \\(.*?\\))?') ?? undefined;

    data.workLocation = getVal('Work Location') ?? undefined;
    data.expectedOnboardingDate = getVal('Expected Date of Onboarding') ?? undefined;
    const numPos = getVal('Number of Positions');
    data.numberOfPositions = numPos && !isNaN(+numPos) ? parseInt(numPos, 10) : undefined;

    // === Updated to use first snippet's next-line logic ===
    data.workShifts = this.getValueAfterLabel(normalizedText, 'Work Shifts') ?? undefined;
    data.preferredVisaStatus = this.getValueAfterLabel(normalizedText, 'Preferred Visa Status') ?? undefined;
    data.onsiteWorkLocation = 
      this.getValueAfterLabel(normalizedText, 'Work Location – Remote or Hybrid or Onsite') ??
      this.getValueAfterLabel(normalizedText, 'Work Location - Remote or Hybrid or Onsite') ??
      this.getOnsiteLocationFromAdditionalSection(normalizedText) ??
      getVal('Work Location – Remote or Hybrid or Onsite') ?? undefined;

    data.onsiteOpportunity = this.extractYesNoNextLine(normalizedText, 'Onsite Opportunity');
    data.billable = this.extractYesNoNextLine(normalizedText, 'Billable');
    data.clientInterview = this.extractYesNoNextLine(normalizedText, 'Client Interview');
    data.h1TransferAccepted = this.extractYesNoNextLine(normalizedText, 'Do we also accept H1 transfer');

    data.projectRole = getVal('Project Role / Job Title') ?? undefined;
    data.projectName = getVal('Project Name') ?? undefined;
    data.clientCountry = getVal('Client Country') ?? undefined;
    data.expectedSalaryRange = getVal('Expected Salary Range(?: \\(.*?\\))?') ?? undefined;

    const clientMatch = normalizedText.match(/(?:^|\n)Client\s*\n([^\n]+?)(?=\n|Expected Salary|$)/i);
    if (clientMatch) data.clientName = clientMatch[1].trim();

    const jobPurposeMatch = normalizedText.match(/Job Purpose[^]*?(?:To\s+)(.+?)(?=\n{2,}|Job Description|$)/is);
    if (jobPurposeMatch) data.jobPurpose = jobPurposeMatch[1].trim();

    data.jobDescription = this.extractBulletPoints(
      this.extractSection(normalizedText, 'Job Description / Duties and Responsibilities', 'Job Specification|Additional Details|If the role is Contract')
    );

    data.skillsAndCompetencies = this.extractBulletPoints(
      this.extractSection(normalizedText, 'Job Specification / Skills and Competencies', 'Additional Details|If the role is Contract')
    );

    data.contractType = getVal('Contract / Permanent') ?? undefined;
    data.rate = this.extractRateValue(normalizedText);

    data.contractDuration = getVal('Duration of the Contract') ?? undefined;
    data.preferredTimeZone = getVal('Preferred work time zone') ?? undefined;

    const clientBg = getVal("Who is the Client - Or client 's background");
    data.clientBackground = clientBg?.replace(/^-?\s*Or.*$/, '').trim();

    data.clientLocation = getVal('Where is the client located') ?? undefined;
    data.reportingTo = getVal('To whom will be candidate reporting- Experion\u00a0team or Client manager') ?? undefined;

    data.interviewProcess = this.extractSection(
      normalizedText,
      'Interview process.*?Panels',
      'Ideal start date|Do we also accept H1 transfer'
    )?.replace(/\n+/g, ' ');

    data.idealStartDate = getVal('Ideal start date') ?? undefined;
    data.travelRequirements = getVal('Will the role require any travelling') ?? undefined;

    return data;
  }

  // === First snippet's method for extracting next line value after label ===
  private getValueAfterLabel(text: string, label: string): string | undefined {
    const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
    const labelLower = label.toLowerCase();

    for (let i = 0; i < lines.length - 1; i++) {
      if (lines[i].toLowerCase().includes(labelLower)) {
        const nextLine = lines[i + 1];
        if (nextLine && !nextLine.toLowerCase().includes(labelLower)) {
          return nextLine.trim();
        }
      }
    }
    return undefined;
  }

  // === First snippet's method to get onsite location from 'Additional Details for Onsite Position Only' section ===
  private getOnsiteLocationFromAdditionalSection(text: string): string | undefined {
    const lines = text.split('\n').map(line => line.trim());
    const startIndex = lines.findIndex(line =>
      line.toLowerCase().includes('additional details for onsite position only')
    );
    if (startIndex !== -1) {
      for (let i = startIndex; i < lines.length - 1; i++) {
        if (lines[i].toLowerCase().includes('work location')) {
          const value = lines[i + 1].trim();
          if (/remote|onsite|hybrid/i.test(value)) {
            return value;
          }
        }
      }
    }
    return undefined;
  }

  private extractYesNoNextLine(text: string, label: string): boolean | null {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    const labelLower = label.toLowerCase();

    for (let i = 0; i < lines.length - 1; i++) {
      if (lines[i].toLowerCase().includes(labelLower)) {
        const value = lines[i + 1].trim().toLowerCase();
        if (value === 'yes') return true;
        if (value === 'no') return false;
      }
    }
    return null;
  }

  private extractRateValue(text: string): string | undefined {
    const regexPatterns = [
      /Rate\s*\(.*?\)\s*[:\-]?\s*\$?\s*([0-9]+(?:\.[0-9]+)?)/i,
      /Rate\s*[:\-]?\s*\$?\s*([0-9]+(?:\.[0-9]+)?)/i
    ];
    for (const regex of regexPatterns) {
      const match = text.match(regex);
      if (match?.[1]) {
        return match[1].trim();
      }
    }
    const lines = text.split('\n');
    for (let i = 0; i < lines.length - 1; i++) {
      if (lines[i].toLowerCase().includes('rate')) {
        const num = lines[i + 1].match(/\$?\s*([0-9]+(?:\.[0-9]+)?)/);
        if (num?.[1]) {
          return num[1];
        }
      }
    }
    return undefined;
  }

  private extractTableValue(text: string, label: string): string | null {
    const patterns = [
      new RegExp(`${label}\\s*[-–:]?\\s*([^\\n\\r]+)`, 'i'),
      new RegExp(`${label}[\\s\\-:]+([^\\n\\r]+)`, 'i')
    ];
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match?.[1]) return match[1].trim();
    }
    return null;
  }

  private extractSkillList(text: string, label: string): string[] | undefined {
    const raw = this.extractTableValue(text, label);
    return raw?.toLowerCase().includes('n/a') ? undefined :
      raw?.split(',').map(s => s.trim()).filter(Boolean);
  }

  private extractSection(text: string, startMarker: string, endMarker: string): string | undefined {
    const regex = new RegExp(`${startMarker}[^]*?(?=${endMarker}|$)`, 'is');
    const match = text.match(regex);
    return match?.[0]?.trim();
  }

  private extractBulletPoints(text?: string): string[] {
    if (!text) return [];
    const bullets: string[] = [];
    const bulletPattern = /[-•]\s+(.+?)(?=\n\s*[-•]|\n\s*$|$)/g;
    const linePattern = /^(.{5,})$/gm;

    const isBullet = bulletPattern.test(text);
    const matches = isBullet ? text.matchAll(bulletPattern) : text.matchAll(linePattern);

    for (const match of matches) {
      if (match[1]) bullets.push(match[1].trim().replace(/\s+/g, ' '));
    }

    return bullets;
  }
}
