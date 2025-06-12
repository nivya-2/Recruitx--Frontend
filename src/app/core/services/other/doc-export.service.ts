import { Injectable } from '@angular/core';
import { 
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  TabStopPosition, TabStopType, BorderStyle, Table, TableRow, TableCell,
  WidthType, ShadingType, UnderlineType, PageOrientation, convertInchesToTwip
} from 'docx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';

export interface JobDescriptionData {
  skillsMandatory?: string;
  skillsPrimary?: string;
  skillsGood?: string;
  role?: string;
  workLocation?: string;
  relevantExpYears?: string;
  relevantExpMonths?: string;
  qualification?: string;
  totalExpYears?: string;
  totalExpMonths?: string;
  onboardingDate?: string;
  jobDescription?: string;
  jobPurpose?: string;
  jobSpecification?: string;
  additionalInfo?: string;
}
@Injectable({
  providedIn: 'root'
})
export class DocExportService {

  constructor() { }
  exportAsPDF( formData: JobDescriptionData) {
   const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - (margin * 2);
  let yPosition = margin;

  // Helper function to add text with word wrapping
 const addTextWithWrapping = (
  text: string | undefined,
  x: number,
  y: number,
  maxWidth: number,
  fontSize: number = 10
): number => {
  if (!text) return y;

  pdf.setFontSize(fontSize);
  const lines = pdf.splitTextToSize(text, maxWidth);
  const lineHeight = fontSize * 0.35;

  for (const line of lines) {
    if (y + lineHeight > pageHeight - margin) {
      pdf.addPage();
      y = margin;
    }
    pdf.text(line, x, y);
    y += lineHeight;
  }

  return y;
};

  // Helper function to check if new page is needed
  const checkNewPage = (currentY: number, requiredHeight: number = 20) => {
    if (currentY + requiredHeight > pageHeight - margin) {
      pdf.addPage();
      return margin;
    }
    return currentY;
  };

  // Title
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Job Description', margin, yPosition);
  yPosition += 15;

  // Job Role
  yPosition = checkNewPage(yPosition);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Role:', margin, yPosition);
  pdf.setFont('helvetica', 'normal');
  yPosition = addTextWithWrapping(formData.role, margin + 25, yPosition, maxWidth - 25, 12);
  yPosition += 10;

  // Work Location
  yPosition = checkNewPage(yPosition);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Work Location:', margin, yPosition);
  pdf.setFont('helvetica', 'normal');
  yPosition = addTextWithWrapping(formData.workLocation, margin + 35, yPosition, maxWidth - 35, 12);
  yPosition += 10;

  // Experience
  yPosition = checkNewPage(yPosition);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Total Experience:', margin, yPosition);
  pdf.setFont('helvetica', 'normal');
  const totalExp = `${formData.totalExpYears} Years ${formData.totalExpMonths} Months`;
  yPosition = addTextWithWrapping(totalExp, margin + 40, yPosition, maxWidth - 40, 12);
  yPosition += 5;

  pdf.setFont('helvetica', 'bold');
  pdf.text('Relevant Experience:', margin, yPosition);
  pdf.setFont('helvetica', 'normal');
  const relevantExp = `${formData.relevantExpYears} Years ${formData.relevantExpMonths} Months`;
  yPosition = addTextWithWrapping(relevantExp, margin + 45, yPosition, maxWidth - 45, 12);
  yPosition += 10;

  // Qualification
  yPosition = checkNewPage(yPosition);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Qualification:', margin, yPosition);
  pdf.setFont('helvetica', 'normal');
  yPosition = addTextWithWrapping(formData.qualification, margin + 30, yPosition, maxWidth - 30, 12);
  yPosition += 10;

  // Onboarding Date
  yPosition = checkNewPage(yPosition);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Expected Onboarding:', margin, yPosition);
  pdf.setFont('helvetica', 'normal');
  yPosition = addTextWithWrapping(formData.onboardingDate, margin + 45, yPosition, maxWidth - 45, 12);
  yPosition += 15;

  // Skills Section
  yPosition = checkNewPage(yPosition, 30);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Skills & Requirements', margin, yPosition);
  yPosition += 10;

  // Mandatory Skills
  yPosition = checkNewPage(yPosition);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Mandatory Skills:', margin, yPosition);
  pdf.setFont('helvetica', 'normal');
  yPosition = addTextWithWrapping(formData.skillsMandatory, margin + 35, yPosition, maxWidth - 35, 12);
  yPosition += 8;

  // Primary Skills
  yPosition = checkNewPage(yPosition);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Primary Skills:', margin, yPosition);
  pdf.setFont('helvetica', 'normal');
  yPosition = addTextWithWrapping(formData.skillsPrimary, margin + 30, yPosition, maxWidth - 30, 12);
  yPosition += 8;

  // Good to Have Skills
  if (formData.skillsGood) {
    yPosition = checkNewPage(yPosition);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Good to Have:', margin, yPosition);
    pdf.setFont('helvetica', 'normal');
    yPosition = addTextWithWrapping(formData.skillsGood, margin + 30, yPosition, maxWidth - 30, 12);
    yPosition += 15;
  }

  // Job Purpose
  yPosition = checkNewPage(yPosition, 30);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Job Purpose', margin, yPosition);
  yPosition += 8;
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  yPosition = addTextWithWrapping(formData.jobPurpose, margin, yPosition, maxWidth, 12);
  yPosition += 15;

  // Job Description
  yPosition = checkNewPage(yPosition, 30);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Job Description / Duties & Responsibilities', margin, yPosition);
  yPosition += 8;
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  yPosition = addTextWithWrapping(formData.jobDescription, margin, yPosition, maxWidth, 12);
  yPosition += 15;

  // Job Specification
  yPosition = checkNewPage(yPosition, 30);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Job Specification / Skills and Competencies', margin, yPosition);
  yPosition += 8;
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  yPosition = addTextWithWrapping(formData.jobSpecification, margin, yPosition, maxWidth, 12);
  yPosition += 15;

  // Additional Information
  if (formData.additionalInfo) {
    yPosition = checkNewPage(yPosition, 30);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Additional Information', margin, yPosition);
    yPosition += 8;
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    yPosition = addTextWithWrapping(formData.additionalInfo, margin, yPosition, maxWidth, 12);
  }

  pdf.save('JobDescription.pdf');
}


exportAsWord(formData: JobDescriptionData): void {

  // Define consistent styling variables
  const titleFontSize = 32; // 16pt
  const headingFontSize = 28; // 14pt
  const subHeadingFontSize = 24; // 12pt
  const bodyFontSize = 22; // 11pt
  const smallFontSize = 20; // 10pt

  // Helper function to create styled paragraphs
  const createStyledParagraph = (label: string, value: string, isLarge: boolean = false) => {
    return new Paragraph({
      children: [
        new TextRun({
          text: label,
          bold: true,
          size: isLarge ? subHeadingFontSize : bodyFontSize,
          font: "Calibri"
        }),
        new TextRun({
          text: value,
          size: isLarge ? subHeadingFontSize : bodyFontSize,
          font: "Calibri"
        }),
      ],
      spacing: { 
        before: 120,
        after: 120,
        line: 360,
        lineRule: "auto"
      },
      indent: {
        left: convertInchesToTwip(0.2)
      }
    });
  };

  // Helper function for section headers
  const createSectionHeader = (text: string) => {
    return new Paragraph({
      children: [
        new TextRun({
          text: text,
          bold: true,
          size: headingFontSize,
          font: "Calibri",
          color: "2E75B6" // Professional blue color
        }),
      ],
      heading: HeadingLevel.HEADING_1,
      spacing: { 
        before: 400,
        after: 240,
        line: 360
      },
      border: {
        bottom: {
          color: "2E75B6",
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6
        }
      }
    });
  };

  // Helper function for multi-line content
  const createMultiLineParagraph = (content: string) => {
    const lines = content.split('\n').filter(line => line.trim());
    return lines.map(line => 
      new Paragraph({
        children: [
          new TextRun({
            text: line.trim(),
            size: bodyFontSize,
            font: "Calibri"
          }),
        ],
        spacing: { 
          before: 80,
          after: 80,
          line: 320
        },
        indent: {
          left: convertInchesToTwip(0.3)
        }
      })
    );
  };

  // Create the document
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: "Calibri",
            size: bodyFontSize
          },
          paragraph: {
            spacing: {
              line: 360,
              lineRule: "auto"
            }
          }
        }
      }
    },
    sections: [{
      properties: {
        page: {
          margin: {
            top: convertInchesToTwip(1),
            right: convertInchesToTwip(0.8),
            bottom: convertInchesToTwip(1),
            left: convertInchesToTwip(0.8)
          }
        }
      },
      children: [
        // Main Title with professional styling
        new Paragraph({
          children: [
            new TextRun({
              text: "JOB DESCRIPTION",
              bold: true,
              size: titleFontSize,
              font: "Calibri",
              color: "1F4E79",
              allCaps: true
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { 
            before: 200,
            after: 600
          },
          border: {
            top: {
              color: "1F4E79",
              space: 1,
              style: BorderStyle.DOUBLE,
              size: 12
            },
            bottom: {
              color: "1F4E79",
              space: 1,
              style: BorderStyle.DOUBLE,
              size: 12
            }
          }
        }),

        // Basic Information Table
        new Table({
          width: {
            size: 100,
            type: WidthType.PERCENTAGE
          },
          borders: {
            top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
            bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
            left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
            right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
            insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
            insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }
          },
          rows: [
            // Header Row
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "POSITION DETAILS",
                          bold: true,
                          size: subHeadingFontSize,
                          font: "Calibri",
                          color: "FFFFFF"
                        })
                      ],
                      alignment: AlignmentType.CENTER
                    })
                  ],
                  shading: {
                    fill: "2E75B6",
                    type: ShadingType.SOLID
                  },
                  columnSpan: 2
                })
              ]
            }),
            // Role
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "Job Role",
                          bold: true,
                          size: bodyFontSize,
                          font: "Calibri"
                        })
                      ]
                    })
                  ],
                  width: { size: 30, type: WidthType.PERCENTAGE },
                  shading: { fill: "F2F2F2", type: ShadingType.SOLID }
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: formData.role || '',
                          size: bodyFontSize,
                          font: "Calibri"
                        })
                      ]
                    })
                  ],
                  width: { size: 70, type: WidthType.PERCENTAGE }
                })
              ]
            }),
            // Work Location
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "Work Location",
                          bold: true,
                          size: bodyFontSize,
                          font: "Calibri"
                        })
                      ]
                    })
                  ],
                  shading: { fill: "F2F2F2", type: ShadingType.SOLID }
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: formData.workLocation || '',
                          size: bodyFontSize,
                          font: "Calibri"
                        })
                      ]
                    })
                  ]
                })
              ]
            }),
            // Total Experience
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "Total Experience",
                          bold: true,
                          size: bodyFontSize,
                          font: "Calibri"
                        })
                      ]
                    })
                  ],
                  shading: { fill: "F2F2F2", type: ShadingType.SOLID }
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: `${formData.totalExpYears} Years ${formData.totalExpMonths} Months`,
                          size: bodyFontSize,
                          font: "Calibri"
                        })
                      ]
                    })
                  ]
                })
              ]
            }),
            // Relevant Experience
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "Relevant Experience",
                          bold: true,
                          size: bodyFontSize,
                          font: "Calibri"
                        })
                      ]
                    })
                  ],
                  shading: { fill: "F2F2F2", type: ShadingType.SOLID }
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: `${formData.relevantExpYears} Years ${formData.relevantExpMonths} Months`,
                          size: bodyFontSize,
                          font: "Calibri"
                        })
                      ]
                    })
                  ]
                })
              ]
            }),
            // Qualification
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "Qualification",
                          bold: true,
                          size: bodyFontSize,
                          font: "Calibri"
                        })
                      ]
                    })
                  ],
                  shading: { fill: "F2F2F2", type: ShadingType.SOLID }
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: formData.qualification || '',
                          size: bodyFontSize,
                          font: "Calibri"
                        })
                      ]
                    })
                  ]
                })
              ]
            }),
            // Onboarding Date
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "Expected Onboarding",
                          bold: true,
                          size: bodyFontSize,
                          font: "Calibri"
                        })
                      ]
                    })
                  ],
                  shading: { fill: "F2F2F2", type: ShadingType.SOLID }
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: formData.onboardingDate || '',
                          size: bodyFontSize,
                          font: "Calibri"
                        })
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        }),

        // Skills & Requirements Section
        createSectionHeader("SKILLS & REQUIREMENTS"),

        // Skills Table
        new Table({
          width: {
            size: 100,
            type: WidthType.PERCENTAGE
          },
          borders: {
            top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
            bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
            left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
            right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
            insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
            insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" }
          },
          rows: [
            // Mandatory Skills
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "Mandatory Skills",
                          bold: true,
                          size: bodyFontSize,
                          font: "Calibri",
                          color: "D9534F"
                        })
                      ]
                    })
                  ],
                  width: { size: 25, type: WidthType.PERCENTAGE },
                  shading: { fill: "FCF8E3", type: ShadingType.SOLID }
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: formData.skillsMandatory || '',
                          size: bodyFontSize,
                          font: "Calibri"
                        })
                      ]
                    })
                  ],
                  width: { size: 75, type: WidthType.PERCENTAGE }
                })
              ]
            }),
            // Primary Skills
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "Primary Skills",
                          bold: true,
                          size: bodyFontSize,
                          font: "Calibri",
                          color: "5BC0DE"
                        })
                      ]
                    })
                  ],
                  shading: { fill: "E8F4F8", type: ShadingType.SOLID }
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: formData.skillsPrimary || '',
                          size: bodyFontSize,
                          font: "Calibri"
                        })
                      ]
                    })
                  ]
                })
              ]
            }),
            // Good to Have Skills (if exists)
            ...(formData.skillsGood ? [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "Good to Have",
                            bold: true,
                            size: bodyFontSize,
                            font: "Calibri",
                            color: "5CB85C"
                          })
                        ]
                      })
                    ],
                    shading: { fill: "F0F8F0", type: ShadingType.SOLID }
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: formData.skillsGood,
                            size: bodyFontSize,
                            font: "Calibri"
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ] : [])
          ]
        }),

        // Job Purpose Section
        createSectionHeader("JOB PURPOSE"),

        new Paragraph({
          children: [
            new TextRun({
              text: formData.jobPurpose || '',
              size: bodyFontSize,
              font: "Calibri"
            }),
          ],
          spacing: { 
            before: 160,
            after: 160,
            line: 360
          },
          indent: {
            left: convertInchesToTwip(0.3),
            right: convertInchesToTwip(0.2)
          },
          alignment: AlignmentType.JUSTIFIED
        }),

        // Job Description Section
        createSectionHeader("DUTIES & RESPONSIBILITIES"),

        ...createMultiLineParagraph(formData.jobDescription || ''),

        // Job Specification Section
        createSectionHeader("SKILLS & COMPETENCIES"),

        ...createMultiLineParagraph(formData.jobSpecification || ''),

        // Additional Information Section (if exists)
        ...(formData.additionalInfo ? [
          createSectionHeader("ADDITIONAL INFORMATION"),
          
          new Paragraph({
            children: [
              new TextRun({
                text: formData.additionalInfo,
                size: bodyFontSize,
                font: "Calibri",
                italics: true
              }),
            ],
            spacing: { 
              before: 160,
              after: 160,
              line: 360
            },
            indent: {
              left: convertInchesToTwip(0.3),
              right: convertInchesToTwip(0.2)
            },
            alignment: AlignmentType.JUSTIFIED,
            border: {
              left: {
                color: "2E75B6",
                space: 8,
                style: BorderStyle.SINGLE,
                size: 8
              }
            }
          })
        ] : []),

        // Footer with generation date
        new Paragraph({
          children: [
            new TextRun({
              text: `Document generated on: ${new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}`,
              size: smallFontSize,
              font: "Calibri",
              italics: true,
              color: "666666"
            }),
          ],
          spacing: { 
            before: 800,
            after: 160
          },
          alignment: AlignmentType.CENTER,
          border: {
            top: {
              color: "CCCCCC",
              space: 1,
              style: BorderStyle.SINGLE,
              size: 2
            }
          }
        })
      ],
    }],
  });

  // Generate and save the document
  Packer.toBlob(doc).then(blob => {
    saveAs(blob, `JobDescription_${formData.role?.replace(/\s+/g, '_') || 'Position'}_${new Date().toISOString().split('T')[0]}.docx`);
  }).catch(error => {
    console.error('Error generating Word document:', error);
    // You might want to show an error message to the user here
  });
}

}
