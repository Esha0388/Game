import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class User {


  constructor(private http:HttpClient)
  {

  }


  getMessage()
  {
    return "Hi Isha How r You?"
  }

  getProducts()
  {
    const url='https://fakestoreapi.com/products';
    return this.http.get<any>(url);
  }

  getCategory()
  {
    const url='https://fakestoreapi.com/products/categories';
    return this.http.get(url);
  }
  
  getAlluser()
  {
    const url='https://jsonplaceholder.typicode.com/users';
    return this.http.get(url);
  }

  getUserbyid(userId:number){
    const url=`https://jsonplaceholder.typicode.com/users/${userId}`
    return this.http.get(url);
  }
}
