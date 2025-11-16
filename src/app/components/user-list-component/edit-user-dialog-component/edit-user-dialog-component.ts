import { Component, input, OnInit, Signal } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CreatingOrEditingUser, UserModel } from '../../../user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user-dialog-component',
  imports: [FormsModule],
  templateUrl: './edit-user-dialog-component.html',
  styleUrl: './edit-user-dialog-component.css'
})
export class EditUserDialogComponent implements OnInit {
  private initialUserData: Signal<UserModel | undefined>;
  public userData!: CreatingOrEditingUser;

  creatingUser = input<boolean | undefined>();

  constructor(private userService: UserService){
    this.initialUserData = userService.editingUser();
  }

  ngOnInit(): void {
    this.userData = {
        name: '', 
        username: '',
        email: '',
        birthDate: '',
        password: ''
      }

    const currentUserData = this.initialUserData();

    if(currentUserData) {
      this.userData = {...currentUserData, password: ''};
    }
  }

  onCloseDialog() {
    this.userService.closeEditModal();
  }

  sendEditedData() {
    this.userService.sendEditedUser(this.initialUserData()!.id, this.userData)
      .subscribe({
        next: (userFromApi) => {
          this.userService.refreshUsers();
        },
        error: (err) => {
          console.log("porra", err);
        }
      });

      this.onCloseDialog();
  }

  sendNewUser() {
    this.userService.sendNewUser(this.userData)
      .subscribe({
        next: () => {
          this.userService.refreshUsers();
        },
        error: (err) => {
          console.log("erro: ", err)
        }
      })

      this.onCloseDialog();
  }
}
