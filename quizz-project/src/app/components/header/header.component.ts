import { Component, OnInit } from '@angular/core';
import {AllService} from '../../all.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public all:AllService) { }

  ngOnInit(): void {
  }

}
