import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrienddashboardComponent } from './frienddashboard.component';

describe('FrienddashboardComponent', () => {
  let component: FrienddashboardComponent;
  let fixture: ComponentFixture<FrienddashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrienddashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrienddashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
