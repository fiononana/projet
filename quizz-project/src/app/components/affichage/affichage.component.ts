import { Component, OnInit } from '@angular/core';
import {AllService,  OffreDetails} from '../../all.service'
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { isDataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-affichage',
  templateUrl: './affichage.component.html',
  styleUrls: ['./affichage.component.scss']
})
export class AffichageComponent  implements OnInit{
  element = new Offre();
  id_offre:any

  constructor(public all:AllService,
    private http:HttpClient,
     private router:Router,
     private route: ActivatedRoute) { }
  ngOnInit(){
    this.id_offre = +this.route.snapshot.paramMap.get('id_offre');
  // }
  // public detailsOffre(){
   this.all.detailsOffre(this.id_offre).subscribe(
    data => {this.element = data.offre;
      console.log(this.element)
    },
  // error => {console.error('There was an error!', error)},
  )
   }


   navigate(){
     if(!this.all.isLoggedIn){
      this.router.navigate(['/apropos/'+this.id_offre])
     }else{
      this.router.navigate(['/candidat/'+this.id_offre]);
     }
    //also you can pass like this,
     
    }
  

}
class Offre {
  id_offre:number
    nom: string
    addre:string
    titre:string
    activite :string	
    missions :string
    profile :string
    reference :string
    datePub : string
    dateLimiteOffre: string
    exp:number
    iat:number
}