import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { validation } from 'src/app/shared/formValidation';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  isVisible: any;
  isSelected: boolean = true;
  addressForm!:FormGroup
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.makeForm()
  }
  makeForm(){
    this.addressForm=this.fb.group({
      contactDetails:this.fb.group({
      first_name:['',[validation.INPUT_REQUIRED,validation.NAME.NAME_PATTERN,validation.NAME.NAME_LENGTH]],
      last_name:['',[validation.INPUT_REQUIRED,validation.NAME.NAME_PATTERN,validation.NAME.NAME_LENGTH]],
      phone_number:['',[validation.INPUT_REQUIRED,validation.PHONE_NO]],
      email:['',[validation.INPUT_REQUIRED,validation.EMAIL.EMAIL_PATTERN,validation.EMAIL.EMAIL_email]],
      }),
      shippingAddress:this.fb.group({
      address:['',[validation.INPUT_REQUIRED]],
      city:['',[validation.INPUT_REQUIRED]],
      state:['',[validation.INPUT_REQUIRED]],
      code:['',[validation.INPUT_REQUIRED]],
      country:['',[validation.INPUT_REQUIRED]],
      }),
      billingAddress:this.fb.group({
        address:['',[validation.INPUT_REQUIRED]],
        city:['',[validation.INPUT_REQUIRED]],
        state:['',[validation.INPUT_REQUIRED]],
        code:['',[validation.INPUT_REQUIRED]],
        country:['',[validation.INPUT_REQUIRED]],
      })
    })
  }
  setShippingToBillingAddress(event:any){
    if(event.target.checked){
      this.addressForm.controls.billingAddress.setValue(this.addressForm.controls.shippingAddress.value)
    }
    else{
      this.addressForm.controls.billingAddress.reset()
    }
  }
  space(event:any){
    if(event.target.selectionStart===0 && event.code==="Space"){
      event.preventDefault();
    }
  }

  onSubmit(){
    console.log(this.addressForm.controls,'this.addressForm.value');
    console.log(this.addressForm.controls.shippingAddress,'this.addressForm.controls.shippingAddress');

  }

}
