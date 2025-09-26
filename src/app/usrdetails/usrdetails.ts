import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usrdetails',
  standalone: false,
  templateUrl: './usrdetails.html',
  styleUrl: './usrdetails.css'
})
export class Usrdetails implements OnInit{

  user:any;


   constructor(private service:User,private router:ActivatedRoute)
  {

  }

   ngOnInit(): void {
   
    
    const id=this.router.snapshot.paramMap.get('id');

    if(id)
    {
      this.getUserById(+id);//convert it to number before passing to your servic
    }
  }

    getUserById(id:number):void{
    this.service.getUserbyid(id).subscribe({
      next:(res:any)=>{
        console.log("Single User",res);
        // this.user=res;
        // console.log("this.user",this.user);
        // const add=res.address;
        // const Geoo=res.geo;
        this.user={
          ...res,
          add:res.address,
          geo: res.address.geo
        }
      console.log("this.user",this.user); 
      }
    })
  }

}
