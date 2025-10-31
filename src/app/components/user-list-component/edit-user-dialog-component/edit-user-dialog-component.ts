import { Component, OnInit, Signal } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CreatingUser, UserModel } from '../../../user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user-dialog-component',
  imports: [FormsModule],
  templateUrl: './edit-user-dialog-component.html',
  styleUrl: './edit-user-dialog-component.css'
})
export class EditUserDialogComponent implements OnInit {
  public editedUser!: CreatingUser;
  private initialUserData: Signal<UserModel | undefined>;

  constructor(private userService: UserService){
    this.initialUserData = userService.editingUser();
  }

  ngOnInit(): void {
    this.editedUser = {
        name: '', 
        username: '',
        email: '',
        birthDate: '',
        password: ''
      }

    const currentUserData = this.initialUserData();

    if(currentUserData) {
      this.editedUser = {...currentUserData, password: ''};

    }
  }

  onCloseDialog() {
    this.userService.closeEditModal();
  }

  sendEditedData() {
    console.log("dados alterados: ", this.editedUser);
  }
}
