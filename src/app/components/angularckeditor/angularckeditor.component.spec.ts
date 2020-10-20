import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularckeditorComponent } from './angularckeditor.component';

describe('AngularckeditorComponent', () => {
  let component: AngularckeditorComponent;
  let fixture: ComponentFixture<AngularckeditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularckeditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularckeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
