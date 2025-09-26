import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {

  ngOnInit(){
    this.displayMsg();
  }

  constructor(private service:User)
  {

  }


  msg:string='';

  displayMsg()
  {
    this.msg= this.service.getMessage();
    console.log("this.msg",this.msg);
  }
  

}
