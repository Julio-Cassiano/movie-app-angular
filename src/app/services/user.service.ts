import { HttpClient } from "@angular/common/http";
import { computed, Injectable, signal } from "@angular/core";
import { CreatingOrEditingUser, UserModel } from "../user.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private _users = signal<UserModel[]>([]);
    public users = computed(() => this._users());

    private _isEditingUser = signal<boolean>(false);
    public isEditingUser = computed(() => this._isEditingUser);

    private _isCreatingUser = signal<boolean>(false);
    public isCreatingUser = computed(() => this._isCreatingUser);

    private _editedUser = signal<CreatingOrEditingUser | null>(null);
    public editedUser = computed(() => this._editedUser());

    private _editingUser = signal<UserModel | undefined>(undefined);
    public editingUser = computed(() => this._editingUser);
    
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
        this._editingUser.set(user);
        this._isEditingUser.set(true);
    }

    public closeEditModal(): void {
        this._editingUser.set(undefined);
        this._isEditingUser.set(false);
        this._isCreatingUser.set(false);
    }

    public sendEditedUser(id: string, user: CreatingOrEditingUser): Observable<CreatingOrEditingUser> {
        return this.httpClient.patch<CreatingOrEditingUser>(`${this.apiUrl}/${id}`, user);
    }
    
    public createUser() {
        this._isCreatingUser.set(true);
    }

    public sendNewUser(user: CreatingOrEditingUser) {
        return this.httpClient.post<CreatingOrEditingUser>(this.apiUrl, user);
    }

    public deleteUser(id: string) {
        return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

  public refreshUserSignal(id: string) {
    this._users.update(users => 
      users.filter(user => user.id != id)
    );
  }
}
