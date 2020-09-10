import { Component, OnInit } from '@angular/core';
import {AllService,  OffreDetails} from '../../all.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.scss']
})
export class OffreComponent implements OnInit {
  element: OffreDetails
    id_offre: any
  constructor(public all:AllService, private router:Router) { }

  displayedColumns: string[];


  ngOnInit(){
    this.all.offre().subscribe(
      offre=>{
        this.element = offre
      },
      err=>{
        console.error(err)
      }

    )

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  navigate(id_offre:number){
    //also you can pass like this,
     this.router.navigate(['/affichage/'+ id_offre]);
    }


}


