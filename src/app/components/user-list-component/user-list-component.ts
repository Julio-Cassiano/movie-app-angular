import { Component, OnInit, Signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../user.model';
import { ButtonAdd } from "../shared/button-add/button-add";
import { EditUserDialogComponent } from './edit-user-dialog-component/edit-user-dialog-component'
import { UserRowComponent } from './user-row-component/user-row-component';

@Component({
  selector: 'app-user-list-component',
  imports: [ButtonAdd, EditUserDialogComponent, UserRowComponent],
  templateUrl: './user-list-component.html',
  styleUrl: './user-list-component.css'
})

export class UserListComponent implements OnInit {
  public users: Signal<UserModel[]>;
  public isEditingUser: Signal<boolean>;
  public isCreatingUser: Signal<boolean>;
  
  constructor(private userService: UserService){
    this.users = this.userService.users;
    this.isEditingUser = this.userService.isEditingUser();
    this.isCreatingUser = userService.isCreatingUser();
  }

  ngOnInit(): void {
    this.userService.fetchUsers();
  }

  public refreshUsers(): void {
    this.userService.refreshUsers();
  }

  public createUser() {
    this.userService.createUser();
  }

}
