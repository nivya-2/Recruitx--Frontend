// export interface EmailTemplate {
//   id: string;
//   name: string;
//   type: 'Candidate' | 'Recruiter' | 'Panel';
//   category:string;
//   subject?: string;
//   content?: string;
// }
//  export const EMAIL_TEMPLATES: Record<string, EmailTemplate[]> = {
//     "Candidates": [
//     {
//       id: "screening-mail",
//       name: "Screening Mail",
//       type: "Candidate",
//       category: "Candidate",
//       subject: "Initial Screening for {{job_title}} Position",
//       content: `Dear {{candidate_name}},

// Thank you for your interest in the {{job_title}} role at {{company_name}}.

// We have reviewed your application and would like to schedule a quick phone screening to get to know you better and share more about the opportunity.

// Please confirm your availability for a 15-minute call with our recruiter, {{recruiter_name}}, on {{screening_date}} at {{screening_time}}.

// We look forward to speaking with you!

// Best regards,
// {{company_name}} Recruitment Team`
//     },
//     {
//       id: "interview-invitation",
//       name: "Interview Invitation",
//       type: "Candidate",
//       category: "Candidate",
//       subject: "Interview Invitation for {{job_title}} Position",
//       content: `Dear {{candidate_name}},

// Thank you for applying to the {{job_title}} position at {{company_name}}. We were impressed with your profile and would like to invite you for an interview.

// Interview Details:
// - Date: {{interview_date}}
// - Time: {{interview_time}}
// - Location: {{interview_location}}
// - Interviewer(s): {{interviewer_names}}

// Please confirm your availability by replying to this email or contacting {{recruiter_name}} at {{recruiter_email}}.

// Looking forward to meeting you!

// Regards,
// {{company_name}} Recruitment Team`
//     },
//     {
//       id: "job-offer",
//       name: "Job Offer",
//       type: "Candidate",
//       category: "Candidate",
//       subject: "Job Offer: {{job_title}} at {{company_name}}",
//       content: `Dear {{candidate_name}},

// We are excited to offer you the position of {{job_title}} at {{company_name}}!

// Here are the details:
// - Salary: {{salary}}
// - Start Date: {{start_date}}
// - Benefits: {{benefits_package}}
// - Reporting Manager: {{manager_name}}

// To accept, please sign and return the offer letter by {{response_deadline}}.

// If you have any questions, contact {{hr_contact}} at {{hr_email}}.

// We hope you’ll join our team!

// Warm regards,
// {{hiring_manager}}
// {{company_name}}`
//     },
//     {
//       id: "rejection-mail",
//       name: "Rejection Mail",
//       type: "Candidate",
//       category: "Candidate",
//       subject: "Your Application for {{job_title}} at {{company_name}}",
//       content: `Dear {{candidate_name}},

// Thank you for taking the time to interview for the {{job_title}} position at {{company_name}}.

// After careful consideration, we regret to inform you that we will not be moving forward with your application at this time.

// We appreciate your interest in our company and encourage you to apply for future openings that match your skills and experience.

// Wishing you all the best in your job search.

// Sincerely,
// {{recruiter_name}}
// {{company_name}} Recruitment Team`
//     },
//     {
//       id: "onboarding-mail",
//       name: "Onboarding Mail",
//       type: "Candidate",
//       category: "Candidate",
//       subject: "Welcome to {{company_name}} – Your Onboarding Details",
//       content: `Dear {{employee_name}},

// Welcome aboard!

// We are thrilled to have you join us as a {{role}}. Your start date is {{start_date}}.

// Please complete the following before your first day:
// - Fill out the onboarding documents
// - Set up your company email account
// - Complete mandatory training sessions

// You will be reporting to {{manager_name}} and your workstation will be at {{desk_location}}.

// For questions, contact {{hr_contact}} at {{hr_email}}.

// We look forward to working with you!

// Best regards,
// {{company_name}} HR Team`
//     }
//   ],
//   "Recruiters": [
//     {
//       id: "recruiter-invitation",
//       name: "Recruiter Invitation",
//       type: "Recruiter",
//       category: "Recruiter",
//       subject: "Invitation to Join RecruitX as a Recruiter",
//       content: `Dear {{recruiter_name}},

// You have been added to RecruitX as a recruiter for {{company_name}}.

// To get started, please activate your account by clicking the link below:
// {{activation_link}}

// If you have questions, feel free to reach out to {{admin_contact}} at {{admin_email}}.

// Welcome aboard!

// Regards,
// RecruitX Admin Team`
//     },
//     {
//       id: "recruiter-inactivation",
//       name: "Recruiter Deactivation Mail",
//       type: "Recruiter",
//       category: "Recruiter",
//       subject: "Your RecruitX Account Has Been Inactivated",
//       content: `Dear {{recruiter_name}},

// We would like to inform you that your recruiter access to RecruitX has been inactivated as of {{inactivation_date}}.

// If you believe this was a mistake or have questions, please contact {{admin_contact}} at {{admin_email}}.

// Thank you for your contributions to the recruitment process.

// Sincerely,
// RecruitX Admin Team`
//     }
//   ],
//   "Interview Panel": [
//     {
//       id: "panel-invitation",
//       name: "Interview Invitation",
//       type: "Panel",
//       category: "Panel",
//       subject: "Panel Interview Invitation – {{job_title}} Candidate",
//       content: `Dear {{panel_member_name}},

// You are invited to participate in a panel interview for the {{job_title}} position.

// Details:
// - Candidate: {{candidate_name}}
// - Date: {{interview_date}}
// - Time: {{interview_time}}
// - Location/Link: {{interview_link}}
// - Panel Members: {{panel_list}}

// Please review the candidate's profile beforehand and arrive a few minutes early.

// Let us know if you're unavailable.

// Best regards,
// {{recruiter_name}}`
//     }
//   ]
// };