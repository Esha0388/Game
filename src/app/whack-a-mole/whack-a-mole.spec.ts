import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhackAMole } from './whack-a-mole';

describe('WhackAMole', () => {
  let component: WhackAMole;
  let fixture: ComponentFixture<WhackAMole>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhackAMole]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhackAMole);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
