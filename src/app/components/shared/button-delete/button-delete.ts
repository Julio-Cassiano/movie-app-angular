import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'button[buttonDelete]',
  imports: [FontAwesomeModule],
  templateUrl: './button-delete.html',
  styleUrl: './button-delete.css'
})
export class ButtonDelete {
  trash = faTrashCan;
}
