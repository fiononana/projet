import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable, of} from 'rxjs'
import {map} from 'rxjs/operators'
import {Router, ActivatedRoute} from '@angular/router' 

//user
export interface UserDetails{
    id:number
    firstName: string
    lastName:string
    username:string
    email :string	
    password :string
    
    exp:number
    iat:number
}
interface TokenResponse{
    token:string
}

//user
export interface TokenPayload{
    id:number
    firstName: string
    lastName:string
    username:string
    email :string	
    password :string
    id_role:number
}

//offre
export interface OffreDetails{
    id_offre:number
    nom: string
    addre:string
    titre:string
    activite :string	
    missions :string
    profile :string
    reference :string
    datePub : string,
    dateLimiteOffre: string
    exp:number
    iat:number
}
//offre
export interface TokenOffert{
    id_offre:number
    nom: string
    addre:string
    titre:string
    activite :string	
    missions :string
    profile :string
    reference :string
    datePub : string,
    dateLimiteOffre: string,
    id:number
}


//postule
export interface TokenPostule{
    id_postule: number
    id: number
    id_offre : number
    datePost: string
    cv: string
    lm: string
}
//postule
export interface PostuleDetails{
    id_postule: number
    id: number
    id_offre : number
    datePost: string
    cv: string
    lm: string
    exp:number
    iat:number
}

@Injectable()
export class AllService {
    private token:string

    constructor(private http:HttpClient,
         private router:Router,
         private route: ActivatedRoute){}

    private saveToken(token: string):void{
        localStorage.setItem('userToken', token)
        this.token=token

    }

    private getToken():string{
        if(!this.token){
            this.token= localStorage.getItem("userToken")
        }
        return this.token
    }
    public getUserDetails(): UserDetails {
         const token= this.getToken()
        //  console.log(token)
            let payload
         if(token){
            payload = token.split('.')[1]
            payload = window.atob(payload)
            return JSON.parse(payload)
        }else{
            return null
        }

        }

        public getOffreDetails(): OffreDetails {
            const token= this.getToken()
            let offert
            if(token){
                offert = token.split('.')[1]
                offert = window.atob(offert)
               return JSON.parse(offert)
           }else{
               return null
           }
        }

        public getPostuleDetails(): PostuleDetails {
            const token= this.getToken()
            let postule
            if(token){
                postule = token.split('.')[1]
               postule = window.atob(postule)
               return JSON.parse(postule)
           }else{
               return null
           }
        }


        public isLoggedIn(): boolean{
            const user= this.getUserDetails()
            if(user){
                return user.exp > Date.now()/1000
            }else{
                return false
            }
    }

    public recruteur( offre:TokenOffert):Observable<any>{
        const base = this.http.post("offres/ajoutOffre", offre)
        const request = base.pipe(
            map((data:TokenResponse) => {
                if(data.token){
                    this.saveToken (data.token)
                }
               console.log(data);
                return data;
            })
            )
            console.log(request);
            return request;
    }

    public inscription( user:TokenPayload):Observable<any>{
        const base = this.http.post("users/inscription", user)
        const request = base.pipe(
            map((data:TokenResponse) => {
                if(data.token){
                    this.saveToken (data.token)
                }
               console.log(data);
                return data;
            })
            )
            console.log(request);
            return request;
    }
    public authentification(user:TokenPayload):Observable<any>{
        const base=this.http.post("users/authentification",user)
        const request = base.pipe(
            map((data:TokenResponse)=>{
                if(data.token){
                    this.saveToken(data.token)
                }
                return data
            })
            )
            return request
    }
    public liste():Observable<any> {
        return this.http.get('users/liste', {
        headers : {Authorization : '${this.getToken()}' }
        })
    }


    //Afficher liste des offres
    public offre():Observable<any>{
        return this.http.get('offres/offre',{
            headers : {Authorization: '${this.getToken()}'}
        })
        
    }
 //Afficher liste des offres par id
 public detailsOffre(id_offre):Observable<any>{
     return this.http.get('offres/detailsOffre/'+id_offre,{
        headers : {Authorization: '${this.getToken()}'}
    })
    
}

//Postuler
public postuler( postule:TokenPostule):Observable<any>{
    const base = this.http.post("postules/postuler", postule)
    const request = base.pipe(
        map((data:TokenResponse) => {
            if(data.token){
                this.saveToken (data.token)
            }
           console.log(data);
            return data;
        })
        )
        console.log(request);
        return request;
}


  public  logout() :void {  
      this.token=''  ;
        window.localStorage.setItem('isLoggedIn','false');    
        window.localStorage.removeItem('token'); 
        this.router.navigateByUrl('/')   ;
        }    
}


