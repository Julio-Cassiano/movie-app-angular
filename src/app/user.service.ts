import { HttpClient } from "@angular/common/http";
import { computed, Injectable, signal } from "@angular/core";
import { UserModel } from "./user.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class UserService {
    private _users = signal<UserModel[]>([]);
    public users = computed(() => this._users());
    
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
}