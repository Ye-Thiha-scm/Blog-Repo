import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Role } from 'src/app/interfaces/role.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  loggedInUser: any;

  ngOnInit(): void {
    localStorage.setItem('isUsers', 'false');
    localStorage.setItem('isAboutUs', 'false');
    localStorage.setItem('isProfile', 'false');

    if (localStorage.getItem('loginUser')) {
      this.loggedInUser = JSON.parse(localStorage.getItem('loginUser') || '');
    } else {
      this.loggedInUser = '';
    }
  }

  get isAdmin() {
    return this.loggedInUser && this.loggedInUser.type === Role.Admin;
  }

  onClickUsers() {
    localStorage.setItem('isUsers', 'true');
    localStorage.setItem('isAboutUs', 'false');
    localStorage.setItem('isProfile', 'false');
  }

  onClickAboutUs() {
    localStorage.setItem('isUsers', 'false');
    localStorage.setItem('isAboutUs', 'true');
    localStorage.setItem('isProfile', 'false');
  }

  onClickProfile() {
    localStorage.setItem('isUsers', 'false');
    localStorage.setItem('isAboutUs', 'false');
    localStorage.setItem('isProfile', 'true');
  }

}
