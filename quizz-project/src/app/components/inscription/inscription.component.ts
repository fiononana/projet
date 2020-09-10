import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup, Validators,FormBuilder,} from '@angular/forms';
import {Router} from '@angular/router';
import {AllService, TokenPayload} from '../../all.service'
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent {
  credentials: TokenPayload = {
    id:0,
    firstName:'',
    lastName:'',
    username:'',
    email :'',
    password :'',
    id_role:1,

  }

  constructor(public all:AllService, private router:Router,private formBuilder:FormBuilder) { }


  inscription() {
    this.all.inscription(this.credentials)
    .pipe(first())
    .subscribe(
      (data)=>{
        this.router.navigateByUrl('/liste/new')
      },
      err=>{
        console.error(err)
      }
    )
    
    }

   
}
