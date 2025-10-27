import { Product } from './../../../shared/models/product.models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  id!: string;
  category!: string;
  price!: string;
 productName!: string;

  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    let id = (this.route.snapshot.paramMap.get('id'))

    // get query params
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.category = params['category'];
      this.productName = params['productName'];
      this.price = params['price'];
    });

    // get details
    if (id) {
      this.productService.getProductDetails(id).subscribe((res) => {
        this.product = res;
        console.log(this.product);
      });
    }
  }
}
