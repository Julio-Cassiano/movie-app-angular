import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'button[buttonEdit]',
  imports: [FontAwesomeModule],
  templateUrl: './button-edit.html',
  styleUrl: './button-edit.css'
})
export class ButtonEdit {
  pencil = faPencilAlt;
}
