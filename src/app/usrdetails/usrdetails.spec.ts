import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Usrdetails } from './usrdetails';

describe('Usrdetails', () => {
  let component: Usrdetails;
  let fixture: ComponentFixture<Usrdetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Usrdetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Usrdetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
