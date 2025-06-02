import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { Calendar } from 'primeng/calendar';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { Message } from 'primeng/message';
import { MultiSelect } from 'primeng/multiselect';
import { Tag } from 'primeng/tag';
import { Toast } from 'primeng/toast';
import { ButtonComponent } from "../../ui/button/button.component";
import { IconComponent } from "../../ui/icon/icon.component";
import { ButtonIconComponent } from "../../ui/button-icon/button-icon.component";
import { CommonLayoutComponent } from "../../layouts/common-layout/common-layout.component";
import { CardsComponent } from "../../ui/cards/cards.component";
import { HeaderTextComponent } from "../../ui/header-text/header-text.component";
import { AlertsComponent } from '../../ui/alerts/alerts.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule-page',
  imports: [Calendar, MultiSelect, Tag, Button, Toast, Message, DropdownModule, FormsModule, CommonModule, ButtonComponent, IconComponent, ButtonIconComponent, CommonLayoutComponent, CardsComponent, HeaderTextComponent, AlertsComponent],
  templateUrl:'./schedule-page.component.html',
  styleUrl: './schedule-page.component.scss',
  providers: [MessageService]
})
export class SchedulePageComponent implements OnInit {
  // Sample data
  candidates: any[] = [
    { id: 'CND-101', name: 'Emma Johnson', mobNumber: '7012345678', email: 'emma.johnson@example.com', stage: 'Technical Level 1', totalExp: 3, relevantExp: 2, currentEmployer: 'Google' },
    { id: 'CND-102', name: 'Liam Smith', mobNumber: '7123456789', email: 'liam.smith@example.com', stage: 'Technical Level 2', totalExp: 5, relevantExp: 4, currentEmployer: 'Amazon' },
    { id: 'CND-103', name: 'Olivia Brown', mobNumber: '7234567890', email: 'olivia.brown@example.com', stage: 'Technical Level 3', totalExp: 7, relevantExp: 6, currentEmployer: 'Microsoft' },
    { id: 'CND-104', name: 'Noah Davis', mobNumber: '7345678901', email: 'noah.davis@example.com', stage: 'Management Level 1', totalExp: 8, relevantExp: 7, currentEmployer: 'Facebook' },
    { id: 'CND-105', name: 'Ava Wilson', mobNumber: '7456789012', email: 'ava.wilson@example.com', stage: 'Management Level 2', totalExp: 10, relevantExp: 9, currentEmployer: 'Apple' },
    { id: 'CND-106', name: 'William Miller', mobNumber: '7567890123', email: 'william.miller@example.com', stage: 'Technical Level 1', totalExp: 2, relevantExp: 1, currentEmployer: 'Netflix' },
    { id: 'CND-107', name: 'Sophia Moore', mobNumber: '7678901234', email: 'sophia.moore@example.com', stage: 'Technical Level 2', totalExp: 4, relevantExp: 3, currentEmployer: 'Tesla' },
    { id: 'CND-108', name: 'James Taylor', mobNumber: '7789012345', email: 'james.taylor@example.com', stage: 'Technical Level 3', totalExp: 6, relevantExp: 5, currentEmployer: 'Spotify' },
    { id: 'CND-109', name: 'Isabella Anderson', mobNumber: '7890123456', email: 'isabella.anderson@example.com', stage: 'Management Level 1', totalExp: 9, relevantExp: 8, currentEmployer: 'Adobe' },
    { id: 'CND-110', name: 'Benjamin Thomas', mobNumber: '7901234567', email: 'benjamin.thomas@example.com', stage: 'Management Level 2', totalExp: 11, relevantExp: 10, currentEmployer: 'Salesforce' }
  ];

  interviewers: any[] = [
    { id: 'INT-006', name: 'Lucas' },
    { id: 'INT-007', name: 'Amelia' },
    { id: 'INT-008', name: 'Ethan' },
    { id: 'INT-009', name: 'Mia' },
    { id: 'INT-010', name: 'Jack' },
    { id: 'INT-011', name: 'Lily' }
  ];

