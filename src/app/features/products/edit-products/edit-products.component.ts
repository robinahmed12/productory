import { Product } from './../../../shared/models/product.models';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.scss'],
})
export class EditProductsComponent implements OnInit {
  productForm!: FormGroup;
  productId!: string;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productId = String(this.route.snapshot.paramMap.get('id'))
    this.initForm();

    // Load product data
    this.productsService.getProductDetails(this.productId).subscribe({
      next: (product: any) => {
        if (product) {
          this.productForm.patchValue(product);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  initForm() {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      launchDate: ['', Validators.required],
      inStock: [false],
      image: [''],
      features: [''],
    });
  }

  onSubmit() {
    if (this.productForm.invalid) return;

    const updatedProduct: Partial<Product> = {
      ...this.productForm.value,
    };

    this.productsService
      .updateProduct(this.productId, updatedProduct)
      .subscribe({
        next: () => {
          alert('Product updated successfully!');
          this.router.navigate(['/products/manage-product']);
        },
        error: (err) => console.error(err),
      });
  }
}
