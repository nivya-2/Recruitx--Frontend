// import { CommonModule } from '@angular/common';
// import { Component, NgModule, OnInit, ViewChild } from '@angular/core'; // Added ViewChild
// import { FormsModule, NgForm, NgModel } from '@angular/forms';
// import { MessageService } from 'primeng/api';
// import { Button } from 'primeng/button';
// import { Calendar } from 'primeng/calendar';
// import { Dropdown, DropdownModule } from 'primeng/dropdown'; // Imported Dropdown for ViewChild if needed
// import { Message } from 'primeng/message';
// import { MultiSelect } from 'primeng/multiselect';
// import { Tag } from 'primeng/tag';
// import { Toast } from 'primeng/toast';



// @Component({
//   selector: 'app-schedule-page',
//   imports: [Calendar,MultiSelect ,Tag,Button,Toast,Message,DropdownModule,FormsModule,CommonModule ],
//   templateUrl:'./schedule-page.component.html',
//   styleUrl: './schedule-page.component.scss',
//   providers: [MessageService]
// })
// export class SchedulePageComponent implements OnInit {
//   // Sample data (no changes here)
//   candidates: any[] = [
//     { id: 'CND-034', name: 'Nivya Vineeth', mobNumber: '8089888786', email: 'nivya@gmail.com',stage: 'Technical Level 1', totalExp: 4, relevantExp: 3,currentEmployer: 'TCS' },
//     { id: 'CND-035', name: 'Kevin Joby', mobNumber: '9876543210', email: 'kevin@gmail.com',stage: 'Technical Level 2', totalExp: 5, relevantExp: 4,currentEmployer: 'IBM' },
//     { id: 'CND-036', name: 'Anjali Thripunithara', mobNumber: '8765432109', email: 'anjali@gmail.com',stage: 'Management Level 1', totalExp: 3, relevantExp: 2,currentEmployer: 'UST' }
//   ];

//   interviewers: any[] = [
//     { id: 'INT-001', name: 'Kavitha' },
//     { id: 'INT-002', name: 'Jordan' },
//     { id: 'INT-003', name: 'Priya' },
//     { id: 'INT-004', name: 'Rahul' },
//     { id: 'INT-005', name: 'Sarah' }
//   ];

//   timeSlots = [
//     { label: '8:00 AM', value: '08:00' },
//     { label: '8:30 AM', value: '08:30' },
//     { label: '9:00 AM', value: '09:00' },
//     { label: '9:30 AM', value: '09:30' },
//     { label: '10:00 AM', value: '10:00' },
//     { label: '10:30 AM', value: '10:30' },
//     { label: '11:00 AM', value: '11:00' },
//     { label: '11:30 AM', value: '11:30' },
//     { label: '12:00 PM', value: '12:00' },
//     { label: '12:30 PM', value: '12:30' },
//     { label: '1:00 PM', value: '13:00' },
//     { label: '1:30 PM', value: '13:30' },
//     { label: '2:00 PM', value: '14:00' },
//     { label: '2:30 PM', value: '14:30' },
//     { label: '3:00 PM', value: '15:00' },
//     { label: '3:30 PM', value: '15:30' },
//     { label: '4:00 PM', value: '16:00' },
//     { label: '4:30 PM', value: '16:30' },
//     { label: '5:00 PM', value: '17:00' },
//     { label: '5:30 PM', value: '17:30' },
//     { label: '6:00 PM', value: '18:00' },
//     { label: '6:30 PM', value: '18:30' },
//     { label: '7:00 PM', value: '19:00' }
//   ];

//   // Component state
//   // selectedCandidate is now bound to the p-dropdown. Initializing to null for placeholder.
//   selectedCandidate: any | null = null;
//   selectedDate: Date = new Date();
//   selectedStartTime: string = '';
//   selectedEndTime: string = '';
//   selectedInterviewers: string[] = [];
//   scheduledInterviews: any[] = [];
//   conflicts: string[] = [];
//   minDate: Date = new Date();
//   filteredEndTimeSlots: any[] = [];

//   // MODIFICATION: Optional ViewChild for the candidate dropdown if programmatic access is needed.
//   // This can be used to programmatically focus or hide the dropdown, for example.
//   @ViewChild('candidateDropdown') candidateDropdown: Dropdown | undefined;

//   constructor(private messageService: MessageService) {}

//   ngOnInit() {
//     this.initializeSampleData();
//     // MODIFICATION: Removed initial selection of a candidate.
//     // User will now select from the dropdown.
//     // this.selectedCandidate = this.candidates[0]; // Old line, commented out or removed.
//   }

