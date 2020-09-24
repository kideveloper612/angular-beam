import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShopService, CartItem } from '../shop.service';
import { Product } from '../../../shared/models/product.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { marcoAnimations } from '../../../shared/animations/marco-animations';
import { AppLoaderService } from '../../../shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [marcoAnimations]
})
export class ProductsComponent implements OnInit, OnDestroy {
  public isSideNavOpen: boolean;
  public viewMode: string = 'grid-view';
  public subTotal: number;
  public total: number;
  public currentPage: any;
  @ViewChild(MatSidenav) private sideNav: MatSidenav;

  public products$: Observable<Product[]>;
  public categories$: Observable<any>;
  public activeCategory: string = 'all';
  public filterForm: FormGroup;
  public cart: CartItem[];
  public cartData: any;
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public sortByOrder  :   string = '';   // sorting
  
  constructor(
    private shopService: ShopService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private loader: AppLoaderService
  ) { }

  ngOnInit() {
    this.categories$ = this.shopService.getCategories();
    this.buildFilterForm(this.shopService.initialFilters);
    setTimeout(() => {
      this.loader.open();
    });
    this.products$ = this.shopService
      .getFilteredProduct(this.filterForm)
      .pipe(
        map(products => {
          this.loader.close();
          return products;
        })
      );
    this.getCart();
    this.cartData = this.shopService.cartData;

    this.onQuantityChange();
  }
 
  getCarts() {
    this.shopService
    .getCart()
    .subscribe(cart => {
      this.cart = cart;
    })
  }
  ngOnDestroy() {

  }
  getCart() {
    this.shopService
    .getCart()
    .subscribe(cart => {
      this.cart = cart;
    })
  }

  public changeViewType(viewType, viewCol){
    this.viewType = viewType;
    this.viewCol = viewCol;
  }
  addToCart(product) {
    let cartItem: CartItem = {
      product: product,
      data: {
        quantity: 1
      }
    };
    this.shopService
    .addToCart(cartItem)
    .subscribe(cart => {
      this.cart = cart;
      this.snackBar.open('Product added to cart', 'OK', { duration: 4000 });
    })
  }

  buildFilterForm(filterData:any = {}) {
    this.filterForm = this.fb.group({
      search: [''],
      category: ['all'],
      minPrice: [filterData.minPrice],
      maxPrice: [filterData.maxPrice],
      minRating: [filterData.minRating],
      maxRating: [filterData.maxRating]
    })
  }
  setActiveCategory(category) {
    this.activeCategory = category;
    this.filterForm.controls['category'].setValue(category)
  }
  // sorting type ASC / DESC / A-Z / Z-A etc.
  public onChangeSorting(val) {
    this.sortByOrder = val;
 }

  toggleSideNav() {
    this.sideNav.opened = !this.sideNav.opened;
  }
 
  removeProduct(cartItem) {
    this.shopService
    .removeFromCart(cartItem)
    .subscribe(res => {
      this.cart = res;
    })
  }

  onQuantityChange() {
    this.subTotal = 0;
    this.cart.forEach(item => {
      this.subTotal += (item.product.price.sale * item.data.quantity)
    })
    this.total = this.subTotal + (this.subTotal * (15/100))
  }
  
}
