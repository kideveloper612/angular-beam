import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import { ProductsService } from 'app/shared/services/products.service';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  @Output() goBack: EventEmitter<any> = new EventEmitter();

  cardOptions: StripeCardElementOptions = {
    hidePostalCode: true,
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
  target: String = '';
  comment: String = '';
  orderContent: Object = {};
  optProduct: any = {};
  postCode: String = '';
  selected: String;

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private productSvc: ProductsService,
    public jwtAuth: JwtAuthService,
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
      city: new FormControl('', [
        Validators.required
      ]),
      state: new FormControl('', [
        Validators.required
      ]),
      country: new FormControl('', [
        Validators.required
      ]),
    });
  }

  ngOnInit(): void {
    this.productSvc.purchaseTerm$.subscribe(item => this.productPrice = item);
    this.productSvc.target$.subscribe(item => this.target = item);
    this.productSvc.comment$.subscribe(item => this.comment = item);
    this.productSvc.orderContent$.subscribe(item => this.orderContent = item);
    this.productSvc.optProduct$.subscribe(item => this.optProduct = item);
    this.productSvc.postCode$.subscribe(item => this.postCode = item);
  }

  back(e: any) {
    e.preventDefault();
    this.goBack.emit();
  }

  createToken(): void {
    const name = this.billingFormGroup.value.name;
    const address = this.billingFormGroup.value.address;
    const apt = this.billingFormGroup.value.apt;
    const city = this.billingFormGroup.value.city;
    const state = this.billingFormGroup.value.state;
    const country = this.billingFormGroup.value.country;

    var options = {
      name: name,
      address_line1: address,
      address_line2: apt,
      address_city: city,
      address_state: state,
      address_country: country,
    };
    this.stripeService
      .createToken(this.card.element, options)
      .subscribe((result) => {
        if (result && result.token) {
          const requestData = {
            tokenId: result.token.id,
            amount: this.productPrice,
            comment: this.comment,
            token: this.jwtAuth.getJwtToken(),
            target: this.target,
            postCode: this.postCode,
            pid: this.optProduct.pid,
            sid: this.optProduct.sid,
            orderContent: this.orderContent
          }

          console.log(requestData);
          this.productSvc.orderByCard(requestData)
            .then(res => console.log(res))
            .catch(error => console.log(error));


          // let res = yield call(Api.orderByCard, data);
          // if (res && res.status == "success") {
          //   Toast.show('Your order has been received successfully!', Toast.LONG);
          //   yield put(productAction.orderByCardSuccess());
          // } else {
          //   Toast.show(res.msg, Toast.LONG);
          //   yield put(productAction.orderByCardFailed());
          // }


          // this.props.dispatch(
          //   productAction.orderByCardAttempt(
          //     tokenId,
          //     this.getPrice(),
          //     target,
          //     this.state.comment,
          //   ),
          // );
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }
}
