import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckOutRoutingModule } from './check-out-routing.module';
import { CheckOutComponent } from './check-out.component';
import { MatIconModule } from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import { CartComponent } from './cart/cart.component';
import { AddressComponent } from './address/address.component';
import { PaymentComponent } from './payment/payment.component';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CreditCardDirective } from 'src/app/shared/creditCard.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { OnlyNumberDirective } from 'src/app/directives/only-number.directive';
import { SpecialCharacterDirective } from 'src/app/directives/special-character.directive';
@NgModule({
  declarations: [
    CheckOutComponent,
    CartComponent,
    AddressComponent,
    PaymentComponent,
    CreditCardDirective,
    OnlyNumberDirective,
    SpecialCharacterDirective,
  ],
  imports: [
    CommonModule,
    CheckOutRoutingModule,
    MatIconModule,
    MatStepperModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule


  ]
})
export class CheckOutModule { }
