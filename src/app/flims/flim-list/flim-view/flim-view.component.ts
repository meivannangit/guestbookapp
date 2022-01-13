import { Component, Input, OnInit } from '@angular/core';
import { FlimsService } from 'src/app/service/flims.service';
@Component({
  selector: 'app-flim-view',
  templateUrl: './flim-view.component.html',
  styleUrls: ['./flim-view.component.css']
})
export class FlimViewComponent implements OnInit {
  flimdetails:any
  @Input()filename:any
  constructor(private flimservice:FlimsService) { }

  ngOnInit() {
    
    this.getflimdetails(this.filename)
  }
 async getflimdetails(name)
{
  this.flimservice.movielistbyslugname(name).subscribe(val=>{
    this.flimdetails=val['data'][0]
    console.log('api',this.flimdetails)
    
  })
  
}
}
