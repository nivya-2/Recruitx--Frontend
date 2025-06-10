import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent, CustomFilterMatchMode } from './table.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { ButtonComponent } from '../../ui/button/button.component';
import { CalendarModule } from 'primeng/calendar';
import { ProgressbarComponent } from '../../ui/progressbar/progressbar.component';
import { FormsModule } from '@angular/forms';
import { FilterService } from 'primeng/api';
import { By } from '@angular/platform-browser';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TableModule,
        InputTextModule,
        ButtonModule,
        PaginatorModule,
        IconField,
        InputIcon,
        CalendarModule,
        FormsModule, TableComponent, ButtonComponent, ProgressbarComponent
      ],
      providers: [FilterService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.columns = [
      { key: 'name', label: 'Name', type: 'string', sortable: true, filterable: true },
      { key: 'date', label: 'Date', type: 'date', sortable: true, filterable: true },
      { key: 'actions', label: 'Actions' }
    ];
    component.dataSource = [
      { name: 'Alice', date: '01/06/2024', actions: ['edit', 'delete'], jrProgress: { current: 3, total: 5 } },
      { name: 'Bob', date: '02/06/2024', actions: ['view'], jrProgress: { current: 2, total: 4 } }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle row click if hover is enabled', () => {
    const spy = jasmine.createSpy('rowClickFn');
    component.hover = true;
    component.rowClickFn = spy;
    component.handleRowClick(component.dataSource[0]);
    expect(spy).toHaveBeenCalledWith(component.dataSource[0]);
  });

  it('should convert valid date string to Date object', () => {
    const date = component.convertToDate('01/06/2024');
    expect(date instanceof Date).toBeTrue();
    expect(date?.getDate()).toBe(1);
    expect(date?.getMonth()).toBe(5); // June is month 5 (0-based)
    expect(date?.getFullYear()).toBe(2024);
  });

  it('should identify valid date values correctly', () => {
    expect(component.isDate('02/06/2024')).toBeTrue();
    expect(component.isDate(new Date())).toBeTrue();
    expect(component.isDate('not a date')).toBeFalse();
  });

  it('should handle action click with valid method', () => {
    const testFn = jasmine.createSpy('action');
    component.actionMethods = { edit: testFn };
    component.handleActionClick('edit', component.dataSource[0]);
    expect(testFn).toHaveBeenCalledWith(component.dataSource[0]);
  });

  it('should handle action click with missing method gracefully', () => {
    spyOn(console, 'warn');
    component.handleActionClick('missing', component.dataSource[0]);
    expect(console.warn).toHaveBeenCalledWith('No method found for action: missing (looking for key: missing)');
  });

  it('should return correct class for file status', () => {
    expect(component.getStatusClass('Uploading')).toBe('processing');
    expect(component.getStatusClass('Completed')).toBe('success');
    expect(component.getStatusClass('Error')).toBe('error');
    expect(component.getStatusClass('Unknown')).toBe('ready');
  });

  it('should register custom date filters', () => {
    const registerSpy = spyOn(TestBed.inject(FilterService), 'register');
    component.registerCustomDateFilters();
    expect(registerSpy).toHaveBeenCalledTimes(3);
  });

  it('should correctly filter dates', () => {
    const filterDate = new Date(2024, 5, 2); // 02/06/2024
    expect(component.filterDate('02/06/2024', filterDate, CustomFilterMatchMode.DATE_IS)).toBeTrue();
    expect(component.filterDate('01/06/2024', filterDate, CustomFilterMatchMode.DATE_BEFORE)).toBeTrue();
    expect(component.filterDate('03/06/2024', filterDate, CustomFilterMatchMode.DATE_AFTER)).toBeTrue();
  });

  it('should compute statusPercentage during data processing', () => {
    component.ngOnInit();
    expect(component.dataSource[0].statusPercentage).toBeCloseTo(60);
    expect(component.dataSource[1].statusPercentage).toBeCloseTo(50);
  });

  it('should restore original order and clear table', () => {
    const tableMock = {
      clear: jasmine.createSpy('clear'),
      reset: jasmine.createSpy('reset'),
      sortOrder: 1,
      sortField: 'name',
      multiSortMeta: [{ field: 'name', order: 1 }],
      first: 2
    } as any;

    component.clear(tableMock);
    expect(tableMock.clear).toHaveBeenCalled();
    expect(tableMock.reset).toHaveBeenCalled();
    expect(tableMock.sortOrder).toBe(0);
    expect(tableMock.sortField).toBe('');
    expect(tableMock.multiSortMeta).toEqual([]);
    expect(tableMock.first).toBe(0);
  });

});
