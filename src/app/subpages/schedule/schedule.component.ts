import { Component } from '@angular/core';
import { TableComponent } from '../../shared-components/table/table.component';

@Component({
  selector: 'app-schedule',
  imports: [TableComponent],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent {
dataSource: any[] = [ 
    { id: 'JD001', 
      roleTitle: 'Software Engineer',
      deliveryUnit: 'DU1',
      location: 'Bangalore', 
      experience: 5, 
      createdDate: '05-05-2025', 
      assoJr: 'JR2025-112',
      actions:'Schedule',
      },
      {  id: 'JD002', 
        roleTitle: 'UX Designer',
        deliveryUnit: 'DU2',
        location: 'Bangalore', 
        experience: 7, 
        createdDate: '05-05-2025', 
        assoJr: 'JR2025-113',
        actions:'Schedule',

      },
      {  id: 'JD003', 
          roleTitle: 'Sales Manager',
          deliveryUnit: 'DU4',
          location: 'Trivandrum', 
          experience: 9, 
          createdDate: '09-05-2025', 
          assoJr: 'JR2025-114',
          actions:'Schedule',

      },
      {  id: 'JD004', 
            roleTitle: 'Junior HR',
            deliveryUnit: 'DU7',
            location: 'Bangalore', 
            experience: 9, 
            createdDate: '09-05-2025', 
            assoJr: 'JR2025-115',
            actions:'Schedule',

      },
      { id: 'JD005', 
              roleTitle: 'AI Engineer',
              deliveryUnit: 'DU2',
              location: 'Bangalore', 
              experience: 7, 
              createdDate: '05-07-2025', 
              assoJr: 'JR2025-116',
              actions:'Schedule',

            },
            {  id: 'JD006', 
                roleTitle: 'UX Designer',
                deliveryUnit: 'DU2',
                location: 'Bangalore', 
                experience: 7, 
                createdDate: '05-08-2025', 
                assoJr: 'JR2025-117',
                actions:'Schedule',

            },
            {  id: 'JD007', 
              roleTitle: 'UI Designer',
              deliveryUnit: 'DU2',
              location: 'Bangalore', 
              experience: 7, 
              createdDate: '15-05-2025', 
              assoJr: 'JR2025-118',
              actions:'Schedule',

              },
        {  id: 'JD008', 
          roleTitle: 'Data Analyst',
          deliveryUnit: 'DU6',
          location: 'Kochi', 
          experience: 11, 
          createdDate: '25-06-2025', 
          assoJr: 'JR2025-119',
          actions:'Schedule',

          }

    ];
    recruitersIcons=[
      {iconName:'dashboard',size:"32px",iconColour:"red"},
      {iconName:'home',size:"32px",iconColour:"blue"},
      {iconName:'delete',size:"32px",iconColour:"green"}
    ]

    columns: Array<{key: string, label: string, filterable: boolean}> = [
      { key: 'id', label: 'ID',filterable: false },
      { key: 'roleTitle', label: 'Role Title',filterable: true},
      { key: 'deliveryUnit', label: 'Delivery Unit',filterable: true },
      { key: 'location', label: 'Location',filterable: true },
      { key: 'experience', label: 'Experience',filterable: false },
      { key: 'createdDate', label: 'Created Date',filterable: false },
      { key: 'assoJr', label: 'Associated JR',filterable: false },
      { key: 'actions', label: 'Actions',filterable: false }
    ];

    globalFilterFields = this.columns.map(c => c.key).filter(key => key !== 'actions');  

}
