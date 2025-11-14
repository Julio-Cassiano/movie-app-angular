import { HttpClient } from "@angular/common/http";
import { computed, Injectable, signal } from "@angular/core";
import { CreatingUser, UserModel } from "../user.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private _users = signal<UserModel[]>([]);
    public users = computed(() => this._users());

    private _isAddingOrEditingUser = signal<boolean>(false);
    public isAddingOrEditingUser = computed(() => this._isAddingOrEditingUser);

    private _editedUser = signal<CreatingUser | null>(null);
    public editedUser = computed(() => this._editedUser());

    private _editingUser = signal<UserModel | undefined>(undefined);
    public editingUser = computed(() => this._editingUser);
    
    private apiUrl = 'http://localhost:8081/users';

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
        this.openEditModal();
    }

    public openEditModal(): void {
        this._isAddingOrEditingUser.set(true);
    }

    public closeEditModal(): void {
        this._isAddingOrEditingUser.set(false);
    }

    public sendEditedUser(id: string, user: CreatingUser): Observable<CreatingUser> {
        return this.httpClient.patch<CreatingUser>(`${this.apiUrl}/${id}`, user);
    }   
}
