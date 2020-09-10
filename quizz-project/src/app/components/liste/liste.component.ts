import { Component, OnInit } from '@angular/core';
import {AllService,  UserDetails} from '../../all.service'

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent {
  items: UserDetails
  constructor(public all:AllService) {}

  ngOnInit(){
    this.all.liste().subscribe(
      user=>{
        this.items = user
      },
      err=>{
        console.error(err)
      }
    )
  }

}
