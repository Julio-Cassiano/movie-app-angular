import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDelete } from './button-delete';

describe('ButtonDelete', () => {
  let component: ButtonDelete;
  let fixture: ComponentFixture<ButtonDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonDelete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
