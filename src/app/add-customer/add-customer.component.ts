import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import {Customer} from '../../app/models/customer.model';
import {CustomerService} from '../../app/services/customer.service.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  ngOnInit(): void {
    
  }
  title="";
  isFailedMessage:boolean=false;
  isSuccessMessage:boolean=false;
 message="";
  public globalResponse: any;
  customerForm:FormGroup;
  inputCustomer:Customer;
  constructor(fb: FormBuilder,private customerService: CustomerService) {
   this.customerForm = fb.group({
     Title: ['', Validators.required],
     Name: ['', Validators.required],
     Gender:['', Validators.required],
     Email:['', Validators.required],
     Phone:['', Validators.required],
     DOB:['', Validators.required],
     AadharNo:['', Validators.required],
     Address:['', Validators.required],
   });
 }
   titles = [
     {key: 1, value: 'Mr.'},
     {key: 2, value: 'Mrs.'},
     {key: 3, value: 'Miss'}
   ];
   SubmitForm()
   {
     console.log(this.customerForm.value);
     this.inputCustomer=this.customerForm.value;
     this.inputCustomer.Title=this.customerForm.controls['Title'].value.value;
     this.inputCustomer.DOB=this.customerForm.controls['DOB'].value.toLocaleDateString("en-US")
     this.inputCustomer.Id=0;
     console.log(this.inputCustomer);
         this.customerService.insertCustomer(this.inputCustomer)
             .subscribe((result) => {
                 this.globalResponse = result;
             },
                 error => { //This is error part
                     console.log(error);
                     this.isFailedMessage=true;
                     this.message="Customer Insertion Failed."
                 },
                 () => {
                     // 'onCompleted' callback. This is Success part
                   this.isSuccessMessage=true;
                   this.message="Customer Inserted successfully."
                   //this.customerForm.reset(); 
                 }
             )
   }
  
}
