import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss'],
})
export class ManageProductsComponent implements OnInit {
  products: any;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.fetchProduct();
  }

  fetchProduct() {
    this.productService.getProductData().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
