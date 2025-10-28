import { Component, computed, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowTurnUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'button[buttonAdd]',
  imports: [FontAwesomeModule],
  templateUrl: './button-add.html',
  styleUrl: './button-add.css'
})
export class ButtonAdd {
  @Input({required: true}) content!: string;
  arrow = faArrowTurnUp;

}