  // Time slots for the FORM dropdowns
  timeSlots = [
    
    { label: '9:00 AM', value: '09:00' }, { label: '9:30 AM', value: '09:30' },
    { label: '10:00 AM', value: '10:00' }, { label: '10:30 AM', value: '10:30' },
    { label: '11:00 AM', value: '11:00' }, { label: '11:30 AM', value: '11:30' },
    { label: '12:00 PM', value: '12:00' }, { label: '12:30 PM', value: '12:30' },
    { label: '1:00 PM', value: '13:00' }, { label: '1:30 PM', value: '13:30' },
    { label: '2:00 PM', value: '14:00' }, { label: '2:30 PM', value: '14:30' },
    { label: '3:00 PM', value: '15:00' }, { label: '3:30 PM', value: '15:30' },
    { label: '4:00 PM', value: '16:00' }, { label: '4:30 PM', value: '16:30' },
    { label: '5:00 PM', value: '17:00' }, { label: '5:30 PM', value: '17:30' },
    { label: '6:00 PM', value: '18:00' }
  ];

  // Component state
  selectedCandidate: any | null = null;
  selectedDate: Date = new Date();
  selectedStartTime: string = '';
  selectedEndTime: string = '';
  selectedInterviewers: string[] = [];
  scheduledInterviews: any[] = [];
  conflicts: string[] = [];
  minDate: Date = new Date();
  filteredEndTimeSlots: any[] = [];
  currentMeetingDuration: number = 0; // Initialize to 0 or null


  @ViewChild('candidateDropdown') candidateDropdown: Dropdown | undefined;

  // NEW Properties for Grid UI
  displayHours: string[] = [ // Hours for the time axis on the grid
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ];
  workingHoursStart = 9; // 9 AM (inclusive)
  workingHoursEnd = 16;  // 5 PM (exclusive, so up to 16:xx)
  allScheduledEventsForCurrentDate: any[] = [];
myInterview: any;

constructor(private router: Router,private messageService: MessageService) {
  this.currentUrl = this.router.url;
}

  ngOnInit() {
    this.initializeSampleData();
    this.updateScheduledEventsForCurrentDate();
    this.calculateCurrentMeetingDuration(); // Calculate initial duration (likely 0)
    // Load events for the initial date
      this.currentUrl = this.router.url;
      if (this.currentUrl.startsWith('/recruiter-lead')) {
        this.items=[{ label: 'Interview', routerLink: '/recruiter-lead/interviews' }, {label: 'Schedule', routerLink: '/recruiter-lead/interviews/Schedule'}, {label: 'Scheduling Page', routerLink: '/recruiter-lead/interviews/Schedule/schedule-page'}]
        this.router.navigate(['/recruiter-lead/interviews/shortlist/schedule-page']);
      } else if (this.currentUrl.startsWith('/recruiter')) {
        this.items=[{ label: 'Interview', routerLink: '/recruiter/interviews' }, {label: 'Schedule', routerLink: '/recruiter/interviews/Schedule'}, {label: 'Scheduling Page', routerLink: '/recruiter/interviews/Schedule/schedule-page'}]
  
      }
    
  }

  initializeSampleData() {
    const today = new Date();
    this.scheduledInterviews = [
      {
        id: 'SCH-001',
        candidateId: 'CND-037',
        candidateName: 'Sophia Martinez',
        date: new Date(today),
        startTime: '11:30',
        endTime: '12:00',
        interviewers: ['INT-006'],
        interviewerNames: ['Lucas']
      },
      {
        id: 'SCH-002',
        candidateId: 'CND-038',
        candidateName: 'James Anderson',
        date: new Date(today),
        startTime: '12:00',
        endTime: '13:00',
        interviewers: ['INT-007'],
        interviewerNames: ['Amelia']
      },
      {
        id: 'SCH-003',
        candidateId: 'CND-039',
        candidateName: 'Emily Johnson',
        date: new Date(today),
        startTime: '14:00',
        endTime: '15:00',
        interviewers: ['INT-008'],
        interviewerNames: ['Ethan']
      },
      {
        id: 'SCH-004',
        candidateId: 'CND-040',
        candidateName: 'Michael Smith',
        date: new Date(today),
        startTime: '10:00',
        endTime: '11:30',
        interviewers: ['INT-009'],
        interviewerNames: ['Mia']
      },
      {
        id: 'SCH-005',
        candidateId: 'CND-041',
        candidateName: 'Olivia Brown',
        date: new Date(today),
        startTime: '09:00',
        endTime: '09:30',
        interviewers: ['INT-010'],
        interviewerNames: ['Jack']
      },
      {
        id: 'SCH-006',
        candidateId: 'CND-042',
        candidateName: 'William Garcia',
        date: new Date(today),
        startTime: '15:00',
        endTime: '15:30',
        interviewers: ['INT-011'],
        interviewerNames: ['Lily']
      }
    ];
  }
  

