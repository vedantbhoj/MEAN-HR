 import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuItems = [
    {linkId:1, linkName: 'Home', linkUrl:'home'},
    {linkId:2, linkName: 'Admin', linkUrl:'admin'},
    {linkId:3, linkName: 'Help', linkUrl:'help'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
