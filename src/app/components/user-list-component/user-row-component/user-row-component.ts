import { Component, input, Signal } from '@angular/core';
import { UserModel } from '../../../user.model';
import { UserService } from '../../../services/user.service';
import { DatePipe } from '@angular/common';
import { ButtonDelete } from '../../shared/button-delete/button-delete';
import { ButtonEdit } from '../../shared/button-edit/button-edit';

@Component({
  selector: 'tr[userRow]',
  imports: [DatePipe, ButtonDelete, ButtonEdit],
  templateUrl: './user-row-component.html',
  styleUrl: './user-row-component.css'
})
export class UserRowComponent {
  user = input.required<UserModel>();
  public isAddingOrEditingUser: Signal<boolean>;

  constructor(private userService: UserService) {
    this.isAddingOrEditingUser = this.userService.isAddingOrEditingUser();
  }

  editUser(user: UserModel) {
    this.userService.openEditModal();
    this.userService.editUser(user);
  }
}
