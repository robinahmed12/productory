import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from './../../../shared/models/product.models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
id: any;

  constructor(private productsService: ProductsService , private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchProduct();
  }

  fetchProduct() {
    this.productsService.getProductData().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err)=> {
        console.log(err)
      }
    });
  }


  // onViewDetails(id: any) {

  // }
}
