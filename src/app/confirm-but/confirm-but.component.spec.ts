import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmButComponent } from './confirm-but.component';

describe('ConfirmButComponent', () => {
  let component: ConfirmButComponent;
  let fixture: ComponentFixture<ConfirmButComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmButComponent]
    });
    fixture = TestBed.createComponent(ConfirmButComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
