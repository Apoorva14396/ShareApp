import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedfilesComponent } from './receivedfiles.component';

describe('ReceivedfilesComponent', () => {
  let component: ReceivedfilesComponent;
  let fixture: ComponentFixture<ReceivedfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivedfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
