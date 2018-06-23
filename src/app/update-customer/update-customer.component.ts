import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../../app/models/customer.model';
import { CustomerService } from '../../app/services/customer.service.service';
import { MatOptionSelectionChange } from '@angular/material';


@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

  title = "";
  isFailedMessage: boolean = false;
  isSuccessMessage: boolean = false;
  message = "";
  selectedId: number;
  public globalResponse: any;
  customerForm: FormGroup;
  customerForUpdate: Customer;
  AllCustomer: Customer[];
  customerIds = [{}];
  titles = [
    { key: 1, value: 'Mr.' },
    { key: 2, value: 'Mrs.' },
    { key: 3, value: 'Miss' }
  ];

  constructor(fb: FormBuilder, private customerService: CustomerService) {
    this.customerForm = fb.group({
      Id: ['', Validators.minLength[1]],
      Title: ['', Validators.required],
      Name: ['', Validators.required],
      Gender: ['', Validators.required],
      Email: ['', Validators.required],
      Phone: ['', Validators.required],
      DOB: ['', Validators.required],
      AadharNo: ['', Validators.required],
      Address: ['', Validators.required],
    });
    this.getAllCustomers();
  }

  ngOnInit() {

  }

  SubmitForm() {
    this.customerForUpdate=this.customerForm.value;
    this.customerForUpdate.Id=this.customerForm.controls['Id'].value.value;
    this.customerForUpdate.Title=this.customerForm.controls['Title'].value.value;
    this.customerForUpdate.DOB=this.customerForm.controls['DOB'].value;
    this.customerService.updateCustomer(this.customerForUpdate.Id,this.customerForUpdate)
      .subscribe((result) => {
        this.globalResponse = result;
      },
        error => { //This is error part
          console.log(error);
          this.isFailedMessage = true;
          this.message = "Customer Update Failed."
        },
        () => {
          // 'onCompleted' callback. This is Success part
          this.isSuccessMessage = true;
          this.message = "Customer Updated successfully."

        }
      )
  }
  getAllCustomers() {
    this.customerService.GetAllCustomer()
      .subscribe((result) => {
        this.globalResponse = result;
      },
        error => { //This is error part
          console.log(error);
          this.isFailedMessage = true;
          this.message = "Get customer is failed due to some reason."
        },
        () => {
          // 'onCompleted' callback. This is Success part
          //this.isSuccessMessage = true;
          // this.message = "Get customer is successfully."
          this.AllCustomer = this.globalResponse;
          this.AllCustomer.forEach((cust) => {
            let id = { key: cust.Id, value: cust.Id.toString() };
            this.customerIds.push(id)
          })
        }
      )
  }

  fillAllControls(event: MatOptionSelectionChange, Id: any) {
    if (event.isUserInput) {
      this.customerForm.reset();
      let selctedCustomer = this.AllCustomer.filter((cust: Customer) => cust.Id === Id)[0];
      this.title = selctedCustomer.Title;
      //this.customerForm.controls['Title'].setValue(selctedCustomer.Title);
      this.customerForm.controls['Name'].setValue(selctedCustomer.Name);
      this.customerForm.controls['Gender'].setValue(selctedCustomer.Gender);
      this.customerForm.controls['Phone'].setValue(selctedCustomer.Phone);
      this.customerForm.controls['Email'].setValue(selctedCustomer.Email);
      this.customerForm.controls['AadharNo'].setValue(selctedCustomer.AadharNo);
      this.customerForm.controls['Address'].setValue(selctedCustomer.Address);
      this.customerForm.controls['DOB'].setValue(selctedCustomer.DOB);
    }

  }

}

