import { Component, OnInit } from '@angular/core';
import { ApigroupService } from './../shared/apigroup.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  vehicles!: any;
  constructor(private api: ApigroupService) {}

  ngOnInit(): void {
    this.getVehicles();
  }
  getVehicles() {
    this.api.getVehicles().subscribe((res) => {
      console.log(res);
      this.vehicles = res;
    });
  }
}
