import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss'],
})
export class ManageProductsComponent implements OnInit {
  products: any;

  constructor(private productService: ProductsService,
   private router:Router
  ) {}

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

  handleEdit(product: any){
    
    this.router.navigate(['/products/edit-product', product.id], {
      queryParams: {
        category: product.category,
        productName: product.productName,
        price: product.price,
      },
      queryParamsHandling: 'merge',
      replaceUrl: false,
    });

  }
}
