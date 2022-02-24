import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApigroupService } from '../shared/apigroup.service';
import { AuthService } from './../shared/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  newCarForm !: FormGroup;
  vehicle !: any;
  token !: string|null;

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.newCarForm = this.formBuilder.group({
      plate:[''],
      brand: [''],
      year:[''],
      price:[''],
      sold:['']
    });
  }
   addNewCar(){
    let url = "http://localhost:8000/api/vehicles";
    let carData = {
      plate: this.newCarForm.value.plate,
      brand: this.newCarForm.value.brand,
      year: this.newCarForm.value.year,
      price: this.newCarForm.value.price,
      sold: this.newCarForm.value.sold,
    }
    console.log(
      carData.brand+
      carData.plate
      );
    
    let token = this.auth.isLoggedIn();
    console.log(token);
    
    let data = JSON.stringify(carData);
    let headerObj = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`
    })
    let header = {
      headers: headerObj
    }
    this.http.post<any>(url,data,header).subscribe(res=>{
      console.log(res);
    });
  }

  logout(){
    this.auth.logout();
  }

}
