import { Component, OnInit } from '@angular/core';
import { Customer } from '../../app/models/customer.model';
import { CustomerService } from '../../app/services/customer.service.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  title = "";
  isFailedMessage: boolean = false;
  isSuccessMessage: boolean = false;
  message = "";
  public globalResponse: any;
  AllCustomer: Customer[];

  constructor( private customerService: CustomerService) {

    this.getAllCustomers();
  }
  ngOnInit() {
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
        }
      )
  }

}
