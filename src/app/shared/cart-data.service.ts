import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartDataService {

  cartList: any = [];
  totalPrice = 0;
  constructor() { }

  addCart(item:any) {
    this.cartList.push(item);
  }
  get getCartList() {
    return this.cartList;
  }

  setTotalPrice(price:number) {
    this.totalPrice = price;
  }
}

