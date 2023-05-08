import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { countryStateData } from 'src/app/shared/countryData';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss']
})
export class UserAddressComponent implements OnInit {
  countrydata = countryStateData;
  state: any = []
  district: any = []
  data:any=[]
  showDropDown:boolean=true
  showDistrictDropDown:boolean=true
  showCityDropDown:boolean=true
  statelength=0
  countryState =new Map();
  countryControl = new FormControl();
  countryForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.countryForm = this.fb.group({
      country: [],
      // states: this.fb.array([this.newstates()])
      states: this.fb.array([])
    });
  }

  newstates(): FormGroup {
    return this.fb.group({
      state:[],
      // districts: this.fb.array([this.newDistricts()])
      districts: this.fb.array([])
    });
  }
  newDistricts(): FormGroup {
    return this.fb.group({
      District: [],
      // cities:this.fb.array([this.newCities()])
      cities:this.fb.array([])
    });
  }

  newCities():FormGroup{
    return this.fb.group({
      city:['']
    })
  }

  onCountryChange(event:any) {
    this.countryForm?.controls?.country.patchValue(event.country)
    this.state = this.countryControl.value.state_list;
    if(this.stateData().length==0)
    this.addMoreState()
    this.showDropDown=false
  }

  onstateChange(event:any,stateindex:number) {
    console.log(event);
    let statename=event.value;
    let countryNames = this.countryControl.value.countryNames;
    let countryindx=countryNames == 'India' ? 1:0;
    this.countrydata[countryindx].state_list.forEach((element:any)=>{
      console.log(element);
      if(element.state_name == statename){
        this.countryState.set(stateindex,element.district_list);
      this.showDistrictDropDown=false

      }
    })
    if(this.districtData(stateindex).length==0){
      this.addMoreDistrict(stateindex)
      this.showDistrictDropDown=false
    }
  }
  districtSelection(stateIndex:number,districtIndex:number){
    if(this.cityData(stateIndex,districtIndex).length==0){
      this.addMoreCity(stateIndex,districtIndex);
    this.showCityDropDown=false

    }
  }

  stateData(): FormArray {
    return this.countryForm.get('states') as FormArray;
  }

  districtData(stateIndex: number): FormArray {
    return this.stateData()
      .at(stateIndex)
      .get('districts') as FormArray;
  }

  cityData(stateIndex:number,districtIndex:number){
    return ((<FormArray>this.countryForm.get('states')).at(stateIndex).get('districts') as FormArray).at(districtIndex).get('cities') as FormArray;
  }

  addMoreState(){
    this.stateData().push(this.newstates());
    this.statelength++;
  }

  addMoreDistrict(empIndex: number) {
    this.districtData(empIndex).push(this.newDistricts());
  }

  addMoreCity(stateIndex:number,districtIndex:number){
    this.cityData(stateIndex,districtIndex).push(this.newCities())
  }

  onsubmit() {
    console.log(this.countryForm);
    this.data=this.countryForm
  }
}
