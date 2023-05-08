import { Component, OnInit } from '@angular/core';
import { CartDataService } from 'src/app/shared/cart-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
productData:any=[]
totalValue:number=0
  constructor(private cartService:CartDataService) { }

  ngOnInit(): void {
    this.getCartProducts()
  }
  getCartProducts() {
    this.productData = this.cartService.getCartList;
    this.totalValue = this.cartService.totalPrice;
  }
}