//   initializeSampleData() {
//     const today = new Date();
//     // Sample scheduled interviews remain the same for testing conflicts
//     this.scheduledInterviews = [
//       {
//         id: 'SCH-001',
//         candidateId: 'CND-001',
//         candidateName: 'John Doe', // This candidate is not in the main `candidates` list, for demo purposes
//         date: today,
//         startTime: '11:30',
//         endTime: '12:00',
//         interviewers: ['INT-001'],
//         interviewerNames: ['Kavitha'],
//         duration: 30
//       },
//       {
//         id: 'SCH-002',
//         candidateId: 'CND-002',
//         candidateName: 'Jane Smith', // This candidate is not in the main `candidates` list, for demo purposes
//         date: today,
//         startTime: '14:00',
//         endTime: '15:00',
//         interviewers: ['INT-001'],
//         interviewerNames: ['Kavitha'],
//         duration: 60
//       },
//       {
//         id: 'SCH-003',
//         candidateId: 'CND-003',
//         candidateName: 'Mike Johnson', // This candidate is not in the main `candidates` list, for demo purposes
//         date: today,
//         startTime: '12:00',
//         endTime: '13:00',
//         interviewers: ['INT-002'],
//         interviewerNames: ['Jordan'],
//         duration: 60
//       }
//     ];
//   }

//   // MODIFICATION: Removed the old selectCandidate method.
//   /*
//   selectCandidate(candidate: any) {
//     this.selectedCandidate = candidate;
//     this.resetForm();
//   }
//   */

//   // MODIFICATION: Added onCandidateChange method to handle dropdown selection.
//   /**
//    * Handles the change event from the candidate selection dropdown.
//    * Updates the selected candidate, resets related form fields, and checks for conflicts.
//    * @param event The event object from the p-dropdown, event.value contains the selected candidate.
//    */
//   onCandidateChange(event: any) {
//     // The p-dropdown [(ngModel)] already updates this.selectedCandidate.
//     // This method is primarily for additional logic upon change.
//     // event.value will be the selected candidate object or null if cleared.

//     if (this.selectedCandidate) {
//       // If a candidate is selected, reset other form fields for a fresh schedule setup.
//       this.resetFormForNewCandidate();
//       this.checkForConflicts(); // Check conflicts for the new context
//     } else {
//       // If candidate is deselected (cleared from dropdown)
//       this.resetFormForNewCandidate(); // Reset form
//       this.conflicts = []; // Clear any existing conflicts
//     }

//     // MODIFICATION: Logic to collapse the dropdown after selection (if it's a p-dropdown)
//     // The p-dropdown typically collapses automatically after selection.
//     // If you need to ensure it collapses (e.g., if using [autoDisplayFirst]="false" or other custom scenarios),
//     // you might use ViewChild to access the dropdown instance:
//     // if (this.candidateDropdown) {
//     //   this.candidateDropdown.hide();
//     // }
//   }

//   onDateChange() {
//     this.checkForConflicts();
//   }

//   onTimeChange() {
//     this.updateEndTimeSlots();
//     // If selectedStartTime is cleared, also clear selectedEndTime
//     if (!this.selectedStartTime) {
//         this.selectedEndTime = '';
//     }
//     this.checkForConflicts();
//   }

//   onInterviewersChange() {
//     this.checkForConflicts();
//   }

//   updateEndTimeSlots() {
//     if (!this.selectedStartTime) {
//       this.filteredEndTimeSlots = [];
//       this.selectedEndTime = ''; // Also clear end time if start time is not set
//       return;
//     }

//     const startIndex = this.timeSlots.findIndex(slot => slot.value === this.selectedStartTime);
//     // Filter to include only slots *after* the selected start time
//     this.filteredEndTimeSlots = this.timeSlots.slice(startIndex + 1);

//     // If the current selectedEndTime is no longer valid, clear it
//     if (this.selectedEndTime && !this.filteredEndTimeSlots.find(slot => slot.value === this.selectedEndTime)) {
//         this.selectedEndTime = '';
//     }
//   }

//   checkForConflicts() {
//     this.conflicts = [];
    
//     // MODIFICATION: Also ensure a candidate is selected before checking conflicts related to interviewers
//     if (!this.selectedCandidate || !this.selectedDate || !this.selectedStartTime || !this.selectedEndTime || this.selectedInterviewers.length === 0) {
//       return;
//     }

//     const selectedDateStr = this.selectedDate.toDateString();
    
