import { Component, OnInit } from '@angular/core';
import {AllService, TokenPayload, TokenOffert} from '../../all.service';
import {FormControl, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.scss']
})
export class CandidatComponent{


  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('require')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? "Email n'est pas valide" :"" ;
  }

  credentials: TokenPayload = {
    id:0,
    firstName:'',
    lastName:'',
    username:'',
    email :'',
    password :'',
    id_role:2,

  }
  id_offre:any
  element:TokenOffert

  constructor(public all:AllService, private router:Router,private route: ActivatedRoute) { }
  ngOnInit(){
    this.id_offre = +this.route.snapshot.paramMap.get('id_offre');
  }
  authentification(){
    this.all.authentification(this.credentials)
    .pipe(first())
    .subscribe(
      (data)=> {
        this.router.navigateByUrl('/apropos/'+this.id_offre)
      },
      err =>{
              console.error(err)
      }
    )
  }
  
  inscription() {
    this.all.inscription(this.credentials)
    .pipe(first())
    .subscribe(
      (data)=>{
        this.router.navigateByUrl('/apropos/'+this.id_offre)
      },
      err=>{
        console.error(err)
      }
    )
    
    }


}
