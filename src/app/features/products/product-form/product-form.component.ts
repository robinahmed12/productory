import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  productId: number | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,

    private router: Router,
    private productService: ProductsService
  ) {
    this.productForm = this.createForm();
  }

  ngOnInit(): void {}

  createForm(): FormGroup {
    return this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      launchDate: ['', Validators.required],
      inStock: [true],
      image: ['', [Validators.required, this.urlValidator]],
      features: this.fb.array([''], Validators.required),
    });
  }

  urlValidator(control: AbstractControl): { [key: string]: any } | null {
    if (!control.value) {
      return null;
    }

    try {
      new URL(control.value);
      return null;
    } catch {
      return { invalidUrl: true };
    }
  }

  get features(): FormArray {
    return this.productForm.get('features') as FormArray;
  }

  addFeature(): void {
    this.features.push(this.fb.control('', Validators.required));
  }

  removeFeature(index: number): void {
    if (this.features.length > 1) {
      this.features.removeAt(index);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.productForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  loadProductData(): void {}

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      console.log(formData);

      this.productService.postProductsData(formData).subscribe({
        next: (res) => {
          console.log(res);
        },
      });

      // Prepare the product data
      // const product: Product = {
      //   productName: formData.productName,
      //   description: formData.description,
      //   price: parseFloat(formData.price),
      //   category: formData.category,
      //   launchDate: formData.launchDate,
      //   inStock: formData.inStock,
      //   image: formData.image,
      //   features: formData.features.filter((feature: string) => feature.trim() !== '')
      // };
    }
  }

  onCancel() {}
}