  onCandidateChange(event: any) {
    if (this.selectedCandidate) {
      this.resetFormForNewCandidate();
      this.checkForConflicts();
    } else {
      this.resetFormForNewCandidate();
      this.conflicts = [];
    }
    // The grid UI will update automatically due to Angular's change detection
    // when selectedCandidate changes, as it's used in ngClass for event blocks.
  }

  onDateChange() {
    this.updateScheduledEventsForCurrentDate(); // Reload events for the new date for the grid
    this.checkForConflicts(); // Check conflicts for the form
  }

  onTimeChange() {
    this.updateEndTimeSlots();
    if (!this.selectedStartTime) {
        this.selectedEndTime = '';
    }
    this.checkForConflicts();
  }

  onInterviewersChange() {
    this.checkForConflicts();
    console.log(this.currentMeetingDuration)
    // Grid UI updates automatically as selectedInterviewers is used in *ngFor
  }
  calculateCurrentMeetingDuration() {
    if (this.selectedStartTime && this.selectedEndTime) {
      const startMinutes = this.timeToMinutes(this.selectedStartTime);
      const endMinutes = this.timeToMinutes(this.selectedEndTime);
      // Ensure end time is after start time
      if (endMinutes > startMinutes) {
        this.currentMeetingDuration = endMinutes - startMinutes;
      } else {
        // If end time is not after start time, treat duration as 0 or invalid
        this.currentMeetingDuration = 0;
        // Optionally, you could set a flag here to indicate an invalid time range
        // and prevent scheduling or show a specific message.
      }
    } else {
      this.currentMeetingDuration = 0;
    }
  }

  items:any = [];
  currentUrl:any;
 
  @ViewChild('alerts') alertsComponent!: AlertsComponent;
  
  scheduleAlert(row: any){
      const message = `Are you sure you want to schedule a interview with ${this.selectedCandidate.name}?`;
      
      this.alertsComponent.showConfirmDialog({
        message: message,
        header: `Add ${this.selectedCandidate.stage}`,
        icon: 'pi pi-add',
        acceptLabel: 'Schedule',
        rejectLabel: 'Cancel',
        acceptSeverity: 'success',
        rejectSeverity: 'warn',
        // acceptSummary: 'Removed',
        // rejectSummary: 'Cancelled',
        // acceptDetail: `Removed !`,
        // rejectDetail: 'No changes were made.',
        onAccept: () => {
          this.scheduleInterview();
        },
        onReject: () => {
        }
      });
    
  }
  formatDurationDisplay(totalMinutes: number): string {
    if (totalMinutes <= 0) {
      return ''; // Or handle as needed, e.g., '(0 min)' or empty
    }

    if (totalMinutes < 60) {
      return `(${totalMinutes} min)`;
    } else {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      let durationStr = `(${hours} hr`;
      if (minutes > 0) {
        durationStr += ` ${minutes} min`;
      }
      durationStr += ')';
      return durationStr;
    }
  }
  isCellInTentativeSchedule(cellHour: string): boolean {
    if (!this.selectedDate || !this.selectedStartTime || !this.selectedEndTime) {
      return false; // Not enough info for a tentative schedule
    }

    // Convert cellHour to start and end minutes for the cell
    // Assuming cellHour is like "08:00", "09:00" representing the start of an hourly slot
    const cellStartMinutes = this.timeToMinutes(cellHour);
    const cellEndMinutes = cellStartMinutes + 60; // Assuming 1-hour grid cells

    // Get tentative schedule start and end times from the form
    const tentativeStartMinutes = this.timeToMinutes(this.selectedStartTime);
    const tentativeEndMinutes = this.timeToMinutes(this.selectedEndTime);

    if (tentativeStartMinutes >= tentativeEndMinutes) {
      return false; // Invalid time range in form
    }

    // Check for overlap: (StartA < EndB) and (EndA > StartB)
    // The cell (A) overlaps with the tentative schedule (B)
    return cellStartMinutes < tentativeEndMinutes && cellEndMinutes > tentativeStartMinutes;
  }