//     for (const interviewerId of this.selectedInterviewers) {
//       const interviewerName = this.getInterviewerName(interviewerId);
//       const existingInterviews = this.scheduledInterviews.filter(interview => 
//         interview.date.toDateString() === selectedDateStr &&
//         interview.interviewers.includes(interviewerId)
//       );

//       for (const existing of existingInterviews) {
//         if (this.hasTimeConflict(this.selectedStartTime, this.selectedEndTime, existing.startTime, existing.endTime)) {
//           // MODIFICATION: Make conflict message more specific if the conflict is with the *currently selected* candidate (e.g. editing an existing interview - not applicable here yet but good practice)
//           // For now, the existing message is fine.
//           this.conflicts.push(`${interviewerName} has a conflict: interview with ${existing.candidateName} (${existing.startTime}-${existing.endTime})`);
//         }
//       }
//     }
//   }

//   hasTimeConflict(start1: string, end1: string, start2: string, end2: string): boolean {
//     const start1Minutes = this.timeToMinutes(start1);
//     const end1Minutes = this.timeToMinutes(end1);
//     const start2Minutes = this.timeToMinutes(start2);
//     const end2Minutes = this.timeToMinutes(end2);

//     // True if (StartA < EndB) and (EndA > StartB)
//     return (start1Minutes < end2Minutes && end1Minutes > start2Minutes);
//   }

//   timeToMinutes(time: string): number {
//     const [hours, minutes] = time.split(':').map(Number);
//     return hours * 60 + minutes;
//   }

//   getInterviewerName(interviewerId: string): string {
//     const interviewer = this.interviewers.find(i => i.id === interviewerId);
//     return interviewer ? interviewer.name : 'Unknown Interviewer';
//   }

//   getInterviewerSchedule(interviewerId: string): any[] {
//     const schedule: any[] = [];
//     if (!this.selectedDate) return schedule; // Guard clause if selectedDate is null

//     const selectedDateStr = this.selectedDate.toDateString();
    
//     const interviews = this.scheduledInterviews.filter(interview => 
//       interview.date.toDateString() === selectedDateStr &&
//       interview.interviewers.includes(interviewerId)
//     );

//     for (const timeSlot of this.timeSlots) {
//       // Calculate end time for the current slot (assuming 30-min slots for display purposes here)
//       // This part determines the "block" in the UI for each time slot.
//       const currentSlotStartMinutes = this.timeToMinutes(timeSlot.value);
//       let slotEndTimeValue: string;
//       const nextSlotIndex = this.timeSlots.findIndex(slot => slot.value === timeSlot.value) + 1;
//       if (nextSlotIndex < this.timeSlots.length) {
//         slotEndTimeValue = this.timeSlots[nextSlotIndex].value;
//       } else {
//         // For the last slot, determine a logical end (e.g., 30 mins after its start)
//         const lastSlotDate = new Date(`1970-01-01T${timeSlot.value}:00`);
//         lastSlotDate.setMinutes(lastSlotDate.getMinutes() + 30);
//         slotEndTimeValue = `${String(lastSlotDate.getHours()).padStart(2, '0')}:${String(lastSlotDate.getMinutes()).padStart(2, '0')}`;
//       }

//       const slot: any = {
//         start: timeSlot.value,
//         end: slotEndTimeValue, // This 'end' is for the individual UI slot representation
//         label: timeSlot.label, // e.g., "8:00 AM"
//         isBooked: false,
//         bookingDetails: null
//       };

//       // Check if this time slot is covered by any existing interview for this interviewer
//       for (const interview of interviews) {
//         const interviewStartMinutes = this.timeToMinutes(interview.startTime);
//         const interviewEndMinutes = this.timeToMinutes(interview.endTime);

//         // A slot is considered booked if its start time falls within an existing interview's duration
//         if (currentSlotStartMinutes >= interviewStartMinutes && currentSlotStartMinutes < interviewEndMinutes) {
//           slot.isBooked = true;
//           slot.bookingDetails = {
//             candidateName: interview.candidateName,
//             startTime: interview.startTime,
//             endTime: interview.endTime
//           };
//           break; // Found a booking for this slot, no need to check further
//         }
//       }
//       schedule.push(slot);
//     }
//     return schedule;
//   }

//   getSlotClass(slot: any): string {
//     // MODIFICATION: Simplified slot class logic based on isBooked
//     if (slot.isBooked) {
//       // You can differentiate between 'occupied' and 'interview' if needed,
//       // but for now, 'interview' implies it's occupied.
//       return 'occupied interview'; 
//     }
//     return ''; // Default class for free slots
//   }

