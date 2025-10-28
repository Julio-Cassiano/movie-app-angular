import { HttpClient } from "@angular/common/http";
import { computed, Injectable, signal } from "@angular/core";
import { CreateOrEditUser, UserModel } from "../user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _users = signal<UserModel[]>([]);
  public users = computed(() => this._users());


  private _isAddingOrEditingUser = signal<boolean>(false);
  public isAddingOrEditingUser = computed(() => this._isAddingOrEditingUser);


  private _creatingOrEditingUser = signal<CreateOrEditUser | null>(null);
  public creatingOrEditingUser = computed(() => this._creatingOrEditingUser());
    
    private apiUrl = 'http://localhost:8080/users';

    constructor(private httpClient: HttpClient){}

    public fetchUsers(): void {
        if(this._users()?.length > 0) {
            return;
        }

        this.httpClient.get<UserModel[]>(this.apiUrl)
            .subscribe(users => {
                this._users.set(users);
            });
    }

    public refreshUsers(){
        this.httpClient.get<UserModel[]>(this.apiUrl)
            .subscribe(users => {
                this._users.set(users);
            })
    }

    public editUser(user: UserModel){

    }

    public openEditModal(): void {
        this._isAddingOrEditingUser.set(true);
    }

    public closeEditModal(): void {
        this._isAddingOrEditingUser.set(false);
    }
}
