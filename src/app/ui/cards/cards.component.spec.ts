import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CardsComponent } from './cards.component';
import { By } from '@angular/platform-browser';

describe('CardsComponent', () => {
  let fixture: ComponentFixture<CardsComponent>;
  let component: CardsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values for width and height', () => {
    expect(component.width).toBe('100%');
    expect(component.height).toBe('auto');
  });

  it('should update width and height inputs correctly', () => {
    component.width = '300px';
    component.height = '150px';
    fixture.detectChanges();
    expect(component.width).toBe('300px');
    expect(component.height).toBe('150px');
  });

});

// Extra test for projected content
@Component({
  standalone: true,
  imports: [CardsComponent],
  template: `<app-cards><div class="projected">Hello!</div></app-cards>`
})
class TestHostComponent { }


describe('CardsComponent (Content Projection)', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();


    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should project content inside p-card', () => {
    const projected = fixture.debugElement.query(By.css('.projected'));
    expect(projected.nativeElement.textContent).toContain('Hello!');
  });
});
