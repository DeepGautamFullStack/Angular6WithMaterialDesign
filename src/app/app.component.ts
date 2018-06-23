import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import {Customer} from '../app/models/customer.model';
import {CustomerService} from '../app/services/customer.service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[CustomerService]
})
export class AppComponent {


}
