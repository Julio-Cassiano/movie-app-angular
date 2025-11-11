import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMovieDialog } from './edit-movie-dialog';

describe('EditMovieDialog', () => {
  let component: EditMovieDialog;
  let fixture: ComponentFixture<EditMovieDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMovieDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMovieDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
