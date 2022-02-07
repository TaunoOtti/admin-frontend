import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Details } from '../../models/customer-detail.model';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  displayedColumns = ['label', 'value'];
  customerDetails: Details[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    customerDetails: Details[],
    loanDetails: Details[]
  }) { 
    this.customerDetails = data.customerDetails;
  }

  ngOnInit(): void {
  }

}
