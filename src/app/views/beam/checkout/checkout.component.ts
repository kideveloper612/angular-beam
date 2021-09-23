import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { ProductsService } from 'app/shared/services/products.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es'
  };

  billingFormGroup: FormGroup;
  productPrice: Number = 0;
  selected: String;

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private productSvc: ProductsService
  ) {
    this.billingFormGroup = this.fb.group({
      name: new FormControl('', [
        Validators.required
      ]),
      address: new FormControl('', [
        Validators.required
      ]),
      apt: new FormControl('', [
        Validators.required
      ]),
    });
  }

  ngOnInit(): void {
    this.productSvc.purchaseTerm$.subscribe(price => this.productPrice = price);
  }

  createToken(): void {
    var options = {
      name: 'name',
      address_line1: 'line1',
      address_line2: 'line2',
      address_city: 'city',
      address_state: 'state',
      address_zip: 'zip',
      address_country: 'country',
    };
    this.stripeService
      .createToken(this.card.element, options)
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(result.token.id);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }
}