//   canSchedule(): boolean {
//     // The check for schedulingForm.invalid and selectedCandidate is now in the HTML [disabled] binding.
//     // This method now focuses on logical conditions not covered by basic form validation.
//     return !!(
//       this.selectedCandidate && // Ensure a candidate object is selected
//       this.selectedDate &&
//       this.selectedStartTime &&
//       this.selectedEndTime &&
//       this.selectedInterviewers.length > 0 &&
//       this.conflicts.length === 0
//     );
//   }

//   scheduleInterview() {
//     // The button is already disabled if `canSchedule()` is false or form is invalid.
//     // This check acts as a final safeguard.
//     if (!this.canSchedule()) {
//       this.messageService.add({
//         severity: 'error',
//         summary: 'Cannot Schedule',
//         detail: 'Please fill all required fields, select a candidate, and resolve conflicts.'
//       });
//       return;
//     }

//     const newInterview: any = {
//       id: 'SCH-' + Date.now(),
//       candidateId: this.selectedCandidate!.id, // `selectedCandidate` is checked in `canSchedule`
//       candidateName: this.selectedCandidate!.name,
//       date: new Date(this.selectedDate), // Ensure it's a new Date object
//       startTime: this.selectedStartTime,
//       endTime: this.selectedEndTime,
//       interviewers: [...this.selectedInterviewers],
//       interviewerNames: this.selectedInterviewers.map(id => this.getInterviewerName(id)),
//       duration: this.timeToMinutes(this.selectedEndTime) - this.timeToMinutes(this.selectedStartTime)
//     };

//     this.scheduledInterviews.push(newInterview);

//     this.messageService.add({
//       severity: 'success',
//       summary: 'Interview Scheduled',
//       detail: `Interview for ${this.selectedCandidate!.name} on ${this.selectedDate.toLocaleDateString()} from ${this.selectedStartTime} to ${this.selectedEndTime} has been scheduled.`
//     });

//     // MODIFICATION: Decide if selectedCandidate should be cleared after scheduling
//     // If you want the user to select a new candidate for the next schedule:
//     // this.selectedCandidate = null; 
//     // For now, let's keep the candidate selected, but reset the time/interviewers.
//     this.resetFormFieldsAfterScheduling();
//     this.checkForConflicts(); // Re-check conflicts, though should be none for the new empty form
//   }

//   /**
//    * Resets form fields related to time and interviewers.
//    * Called when a new candidate is selected or after an interview is scheduled.
//    */
//   resetFormForNewCandidate() {
//     this.selectedStartTime = '';
//     this.selectedEndTime = '';
//     this.selectedInterviewers = [];
//     this.conflicts = [];
//     this.filteredEndTimeSlots = [];
//     // Note: We are not resetting selectedDate here, user might want to schedule multiple for same day.
//     // We are also not resetting selectedCandidate, as this function is called *because* candidate changed or an operation for the current candidate finished.
//   }

//   /**
//    * Resets only the time and interviewer fields, typically after a successful schedule.
//    * Keeps the selected candidate and date.
//    */
//   resetFormFieldsAfterScheduling() {
//     this.selectedStartTime = '';
//     this.selectedEndTime = '';
//     this.selectedInterviewers = []; // Keep or clear interviewers based on preference
//     this.conflicts = [];
//     this.filteredEndTimeSlots = [];
//   }


//   previousDay() {
//     const prevDay = new Date(this.selectedDate);
//     prevDay.setDate(prevDay.getDate() - 1);
//     this.selectedDate = prevDay;
//     this.checkForConflicts(); // Re-check conflicts for the new date
//   }

//   nextDay() {
//     const nextDay = new Date(this.selectedDate);
//     nextDay.setDate(nextDay.getDate() + 1);
//     this.selectedDate = nextDay;
//     this.checkForConflicts(); // Re-check conflicts for the new date
//   }

//   getColumnsClass(): string {
//     const count = this.selectedInterviewers.length;
//     if (count === 0 && !this.selectedCandidate) return ''; // No columns if no candidate/interviewers
//     if (count === 0 && this.selectedCandidate) return 'single-column'; // Or some other default if you want to show empty state in a column

//     switch(count) {
//       case 1: return 'single-column';
//       case 2: return 'two-columns';
//       case 3: return 'three-columns';
//       default: return ''; // Or 'single-column' if at least one interviewer selected, up to 3
//     }
//   }
// }


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

