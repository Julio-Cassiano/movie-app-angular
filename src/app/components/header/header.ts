import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  public links = signal<{name: string, id: string, path:string}[]>([
    {name: "Usuários", id: "users", path:"/users"},
    {name: "Filmes", id: "movies", path:"/movies"}
  ]);
}
