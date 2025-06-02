import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignComponent } from './assign.component';
import { By } from '@angular/platform-browser';
describe('AssignComponent', () => {
  let component: AssignComponent;
  let fixture: ComponentFixture<AssignComponent>;

  const mockTeamList = [
    { fullName: 'Alice Smith', role: 'Developer' },
    { fullName: 'Bob Johnson', role: 'Designer' },
    { fullName: 'Charlie Brown', role: 'Manager' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignComponent);
    component = fixture.componentInstance;
    component.teamList = mockTeamList;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should filter team list based on search text', () => {
    component.searchText = 'alice';
    const filtered = component.filteredTeamList();
    expect(filtered.length).toBe(1);
    expect(filtered[0].fullName).toBe('Alice Smith');

    component.searchText = 'john';
    const filtered2 = component.filteredTeamList();
    expect(filtered2.length).toBe(1);
    expect(filtered2[0].fullName).toBe('Bob Johnson');

    component.searchText = 'xyz';
    const filtered3 = component.filteredTeamList();
    expect(filtered3.length).toBe(0);
  });

  it('should emit selected member and close popover', () => {
    spyOn(component.memberSelected, 'emit');
    // Mock popover with hide method
    component.op = { hide: jasmine.createSpy('hide') } as any;

    const selected = mockTeamList[1];
    component.selectMember(selected);

    expect(component.selectedMember).toBe(selected);
    expect(component.memberSelected.emit).toHaveBeenCalledWith(selected);
    expect(component.op.hide).toHaveBeenCalled();
  });

  it('should toggle popover on open', () => {
    const mockEvent = new Event('click');
    component.op = { toggle: jasmine.createSpy('toggle') } as any;

    component.open(mockEvent);
    expect(component.op.toggle).toHaveBeenCalledWith(mockEvent);
  });

});
