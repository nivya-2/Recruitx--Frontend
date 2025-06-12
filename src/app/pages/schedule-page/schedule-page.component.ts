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
// import {InterviewPanelService,  } from '../../interview-panel.service';
import { forkJoin, of } from 'rxjs'; // IMPORT forkJoin and of for handling multiple API calls
import { log } from 'console';
import { InterviewPanelService, InterviewMeeting, PanelMember, ScheduleInterviewRequest } from '../../core/services/api/interview-panel.service';
import { ActivatedRoute } from '@angular/router';
import { JdCandidateService } from '../../core/services/api/jd-candidate.service';
@Component({
selector: 'app-schedule-page',
imports: [Calendar, MultiSelect, Tag, Button, Toast, Message, DropdownModule, FormsModule, CommonModule, ButtonComponent, IconComponent, ButtonIconComponent, CommonLayoutComponent, CardsComponent, HeaderTextComponent, AlertsComponent],
templateUrl:'./schedule-page.component.html',
styleUrl: './schedule-page.component.scss',
providers: [MessageService]
})
export class SchedulePageComponent implements OnInit {
nextDay() {
throw new Error('Method not implemented.');
}
// Sample data
candidates: any[] = [
{ id: 'CND-101', name: 'Emma Johnson', mobNumber: '7012345678', email: 'emma.johnson@example.com', stage: 'Technical Level 1', totalExp: 3, relevantExp: 2, currentEmployer: 'Google' },
{ id: 'CND-110', name: 'Benjamin Thomas', mobNumber: '7901234567', email: 'benjamin.thomas@example.com', stage: 'Management Level 2', totalExp: 11, relevantExp: 10, currentEmployer: 'Salesforce' }
];
isLoadingInterviewers = true; // To show a loading state in the UI
interviewerError: string | null = null; // To show an error message
// interviewers: PanelMember[] = []; // Now strongly typed
gridError: string | null = null;
// Time slots for the FORM dropdowns
timeSlots = [
{ label: '9:00 AM',  value: '09:00' }, { label: '9:30 AM',  value: '09:30' },
{ label: '10:00 AM', value: '10:00' }, { label: '10:30 AM', value: '10:30' },
{ label: '11:00 AM', value: '11:00' }, { label: '11:30 AM', value: '11:30' },
{ label: '12:00 PM', value: '12:00' }, { label: '12:30 PM', value: '12:30' },
{ label: '1:00 PM',  value: '13:00' }, { label: '1:30 PM',  value: '13:30' },
{ label: '2:00 PM',  value: '14:00' }, { label: '2:30 PM',  value: '14:30' },
{ label: '3:00 PM',  value: '15:00' }, { label: '3:30 PM',  value: '15:30' },
{ label: '4:00 PM',  value: '16:00' }, { label: '4:30 PM',  value: '16:30' },
{ label: '5:00 PM',  value: '17:00' }, { label: '5:30 PM',  value: '17:30' },
{ label: '6:00 PM',  value: '18:00' }
];
// Component state
 interviewers: { id: string, name: string }[] = []; // CORRECT: Declared only ONCE.
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
displayHours: string[] = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
workingHoursStart = 5;
workingHoursEnd = 20;
allScheduledEventsForCurrentDate: any[] = [];
items: any = [];
currentUrl: any;
isGridLoading = false;
@ViewChild('candidateDropdown') candidateDropdown: Dropdown | undefined;
// NEW Properties for Grid UI
myInterview: any;
constructor(private router: Router,private messageService: MessageService,     private interviewPanelService: InterviewPanelService, private route: ActivatedRoute, private candidateService: JdCandidateService
) {
this.currentUrl = this.router.url;
}
  jrId: number = 0;

// this.loadMeetingsForGrid();
ngOnInit() {
      this.jrId = Number(this.route.snapshot.paramMap.get('id'));
       this.candidateService.getCandidatesByJdId(this.jrId).subscribe((response: any) => {
      this.candidates = response.data || [];
      console.log(this.candidates);
    });

  // this.loadMeetingDataForGrid();

  //   const storedCandidate = localStorage.getItem('selectedCandidate');
  // const storedDate = localStorage.getItem('selectedDate');
  // const storedInterviewers = localStorage.getItem('selectedInterviewers');

  // if (storedCandidate) {
  //   this.selectedCandidate = JSON.parse(storedCandidate);
  // }

  // if (storedDate) {
  //   this.selectedDate = new Date(storedDate);  // reconstruct Date object
  // }

  // if (storedInterviewers) {
  //   this.selectedInterviewers = JSON.parse(storedInterviewers);
  // }
// Set up initial UI state
this.currentUrl = this.router.url;
if (this.currentUrl.startsWith('/recruiter-lead')) {
this.items = [{ label: 'Interview', routerLink: '/recruiter-lead/interviews' }, { label: 'Schedule', routerLink: '/recruiter-lead/interviews/Schedule' }, { label: 'Scheduling Page', routerLink: '/recruiter-lead/interviews/Schedule/schedule-page' }];
} else if (this.currentUrl.startsWith('/recruiter')) {
this.items = [{ label: 'Interview', routerLink: '/recruiter/interviews' }, { label: 'Schedule', routerLink: '/recruiter/interviews/Schedule' }, { label: 'Scheduling Page', routerLink: '/recruiter/interviews/Schedule/schedule-page' }];
}
// Load initial data from APIs
this.loadInterviewPanel();

// Initialize component state
this.updateScheduledEventsForCurrentDate(); // Initialize with empty array
this.calculateCurrentMeetingDuration();
}
loadInterviewPanel(): void {
    this.isLoadingInterviewers = true;
    this.interviewerError = null;
    this.interviewPanelService.getPanelMembers().subscribe({
      next: (members: PanelMember[]) => {
        this.interviewers = members.map(member => ({
          id: member.email,
          name: member.name
        }));
        this.isLoadingInterviewers = false;
      },
      error: (err) => {
        this.interviewerError = 'Could not load panel members.';
        this.isLoadingInterviewers = false;
      }
    });
  }


loadMeetingDataForGrid(): void {
   if (!this.selectedInterviewers || this.selectedInterviewers.length === 0) {
      this.scheduledInterviews = [];
      this.updateScheduledEventsForCurrentDate(); // Clear the visual grid
      return;
    }

    this.isGridLoading = true;
    this.gridError = null;
    const dateStr = this.formatDateForApi(this.selectedDate);

    // Create an array of parallel GET requests.
    const apiCalls = this.selectedInterviewers.map(interviewerEmail =>
      this.interviewPanelService.getPanelMemberMeetings(interviewerEmail, dateStr)
    );

    // forkJoin will now receive an array of arrays of meetings, e.g., [[meeting1], [meeting2, meeting3]]
    forkJoin(apiCalls).subscribe({
      next: (results: InterviewMeeting[][]) => {
        
        // Use .flat() to combine the array of arrays into a single list of all meetings.
        const allMeetings: InterviewMeeting[] = results.flat();
        
        // The service now returns the data in the exact format needed by transformApiData.
        this.scheduledInterviews = this.transformApiData(allMeetings);
        
        this.updateScheduledEventsForCurrentDate();
        this.checkForConflicts();
        this.isGridLoading = false;
      },
      error: (err) => {
        this.gridError = 'Could not load schedules.';
        this.isGridLoading = false;
      }
    });
  }
  
