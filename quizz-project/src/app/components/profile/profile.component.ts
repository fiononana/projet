import { Component, OnInit } from '@angular/core';
import {AllService, UserDetails} from '../../all.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent{
  details: UserDetails

  constructor(public all:AllService) { }

  ngOnInit() {
    this.all.liste().subscribe(
      user=>{
        this.details = user
      },
      err=>{
        console.error(err)
      }
    )
  }

}
