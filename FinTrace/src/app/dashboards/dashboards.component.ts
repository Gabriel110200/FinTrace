import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  home(){
    this.router.navigate(['/'])
  }

}
