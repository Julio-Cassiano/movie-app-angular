import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'button[buttonEdit]',
  imports: [FontAwesomeModule],
  templateUrl: './button-edit.html',
  styleUrl: './button-edit.css'
})
export class ButtonEdit {
  @Output() editUser = new EventEmitter<void>();
  pencil = faPencilAlt;


  public emitEdit() {
    this.editUser.emit();
  }
}
