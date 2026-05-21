import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class AdminUsers implements OnInit {
  users: any[] = [];

  constructor() {}

  ngOnInit(): void {
  // this.loadUsers();
  }

  // loadUsers() {
  //   // AdminService removed: stub users
  //   this.users = [];
  // }

}
