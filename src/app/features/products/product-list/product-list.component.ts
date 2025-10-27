import { ProductsService } from 'src/app/core/services/products.service';
import { Product } from './../../../shared/models/product.models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  id: any;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProduct();
  }

  fetchProduct() {
    this.productsService.getProductData().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onViewDetails(product: any) {
    this.router.navigate(['/products/product-details', product.id], {
      queryParams: {
        category: product.category,
        productName: product.productName,
        price: product.price,
        
      },
      queryParamsHandling: 'merge', // optional
      replaceUrl: false,
    });
  }
}
