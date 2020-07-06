 import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuItems = [
    {linkId:1, linkName: 'New Hire', linkUrl:'home'},
    {linkId:2, linkName: 'Employees', linkUrl:'employee'},
    {linkId:3, linkName: 'Help', linkUrl:'help'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
