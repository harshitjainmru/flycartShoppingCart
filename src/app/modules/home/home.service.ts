import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  public totalSubject = new Subject();
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(`${environment.api_base_path}`);
  }

  // sendTotal(totalVal: any) {
  //   this.totalSubject.next(totalVal);
  // }
  productDetails$ = new BehaviorSubject<number>(0);

  showCart$ = new Subject<boolean>();
  onaddToCart$ = new Subject<boolean>();

}
