import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: any;
  @Input() totalPrice!: number;

  @Input() itemIndex!: number;
  @Output()  addInCart = new EventEmitter<number>();
  @Output()  increseDecrease = new EventEmitter<{}>();


  @ViewChild('addToCartLayer') addToCartLayer!: ElementRef;
  @ViewChild('displayCard') displayCard!: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }


  private _animateCard(): void {
    this.addToCartLayer.nativeElement.style.visibility = 'visible';
    this.addToCartLayer.nativeElement.style.opacity = 1;
    const DOMrect = this.displayCard.nativeElement.getBoundingClientRect();
    const offsetX = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - DOMrect.x - 50;
    const offsetY = -DOMrect.y + 50;
    const offsetPath = `path("m 150 140 Q ${offsetX / 2} ${offsetY - 100} ${offsetX} ${offsetY}")`;

    this.addToCartLayer.nativeElement.style.offsetPath = offsetPath;
    const addToCartAnimation = this.addToCartLayer.nativeElement.animate(
      [
        {
          offsetDistance: 0,
          offsetRotate: '0deg',
        },
        {
          offsetDistance: '100%',
          transform: 'scale(0,0)',
          offsetRotate: '0deg',
          opacity: 0,
        },
      ],
      {
        duration: 2000,
        easing: 'ease-in-out',
        fill: 'none',
      }
    );
    addToCartAnimation.onfinish = () => {
      this.addToCartLayer.nativeElement.style.visibility = 'hidden';
      this.addToCartLayer.nativeElement.style.offsetDistance = 0;
    };
  }
  noop(event: any): void {
    event.stopPropagation();
  }

  addToCartButton() {
    this.addInCart.emit(this.itemIndex);
    this._animateCard();
  }
  actionButton(type: number) {
    const data={
      itemIndex:this.itemIndex,
      type:type
    }
    this.increseDecrease.emit(data)
  }

}
