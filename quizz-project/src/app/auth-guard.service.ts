import {Injectable} from '@angular/core'
import { Observable, from } from 'rxjs';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate} from '@angular/router'
import {AllService} from './all.service'

@Injectable({      
    providedIn: 'root'      
 })
export class AuthGuardService implements CanActivate{
    constructor(private all: AllService, private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        if(!this.all.isLoggedIn()){
            this.router.navigateByUrl('/')
            return false
            
        }
            return true
        }
        public isLoggedIn(): boolean {      
            let status = false;      
            if (localStorage.getItem('isLoggedIn') == "true") {      
               status = true;      
            }    
            else {      
               status = false;      
               }      
            return status;      
            }    
         } 
   
