import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtransactionComponent } from './newtransaction.component';

describe('NewtransactionComponent', () => {
  let component: NewtransactionComponent;
  let fixture: ComponentFixture<NewtransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewtransactionComponent]
    });
    fixture = TestBed.createComponent(NewtransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
