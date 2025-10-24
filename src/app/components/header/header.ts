import { Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [NgClass],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  public links = signal<{name: string, id: string}[]>([
    {name: "Usuários", id: "users"},
    {name: "Filmes", id: "movies"}
  ]);

  public activeLink = signal('users');

  public linkFocus(linkId: string): void {
      this.activeLink.set(linkId);
  }
}