  updateEndTimeSlots() {
    if (!this.selectedStartTime) {
      this.filteredEndTimeSlots = [];
      this.selectedEndTime = '';
      return;
    }
    const startIndex = this.timeSlots.findIndex(slot => slot.value === this.selectedStartTime);
    this.filteredEndTimeSlots = this.timeSlots.slice(startIndex + 1);
    if (this.selectedEndTime && !this.filteredEndTimeSlots.find(slot => slot.value === this.selectedEndTime)) {
        this.selectedEndTime = '';
    }
  }

  checkForConflicts() {
    this.conflicts = [];
    if (!this.selectedCandidate || !this.selectedDate || !this.selectedStartTime || !this.selectedEndTime || this.selectedInterviewers.length === 0) {
      return;
    }
    const selectedDateStr = this.selectedDate.toDateString();
    for (const interviewerId of this.selectedInterviewers) {
      const interviewerName = this.getInterviewerName(interviewerId);
      const existingInterviews = this.scheduledInterviews.filter(interview =>
        new Date(interview.date).toDateString() === selectedDateStr &&
        interview.interviewers.includes(interviewerId)
      );
      for (const existing of existingInterviews) {
        if (this.hasTimeConflict(this.selectedStartTime, this.selectedEndTime, existing.startTime, existing.endTime)) {
          this.conflicts.push(`${interviewerName} has a conflict: interview with ${existing.candidateName} (${existing.startTime}-${existing.endTime})`);
        }
      }
    }
  }

  hasTimeConflict(start1: string, end1: string, start2: string, end2: string): boolean {
    const start1Minutes = this.timeToMinutes(start1);
    const end1Minutes = this.timeToMinutes(end1);
    const start2Minutes = this.timeToMinutes(start2);
    const end2Minutes = this.timeToMinutes(end2);
    return (start1Minutes < end2Minutes && end1Minutes > start2Minutes);
  }

