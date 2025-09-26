import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { log } from 'console';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prcatice',
  standalone: false,
  templateUrl: './prcatice.html',
  styleUrl: './prcatice.css'
})
export class Prcatice implements OnInit{

  products:any[]=[];
  category:any;
  Users:any[]=[];
  user:any;
  

  constructor(private service:User,private router:ActivatedRoute)
  {

  }
  ngOnInit(): void {
    this.getAllProducts();
    this.getAllcategories();
    this.getAllUseres();
    
    const id=this.router.snapshot.paramMap.get('id');

    if(id)
    {
      this.getUserById(+id);//convert it to number before passing to your servic
    }
  }

  getAllProducts():void{
    this.service.getProducts().subscribe({
        next: (res:any[])=>{
          console.log("Products",res);
          this.products=res;
          console.log('this.products',this.products)
          // this.ratingres.rating;
          const allRating=res.map(product=>product.rating.rate);
          console.log('Ratings',allRating);

        }
      })
  }

  getAllcategories():void{
    this.service.getCategory().subscribe({
      next:(res:any)=>{
        console.log("Categories",res);
        this.category=res;
        console.log("this.category",this.category)
      }
    })
  }

  getAllUseres():void{
    this.service.getAlluser().subscribe({
      next:(res:any)=>{
        console.log("All Useres",res);
        this.Users=res;
        console.log("Users",this.Users);
        const address=res.address
        console.log("Address",address)
      }
    })
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
