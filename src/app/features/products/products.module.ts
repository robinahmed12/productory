import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductRoutingModule } from './products-routing.module';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import {  HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ProductRoutingModule, HttpClientModule,
    
  
  ],
  exports: [],
  declarations: [
    ProductFormComponent,
    ProductListComponent,
    ProductDetailsComponent,
  ],
  providers: [],
})
export class ProductsModule {}