@Component({
  selector: 'app-schedule-page',
  imports: [Calendar, MultiSelect, Tag, Button, Toast, Message, DropdownModule, FormsModule, CommonModule, ButtonComponent, IconComponent, ButtonIconComponent],
  templateUrl:'./schedule-page.component.html',
  styleUrl: './schedule-page.component.scss',
  providers: [MessageService]
})
export class SchedulePageComponent implements OnInit {
  // Sample data
  candidates: any[] = [
    { id: 'CND-034', name: 'Nivya Vineeth', mobNumber: '8089888786', email: 'nivya@gmail.com',stage: 'Technical Level 1', totalExp: 4, relevantExp: 3,currentEmployer: 'TCS' },
    { id: 'CND-035', name: 'Kevin Joby', mobNumber: '9876543210', email: 'kevin@gmail.com',stage: 'Technical Level 2', totalExp: 5, relevantExp: 4,currentEmployer: 'IBM' },
    { id: 'CND-036', name: 'Anjali Thripunithara', mobNumber: '8765432109', email: 'anjali@gmail.com',stage: 'Management Level 1', totalExp: 3, relevantExp: 2,currentEmployer: 'UST' }
  ];

  interviewers: any[] = [
    { id: 'INT-001', name: 'Kavitha' },
    { id: 'INT-002', name: 'Jordan' },
    { id: 'INT-003', name: 'Priya' },
    // { id: 'INT-004', name: 'Rahul' }, // Keep it to 3 for easier testing with the new grid
    // { id: 'INT-005', name: 'Sarah' }
  ];

  // Time slots for the FORM dropdowns
  timeSlots = [
    { label: '8:00 AM', value: '08:00' }, { label: '8:30 AM', value: '08:30' },
    { label: '9:00 AM', value: '09:00' }, { label: '9:30 AM', value: '09:30' },
    { label: '10:00 AM', value: '10:00' }, { label: '10:30 AM', value: '10:30' },
    { label: '11:00 AM', value: '11:00' }, { label: '11:30 AM', value: '11:30' },
    { label: '12:00 PM', value: '12:00' }, { label: '12:30 PM', value: '12:30' },
    { label: '1:00 PM', value: '13:00' }, { label: '1:30 PM', value: '13:30' },
    { label: '2:00 PM', value: '14:00' }, { label: '2:30 PM', value: '14:30' },
    { label: '3:00 PM', value: '15:00' }, { label: '3:30 PM', value: '15:30' },
    { label: '4:00 PM', value: '16:00' }, { label: '4:30 PM', value: '16:30' },
    { label: '5:00 PM', value: '17:00' }, { label: '5:30 PM', value: '17:30' },
    { label: '6:00 PM', value: '18:00' }, { label: '6:30 PM', value: '18:30' },
    { label: '7:00 PM', value: '19:00' }
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
  workingHoursEnd = 17;  // 5 PM (exclusive, so up to 16:xx)
  allScheduledEventsForCurrentDate: any[] = [];
myInterview: any;


  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.initializeSampleData();
    this.updateScheduledEventsForCurrentDate();
    this.calculateCurrentMeetingDuration(); // Calculate initial duration (likely 0)
    // Load events for the initial date
  }

  initializeSampleData() {
    const today = new Date();
    this.scheduledInterviews = [
      // Event for Nivya with Kavitha (shows light purple)
      {
        id: 'SCH-001', candidateId: 'CND-034', candidateName: 'Nivya Vineeth', date: new Date(today),
        startTime: '11:30', endTime: '12:00', interviewers: ['INT-001'], interviewerNames: ['Kavitha']
      },
      // Event for Kevin with Jordan (shows light purple)
      {
        id: 'SCH-002', candidateId: 'CND-035', candidateName: 'Kevin Joby', date: new Date(today),
        startTime: '12:00', endTime: '13:00', interviewers: ['INT-002'], interviewerNames: ['Jordan']
      },
      // Event for "Other Candidate" with Kavitha (shows darker purple)
      {
        id: 'SCH-003', candidateId: 'CND-999', candidateName: 'Other Candidate A', date: new Date(today),
        startTime: '14:00', endTime: '15:00', interviewers: ['INT-001'], interviewerNames: ['Kavitha']
      },
      // Event for "Other Candidate" with Jordan spanning multiple grid cells
      {
        id: 'SCH-004', candidateId: 'CND-888', candidateName: 'Other Candidate B', date: new Date(today),
        startTime: '10:00', endTime: '11:30', interviewers: ['INT-002'], interviewerNames: ['Jordan']
      },
       // Event for Anjali with Priya
       {
        id: 'SCH-005', candidateId: 'CND-036', candidateName: 'Anjali T', date: new Date(today),
        startTime: '09:00', endTime: '09:30', interviewers: ['INT-003'], interviewerNames: ['Priya']
      },
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