  // CORRECTED: This method no longer needs the interviewerEmail parameter,
  // as the data is already included in the meeting objects.
 transformApiData(meetings: InterviewMeeting[]): any[] {
    return meetings.map(meeting => {
      // We no longer need to parse the time, as the backend sends 'HH:mm'
      // And we no longer need to parse the date, as the backend DTO doesn't have it.
      // We will rely on the date filter in updateScheduledEventsForCurrentDate.
      
      return {
        id: meeting.id,
        candidateName: meeting.candidateName,
        // We create a date object for the filter to work. This is a bit of a hack.
        // A better long-term solution is to have the backend return the full date-time string.
        date: this.selectedDate, 
        startTime: meeting.startTime,
        endTime: meeting.endTime,
        interviewers: meeting.interviewerEmails,
        interviewerNames: meeting.interviewerEmails.map(email => this.getInterviewerName(email)),
      };
    });
  }
formatDateForApi(date: Date): string {
const day = ('0' + date.getDate()).slice(-2);
const month = ('0' + (date.getMonth() + 1)).slice(-2);
const year = date.getFullYear();
return `${day}-${month}-${year}`;
}
/**
Helper function to format a Date object into 'HH:mm' string.
*/
  formatTimeForGrid(date: Date): string {
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${hours}:${minutes}`;
  }
onCandidateChange(event: any) {
if (this.selectedCandidate) {
this.resetFormForNewCandidate();
this.checkForConflicts();
} else {
this.resetFormForNewCandidate();
this.conflicts = [];
}
}
onDateChange(): void {
this.loadMeetingDataForGrid();
this.checkForConflicts();
}
onTimeChange() {
this.updateEndTimeSlots();
if (!this.selectedStartTime) {
this.selectedEndTime = '';
}
this.checkForConflicts();
}
selectedInterviewer: string = '';
onInterviewersChange(): void {
console.log('Interviewers changed. Selected:', this.selectedInterviewers);
// --- START OF STATIC DATA TEST ---

// Check if the user specifically selected Jessica Brown's email
// NOTE: Replace 'jessicabrown@RecruitXexp.onmicrosoft.com' with the actual email/id from your dropdown
if (this.selectedInterviewers.includes('jessicabrown@RecruitXexp.onmicrosoft.com')) {
  console.log('STATIC TEST: "Jessica Brown" selected. Injecting sample data.');

  
}
this.loadMeetingDataForGrid();
}
  printMeetingTimes(email: string, date: string): void {
    this.interviewPanelService.getPanelMemberMeetings(email, date)
      .subscribe({
        next: (interviews: InterviewMeeting[]) => { // 'res' is now correctly typed as an array
          
          // No need to access .data.interviews. 'interviews' is already the array.
          if (!interviews || interviews.length === 0) {
            console.log(`No meetings found for ${email} on ${date}.`);
            return;
          }

          interviews.forEach(interview => {
            console.log(`Meeting for ${email}:`);
            console.log('  Start Time:', new Date(interview.startTime).toLocaleString());
            console.log('  End Time:', new Date(interview.endTime).toLocaleString());
          });
        },
        error: (err) => {
          console.error('Failed to load meetings:', err);
        }
      });
  }
getFormattedDate(date: Date): string {
const day = String(date.getDate()).padStart(2, '0');
const month = String(date.getMonth() + 1).padStart(2, '0');
const year = date.getFullYear();
return `${day}-${month}-${year}`;
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
    acceptSummary: 'Interview Scheduled',
    rejectSummary: 'Cancelled',
    acceptDetail: `Interview for ${this.selectedCandidate!.name} on ${new Date(this.selectedDate).toLocaleDateString()} from ${this.selectedStartTime} to ${this.selectedEndTime} has been scheduled!`,
    rejectDetail: 'No changes were made.',
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
isTentativePreviewVisibleInCell(cellHour: string): boolean {
// Guard conditions: no preview if essential data is missing or duration is invalid/zero
if (!this.selectedDate || !this.selectedStartTime || !this.selectedEndTime || this.currentMeetingDuration <= 0) {
return false;
}
const cellStartMinutes = this.timeToMinutes(cellHour);
const cellEndMinutes = cellStartMinutes + 60; // Assuming 1-hour grid cells
const tentativeStartMinutes = this.timeToMinutes(this.selectedStartTime);
const tentativeEndMinutes = this.timeToMinutes(this.selectedEndTime);
// Check for overlap: (StartA < EndB) and (EndA > StartB)
// True if the cell (A) overlaps with the tentative schedule (B)
return cellStartMinutes < tentativeEndMinutes && cellEndMinutes > tentativeStartMinutes;
}
calculateTentativePreviewTopPosition(cellHour: string): string {
if (!this.selectedStartTime) return '0%';
const cellHourStartMinutes = this.timeToMinutes(cellHour);
const tentativeStartMinutes = this.timeToMinutes(this.selectedStartTime);

// Calculate offset from the start of the cellHour
const offsetMinutes = Math.max(0, tentativeStartMinutes - cellHourStartMinutes);

// Convert offset to percentage of cell height (assuming 60 minutes per cell)
const topPercentage = (offsetMinutes / 60) * 100;
return `${topPercentage}%`;
}
calculateTentativePreviewHeight(cellHour: string): string {
if (!this.selectedStartTime || !this.selectedEndTime || this.currentMeetingDuration <= 0) return '0%';
const cellHourStartMinutes = this.timeToMinutes(cellHour);
const cellHourEndMinutes = cellHourStartMinutes + 60; // Cell duration is 60 minutes

const tentativeStartMinutes = this.timeToMinutes(this.selectedStartTime);
const tentativeEndMinutes = this.timeToMinutes(this.selectedEndTime);

// Determine the portion of the tentative slot that falls within this specific cellHour
const effectiveStartInCell = Math.max(tentativeStartMinutes, cellHourStartMinutes);
const effectiveEndInCell = Math.min(tentativeEndMinutes, cellHourEndMinutes);

// Calculate the duration of the preview block within this cell
const durationInCellMinutes = Math.max(0, effectiveEndInCell - effectiveStartInCell);

// Convert duration to percentage of cell height (assuming 60 minutes per cell)
const heightPercentage = (durationInCellMinutes / 60) * 100;
return `${heightPercentage}%`;
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
this.conflicts.push(`${interviewerName} has a conflict: interview with ${existing.candidateName} (${existing.startTime}-${existing.endTime}`);
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
  getInterviewerName(interviewerEmail: string): string {
    const interviewer = this.interviewers.find(i => i.id === interviewerEmail);
    return interviewer ? interviewer.name : interviewerEmail;
  }
timeToMinutes(time: string): number {
if (!time || !time.includes(':')) return 0; // Basic guard
const [hours, minutes] = time.split(':').map(Number);
return hours * 60 + minutes;
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
// 1. Guard Clause: Double-check if we can schedule
if (!this.canSchedule()) {
this.messageService.add({
severity: 'error', summary: 'Cannot Schedule',
detail: 'Please fill all required fields and resolve conflicts.'
});
return;
}
// 2. Find the selected start and end time labels (e.g., "2:30 PM")
const startTimeLabel = this.timeSlots.find(slot => slot.value === this.selectedStartTime)?.label;
const endTimeLabel = this.timeSlots.find(slot => slot.value === this.selectedEndTime)?.label;

if (!startTimeLabel || !endTimeLabel) {
  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid time selected.' });
  return;
}

// 3. Construct the request object for the API
const request: ScheduleInterviewRequest = {
  panelMemberEmails: this.selectedInterviewers,
  date: this.formatDateForApi(this.selectedDate), // "dd-MM-yyyy"
  startTime: startTimeLabel, // "h:mm AM/PM" format
  endTime: endTimeLabel,
  candidateName: this.selectedCandidate!.name,
  interviewLevel: this.selectedCandidate!.stage,
  jobRole: "Senior Software Engineer" // TODO: Get this from a real property if available
};

console.log('--- Scheduling Interview with Request ---', request);

// 4. Call the service
this.interviewPanelService.scheduleInterview(request).subscribe({
  next: (response) => {
    // This is inside the onAccept callback of your existing scheduleAlert
    // We will just show the success message directly here.
    this.messageService.add({ 
      severity: 'success', 
      summary: 'Interview Scheduled', 
      detail: `Interview for  has been scheduled!` 
    });
    
    // 5. Refresh the grid to show the new meeting
    this.loadMeetingDataForGrid();
    this.resetFormFieldsAfterScheduling();
  },
  error: (err) => {
    console.error('Failed to schedule interview', err);
    this.messageService.add({ 
      severity: 'error', 
      summary: 'Scheduling Failed', 
      detail: 'Could not schedule the interview. Please try again.' 
    });
  }
});
//  localStorage.setItem('selectedCandidate', JSON.stringify(this.selectedCandidate));
//   localStorage.setItem('selectedDate', this.selectedDate.toISOString()); // store ISO string
//   localStorage.setItem('selectedInterviewers', JSON.stringify(this.selectedInterviewers));

//   window.location.reload();
// this.loadMeetingDataForGrid();


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
previousDay() { /* ... unchanged (though it should call onDateChange) ... /
const prevDay = new Date(this.selectedDate);
prevDay.setDate(prevDay.getDate() - 1);
this.selectedDate = prevDay;
this.onDateChange(); // Trigger data reload
}
nextDay() { / ... unchanged (though it should call onDateChange) ... */
const nextDay = new Date(this.selectedDate);
nextDay.setDate(nextDay.getDate() + 1);
this.selectedDate = nextDay;
this.onDateChange(); // Trigger data reload
}
// --- NEW Methods for Grid UI ---
// updateScheduledEventsForCurrentDate() {
//   if (this.selectedDate) {
//     const dateStr = this.selectedDate.toDateString();
//     this.allScheduledEventsForCurrentDate = this.scheduledInterviews.filter(
//       interview => new Date(interview.date).toDateString() === dateStr
//     );
//   } else {
//     this.allScheduledEventsForCurrentDate = [];
//   }
// }
 updateScheduledEventsForCurrentDate() {
    console.log(`--- Updating grid for selected date: ${this.selectedDate?.toDateString()} ---`);

    if (this.selectedDate) {
      const selectedDateStr = this.selectedDate.toISOString().split('T')[0];
      
      this.allScheduledEventsForCurrentDate = this.scheduledInterviews.filter(
        interview => {
          const interviewDateStr = (interview.date as Date).toISOString().split('T')[0];
          return interviewDateStr === selectedDateStr;
        }
      );

      console.log(`Found ${this.allScheduledEventsForCurrentDate.length} meetings for this date.`);
      console.log('Final data being sent to grid (this.allScheduledEventsForCurrentDate):', JSON.parse(JSON.stringify(this.allScheduledEventsForCurrentDate)));
    } else {
      this.allScheduledEventsForCurrentDate = [];
    }
  }
formatHourForDisplay(time: string): string { // e.g., "08:00" -> "8am"
const hour = parseInt(time.split(':')[0], 10);
if (hour === 0) return '12am';
if (hour === 12) return '12pm';
if (hour < 12) `return ${hour}am`;
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
formatEventTimeForBlock(time: string): string {
if (!time || !time.includes(':')) return '';
const [h, m] = time.split(':');
let hour = parseInt(h, 10);
const period = hour >= 12 ? 'pm' : 'am';

if (hour === 0) {
  hour = 12; // Midnight case
} else if (hour > 12) {
  hour -= 12; // Convert to 12-hour format
}

return `${hour}:${m}${period}`;
}
trackByInterviewer(index: number, interviewerEmail: string): string {
return interviewerEmail;
}
}