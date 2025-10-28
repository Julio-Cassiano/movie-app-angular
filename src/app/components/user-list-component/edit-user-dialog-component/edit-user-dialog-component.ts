import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-edit-user-dialog-component',
  imports: [],
  templateUrl: './edit-user-dialog-component.html',
  styleUrl: './edit-user-dialog-component.css'
})
export class EditUserDialogComponent {
  constructor(private userService: UserService){}

  onCloseDialog() {
    this.userService.closeEditModal();
  }
}
