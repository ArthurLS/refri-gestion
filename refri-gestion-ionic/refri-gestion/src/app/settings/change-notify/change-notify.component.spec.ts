import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeNotifyComponent } from './change-notify.component';

describe('ChangeNotifyComponent', () => {
  let component: ChangeNotifyComponent;
  let fixture: ComponentFixture<ChangeNotifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeNotifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
