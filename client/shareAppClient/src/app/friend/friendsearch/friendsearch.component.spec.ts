import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsearchComponent } from './friendsearch.component';

describe('FriendsearchComponent', () => {
  let component: FriendsearchComponent;
  let fixture: ComponentFixture<FriendsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
