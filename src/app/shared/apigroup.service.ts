import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApigroupService {
  host = 'http://localhost:8000/api/';
  constructor(private http: HttpClient) {}

  getVehicles() {
    let endpoint = 'vehicles';
    let url = this.host + endpoint;
    return this.http.get<any>(url);
  }
  addNewCar(
    plate: string,
    brand: string,
    year: string,
    price: string,
    sold: string
  ) {
    let newData = {
      plate: plate,
      brand: brand,
      year: year,
      price: price,
      sold: sold,
    };
    let data = JSON.stringify(newData);
    let data2: any = localStorage.getItem('currentUser');
    let currentUser = JSON.parse(data2);
    let token = currentUser.token;

    let headerObj = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    let header = {
      headers: headerObj,
    };
    let endpoint = 'vehicles';
    let url = this.host + endpoint;
    return this.http.post<any>(url, data, header);
  }
}