  timeToMinutes(time: string): number {
    if (!time || !time.includes(':')) return 0; // Basic guard
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  getInterviewerName(interviewerId: string): string {
    const interviewer = this.interviewers.find(i => i.id === interviewerId);
    return interviewer ? interviewer.name : 'Unknown';
  }

  canSchedule(): boolean {
    return !!(
      this.selectedCandidate &&
      this.selectedDate &&
      this.selectedStartTime &&
      this.selectedEndTime &&
      this.selectedInterviewers.length > 0 &&
      this.conflicts.length === 0
    );
  }

  scheduleInterview() {
    if (!this.canSchedule()) {
      this.messageService.add({
        severity: 'error', summary: 'Cannot Schedule',
        detail: 'Please fill all required fields, select a candidate, and resolve conflicts.'
      });
      return;
    }
    const newInterview: any = {
      id: 'SCH-' + Date.now(),
      candidateId: this.selectedCandidate!.id,
      candidateName: this.selectedCandidate!.name,
      date: new Date(this.selectedDate),
      startTime: this.selectedStartTime,
      endTime: this.selectedEndTime,
      interviewers: [...this.selectedInterviewers],
      interviewerNames: this.selectedInterviewers.map(id => this.getInterviewerName(id)),
      duration: this.timeToMinutes(this.selectedEndTime) - this.timeToMinutes(this.selectedStartTime)
    };
    this.scheduledInterviews.push(newInterview);
    this.updateScheduledEventsForCurrentDate(); // Refresh grid data
    this.messageService.add({
      severity: 'success', summary: 'Interview Scheduled',
      detail: `Interview for ${this.selectedCandidate!.name} on ${new Date(this.selectedDate).toLocaleDateString()} from ${this.selectedStartTime} to ${this.selectedEndTime} has been scheduled.`
    });
    this.resetFormFieldsAfterScheduling();
    this.calculateCurrentMeetingDuration(); // Reset duration for the next new schedule

    this.checkForConflicts();
  }

  resetFormForNewCandidate() {
    this.selectedStartTime = '';
    this.selectedEndTime = '';
    this.selectedInterviewers = [];
    this.conflicts = [];
    this.filteredEndTimeSlots = [];
    this.calculateCurrentMeetingDuration(); // Recalculate/reset duration

  }

  resetFormFieldsAfterScheduling() {
    this.selectedStartTime = '';
    this.selectedEndTime = '';
    // this.selectedInterviewers = []; // Decide if you want to clear interviewers
    this.conflicts = [];
    this.filteredEndTimeSlots = [];
    this.calculateCurrentMeetingDuration(); // Recalculate/reset duration

  }

  previousDay() {
    const prevDay = new Date(this.selectedDate);
    prevDay.setDate(prevDay.getDate() - 1);
    this.selectedDate = prevDay;
    this.updateScheduledEventsForCurrentDate();
    this.checkForConflicts();
  }

  nextDay() {
    const nextDay = new Date(this.selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    this.selectedDate = nextDay;
    this.updateScheduledEventsForCurrentDate();
    this.checkForConflicts();
  }

  // --- NEW Methods for Grid UI ---
  updateScheduledEventsForCurrentDate() {
    if (this.selectedDate) {
      const dateStr = this.selectedDate.toDateString();
      this.allScheduledEventsForCurrentDate = this.scheduledInterviews.filter(
        interview => new Date(interview.date).toDateString() === dateStr
      );
    } else {
      this.allScheduledEventsForCurrentDate = [];
    }
  }

  formatHourForDisplay(time: string): string { // e.g., "08:00" -> "8am"
    const hour = parseInt(time.split(':')[0], 10);
    if (hour === 0) return '12am';
    if (hour === 12) return '12pm';
    if (hour < 12) return `${hour}am`;
    return `${hour - 12}pm`;
  }

  isWorkingHour(hourString: string): boolean { // e.g., "08:00"
    const hour = parseInt(hourString.split(':')[0], 10);
    return hour >= this.workingHoursStart && hour < this.workingHoursEnd;
  }

  getEventsForCell(interviewerId: string, cellHour: string): any[] {
    const cellStartTimeMinutes = this.timeToMinutes(cellHour);
    const cellEndTimeMinutes = cellStartTimeMinutes + 60; // Assuming 1-hour cells

    return this.allScheduledEventsForCurrentDate.filter(event => {
      if (!event.interviewers.includes(interviewerId)) {
        return false;
      }
      const eventStartMinutes = this.timeToMinutes(event.startTime);
      const eventEndMinutes = this.timeToMinutes(event.endTime);
      return eventStartMinutes < cellEndTimeMinutes && eventEndMinutes > cellStartTimeMinutes;
    });
  }

  calculateEventTopPosition(event: any, cellHour: string): string {
    const cellHourStartMinutes = this.timeToMinutes(cellHour);
    const eventStartMinutes = this.timeToMinutes(event.startTime);
    const offsetMinutes = Math.max(0, eventStartMinutes - cellHourStartMinutes);
    return ((offsetMinutes / 60) * 100) + '%';
  }

  calculateEventHeight(event: any, cellHour: string): string {
    const cellHourStartMinutes = this.timeToMinutes(cellHour);
    const cellHourEndMinutes = cellHourStartMinutes + 60;
    const eventStartMinutes = this.timeToMinutes(event.startTime);
    const eventEndMinutes = this.timeToMinutes(event.endTime);
    const effectiveStartInCell = Math.max(eventStartMinutes, cellHourStartMinutes);
    const effectiveEndInCell = Math.min(eventEndMinutes, cellHourEndMinutes);
    const durationInCellMinutes = Math.max(0, effectiveEndInCell - effectiveStartInCell);
    return ((durationInCellMinutes / 60) * 100) + '%';
  }

  formatEventTimeForBlock(time: string): string { // e.g., "11:30" -> "11:30a"
    if (!time || !time.includes(':')) return '';
    const [h, m] = time.split(':');
    let hour = parseInt(h, 10);
    const period = hour >= 12 && hour < 24 ? 'p' : 'a'; // Handle 12 PM and midnight if needed
    if (hour === 0) { hour = 12; } // Midnight case
    else if (hour > 12) { hour -= 12; }
    return `${hour}:${m}${period}`;
  }
}