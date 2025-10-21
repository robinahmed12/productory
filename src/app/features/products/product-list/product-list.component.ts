import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from './../../../shared/models/product.models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.fetchProduct();
  }

  fetchProduct() {
    this.productsService.getProductData().subscribe({
      next: (products) => {
        this.products = products;
      },
    });
  }
}
