import { Component, OnInit, Signal } from '@angular/core';
import { UserService } from '../../user.service';
import { UserModel } from '../../user.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-list-component',
  imports: [DatePipe],
  templateUrl: './user-list-component.html',
  styleUrl: './user-list-component.css'
})

export class UserListComponent implements OnInit {
  public users: Signal<UserModel[]>;
  
  constructor(private userService: UserService){
    this.users = this.userService.users;
  }

  ngOnInit(): void {
    this.userService.fetchUsers();
  }

  public teste() {
    console.log(this.users().length);
  } 
}
