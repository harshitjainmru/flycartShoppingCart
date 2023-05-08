
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// import { MatDatepicker } from '@angular/material/datepicker';
// import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter'
import * as _moment from 'moment';
import { FadeIn } from 'src/app/commonFiles/animation';
import { CartDataService } from 'src/app/shared/cart-data.service';
// tslint:disable-next-line:no-duplicate-imports
// import { default as _rollupMoment, Moment} from 'moment';
import { validation } from 'src/app/shared/formValidation';
// import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';

// const moment = _rollupMoment || _moment;

// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'MM/YYYY',
//   },
//   display: {
//     dateInput: 'MM/YYYY',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  animations:[FadeIn]
  // providers: [
  //   // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
  //   // application's root module. We provide it at the component level here, due to limitations of
  //   // our example generation script.
  //   {
  //     provide: DateAdapter,
  //     useClass: MomentDateAdapter,
  //     deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  //   },

  //   {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  // ],
})
export class PaymentComponent implements OnInit {
  paymentForm!: FormGroup;
  totalValue:number=0
  upiForm!:FormGroup
  convenienceFee=50
  Tax=10
  showDiv:boolean=false
  months: any = [];
  years: any = [];
  paymentOption=new FormControl();
  constructor(private _fb: FormBuilder,private totalPriceService:CartDataService,private route:Router) {}

  ngOnInit(): void {
    this.createForm();
    this.totalValue = this.totalPriceService.totalPrice;

  }

  createForm() {
    this.paymentForm = this._fb.group({

      cardNumber: ['', Validators.required],
      cvv: ['', Validators.required],
      cardHolderName: ['',[ validation.INPUT_REQUIRED,validation.NAME.NAME_PATTERN,validation.NAME.NAME_LENGTH]],
      date :['',validation.INPUT_REQUIRED]
    })
    this.upiForm=this._fb.group({
        upiId: ['', Validators.required],

    });
    // this.dateReset()
  }
  // dateReset(){
  //   this.paymentForm.controls.date.reset();
  // }
  // chosenYearHandler(normalizedYear: Moment) {
  //   const ctrlValue :any = this.paymentForm.controls.date?.value;
  //   ctrlValue.year(normalizedYear.year());
  //   this.paymentForm.controls.date.setValue(ctrlValue);
  //   console.log(ctrlValue,';fhrwfig');

  // }

  // chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
  //   const ctrlValue :any = this.paymentForm.controls.date.value;
  //   ctrlValue.month(normalizedMonth.month());
  //   this.paymentForm.controls.date.setValue(ctrlValue);
  //   datepicker.close();
  //   console.log(ctrlValue,'gewyfutur');

  // }
  backHome(){
    this.totalPriceService.cartList=[]
    this.route.navigate(['home'])
  }


  onSubmit(){
    if(this.paymentForm.valid || this.upiForm.valid){
      console.log(this.paymentForm.controls);
      this.showDiv=true
    }
  }
}
