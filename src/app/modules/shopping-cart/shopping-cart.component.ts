import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { dropDownData } from 'src/app/commonFiles/constant';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AlertPopUpComponent } from 'src/app/component/alert-pop-up/alert-pop-up.component';
import { Router } from '@angular/router';
export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  form!: FormGroup;
  categoryData = dropDownData;
  categoryControl = new FormControl();
  subCategoryControl = new FormControl();
  show = false;
  disable_btn = true;
  displayTable=false
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 2;
  message: any;
  columns = [
    { heading: 'Category ID', key: 'categoryId', type: 'text' },
    { heading: 'Category', key: 'category', type: 'text' },
    { heading: 'SubCategory', key: 'brand', type: 'custom' },
    { heading: 'Class A', key: 'brand', type: 'classBtn' },
    { heading: 'Class B', key: 'brand', type: 'classBtn' },
    { heading: 'Class C', key: 'brand', type: 'classBtn' },
    { heading: 'Total', key: 'brand', type: 'custom' },
    { heading: 'Action', key: 'status', type: 'action', action: ['delete'] },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private route:Router
  ) {}
  ngOnInit(): void {
    this.createSingleFormGroup();
  }
  createSingleFormGroup() {
    this.form = this.formBuilder.group({
      category: new FormArray([]),
    });
  }
  makeCategoryForm() {
    return this.formBuilder.group({
      category: [''],
      categoryId: [''],
      brand: this.formBuilder.array([]),
    });
  }

  makeSubCategoryForm() {
    return this.formBuilder.group({
      categoryId: [null],
      brandName: [null],
      brandId: [null],
      classTotal: [0],
      classes: this.formBuilder.array([]),
    });
  }
  makeSubCategoryClassForm(className: string, classCount: number) {
    return this.formBuilder.group({
      className: [className],
      classCount: [classCount],
    });
  }

  get Category() {
    return this.form.controls['category'] as FormArray;
  }
  getSubCategory(categoryId: number) {
    return this.Category.at(categoryId)?.get('brand') as FormArray;
  }
  getSubCategoryClasses(subCategoryForm: any) {
    return subCategoryForm.controls['classes'].controls;
  }
  isCategoryAvailable(Category: FormArray, categoryForm: FormGroup) {
    const categoryIndex = Category.value.findIndex(
      (element: any) =>
        element.categoryId === categoryForm.get('categoryId')?.value
    );
    return categoryIndex;
  }
  isSubCategoryAvailable(categoryData: any, subCatForm: FormGroup) {
    const subCatIndex = categoryData
      .get('brand')
      .value.findIndex(
        (element: any) => element.brandId === subCatForm.get('brandId')?.value
      );
    console.log(subCatIndex, 'subCatIndex');

    return subCatIndex;
  }
  addSubCategoryClasses(subCatForm: FormGroup, classes: Array<any>) {
    classes.forEach((item: any) => {
      (<FormArray>subCatForm.get('classes')).push(
        this.makeSubCategoryClassForm(item.className, item.classCount)
      );
    });
  }
  addData() {
    const categorySelected = this.categoryControl.value;
    const subCategorySelected = this.subCategoryControl.value;

    let categoryForm = this.makeCategoryForm();
    let subCategoryForm = this.makeSubCategoryForm();
    categoryForm.patchValue({
      category: categorySelected.category,
      categoryId: categorySelected.categoryId,
    });
    subCategoryForm.patchValue({
      categoryId: subCategorySelected.categoryId,
      brandId: subCategorySelected.brandId,
      brandName: subCategorySelected.brandName,
      classes: this.addSubCategoryClasses(
        subCategoryForm,
        this.subCategoryControl.value.classes
      ),
      classTotal: this.getTotalCount(subCategoryForm),
    });
    const categoryIndex = this.isCategoryAvailable(this.Category, categoryForm);
    if (categoryIndex == -1) {
      (<FormArray>categoryForm.get('brand')).push(subCategoryForm);
      this.Category.push(categoryForm);
    } else {
      let category = this.Category.at(categoryIndex);
      const subCatIndex = this.isSubCategoryAvailable(
        category,
        subCategoryForm
      );
      console.log(subCatIndex);

      if (subCatIndex == -1) {
        (<FormArray>this.Category.at(categoryIndex).get('brand')).push(
          subCategoryForm
        );
      }
    }
  }

  openSnackBar(content: any) {
    this._snackBar.open(content, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
  getTotalCount(subCategoryForm: any) {
    console.log(subCategoryForm, 'saasasas');

    let total = 0;
    subCategoryForm.controls.classes.value.forEach((data: any) => {
      console.log(data, 'jijiji');
      total += data.classCount;
    });
    return total;
  }
  deleteData(categoryIndex: number, subCategoryIndex: number) {
    const dialogRef = this.dialog.open(AlertPopUpComponent, {
      width: '390px',
      disableClose: true,
      data: this.message,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        (<FormArray>this.Category.at(categoryIndex).get('brand')).removeAt(
          subCategoryIndex
        );
      }
    });
  }
  actionButton(
    categoryIndex: number,
    subCategoryIndex: number,
    classItem: any,
    action: any
  ) {
    console.log(
      (<FormGroup>(
        (<FormArray>(
          (<FormArray>this.Category.at(categoryIndex)?.get('brand'))
            .at(subCategoryIndex)
            ?.get('classes')
        )).at(classItem)
      ))?.get('classCount'),
      'xaxaxaxa'
    );
    let currentVal = (<FormGroup>(
      (<FormArray>(
        (<FormArray>this.Category.at(categoryIndex).get('brand'))
          .at(subCategoryIndex)
          .get('classes')
      )).at(classItem)
    )).get('classCount')?.value;

    console.log(currentVal, action, 'classCount:currentVal+action');

    if (action == -1 && currentVal > 0) {
      (<FormArray>(
        (<FormArray>this.Category.at(categoryIndex)?.get('brand'))
          .at(subCategoryIndex)
          .get('classes')
      ))
        .at(classItem)
        .patchValue({
          classCount: currentVal + action,
        });
    } else if (action == 1) {
      (<FormArray>(
        (<FormArray>this.Category.at(categoryIndex)?.get('brand'))
          .at(subCategoryIndex)
          .get('classes')
      ))
        .at(classItem)
        .patchValue({
          classCount: currentVal + action,
        });
    }
    (<FormGroup>(
      (<FormArray>this.Category.at(categoryIndex)?.get('brand')).at(
        subCategoryIndex
      )
    )).patchValue({
      classTotal: this.getTotalCount(
        <FormGroup>(
          (<FormArray>this.Category.at(categoryIndex).get('brand')).at(
            subCategoryIndex
          )
        )
      ),
    });
  }
  showTable() {
    this.displayTable=true
    if(this.Category.length > 0){
      this.disable_btn = false
    }
  }
  finalSubmit() {
    this.show = true;
    console.log(this.Category.value);
  }
  navigateToHome(){
    this.route.navigate(['home'])
  }
}
