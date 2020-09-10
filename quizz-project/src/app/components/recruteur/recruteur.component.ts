import { Component, OnInit } from '@angular/core'
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router'
import {AllService, TokenOffert} from '../../all.service'
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-recruteur',
  templateUrl: './recruteur.component.html',
  styleUrls: ['./recruteur.component.scss']
})
export class RecruteurComponent  {
 entites :TokenOffert ={
    id_offre:0,
    nom: '',
    addre:'',
    titre:'',
    activite :'',
    missions :'',
    profile :'',
    reference :'',
    datePub : '',
    dateLimiteOffre:'',
    id:null,
}


  constructor(public all:AllService, private router:Router) { }


  
  recruteur() {
    this.all.recruteur(this.entites)
    .pipe(first())
    .subscribe(
      (data)=>{
        this.router.navigateByUrl('/offre/new')
      },
      err=>{
        console.error(err)
      }
    )
    
    }

   
}


