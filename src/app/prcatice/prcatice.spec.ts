import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Prcatice } from './prcatice';

describe('Prcatice', () => {
  let component: Prcatice;
  let fixture: ComponentFixture<Prcatice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Prcatice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Prcatice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
