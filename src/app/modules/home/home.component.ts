import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  actionBtn,
  FadeIn,
  FadeOut,
  imgAnimation,
} from 'src/app/commonFiles/animation';
import { AlertPopUpComponent } from 'src/app/component/alert-pop-up/alert-pop-up.component';
import { CartDataService } from 'src/app/shared/cart-data.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(100),
      ]),
    ]),
    imgAnimation,
    actionBtn,
    FadeIn,
    FadeOut,
  ],
})
export class HomeComponent implements OnInit {
  data: any = [];
  cartData: any;
  orderCount: number = 0;
  totalValue: number = 0;
  showDiv: boolean = false;
  spinner: boolean = true;
  showContent: boolean = true;
  message:any
  imageUrl = 'https://dummyjson.com/image/i/products/';
  @ViewChild('addToCartLayer') addToCartLayer!: ElementRef;
  @ViewChild('displayCard') displayCard!: ElementRef;
  constructor(private homeService: HomeService, private cartService:CartDataService,private route:Router,public dialog:MatDialog) {}

  ngOnInit(): void {
    this.getProductData();
    this.showCartList();
  }
  getProductData() {
    this.homeService.getData().subscribe((res: any) => {
      this.data = res.products;
      console.log(res);
      this.spinner = false;
    });
  }
  showCartList() {
    this.homeService.showCart$.subscribe((val) => {
      this.showContent = val;
    });
  }

  actionButton(clickedItemIndex: any, value: number) {
    const currentValue = this.data[clickedItemIndex].numberOfItemInCart;
    if(this.data[clickedItemIndex].numberOfItemInCart ==1 && value==-1){
      this.deleteItem(clickedItemIndex)
    }
    if (currentValue > 1 || value == 1) {
      this.data[clickedItemIndex].numberOfItemInCart += value;
      this.homeService.productDetails$.next(this.orderCount);

    }
    this.data[clickedItemIndex].totalPrice =
      this.data[clickedItemIndex].numberOfItemInCart *
      this.data[clickedItemIndex].price;
    this.getTotalPrice();
  }
  onIncreaseDecreaseFromChield(data: any) {
    this.actionButton(data.itemIndex, data.type);
  }
  getTotalPrice() {
    this.totalValue = 0;
    this.data.forEach((element: any) => {
      element.addToCart
        ? (this.totalValue += element.totalPrice)
        : (this.totalValue += 0);
    });
    console.log(this.totalValue, 'total');
  }
  addToCartButton(clickedItemIndex: number) {
    this.data[clickedItemIndex]['addToCart'] = true;
    this.data[clickedItemIndex]['numberOfItemInCart'] = 1;
    this.data[clickedItemIndex]['totalPrice'] =
      this.data[clickedItemIndex].price;
      this.orderCount++
    this.homeService.productDetails$.next(this.orderCount);

    this.showDiv = true;
    this.getTotalPrice();
  }
  deleteItem(itemIndex: number) {
    const dialogRef = this.dialog.open(AlertPopUpComponent, {
      width: '390px',
      disableClose: true,
      data: this.message,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.data[itemIndex]['addToCart'] = false;
        this.data[itemIndex]['numberOfItemInCart'] = 1;
        this.orderCount--;
      }
      this.getTotalPrice();
    });
  }
  onCartClick() {
    this.showContent = !this.showContent;
  }
  emptyCart() {
    const cartStatus = confirm('Are you sure you want to clear the cart ?');
    if (cartStatus) {
      this.data.forEach((item: any) => {
        item['addToCart'] = false;
      });
      this.totalValue = 0;
      this.orderCount = 0;
    // this.homeService.productDetails$.next(this.orderCount);

    }
  }
  checkoutProducts() {
    this.data.map((item: any) => {
      if (item.addToCart) {
        this.cartService.addCart(item);
        console.log("Item Added!");
      }
    });
    this.cartService.setTotalPrice(this.totalValue);
    this.route.navigate(['/home/check']);
  }
}
