import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductRoutingModule } from './products-routing.module';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { EditProductsComponent } from './edit-products/edit-products.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  exports: [],
  declarations: [
    ProductFormComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ManageProductsComponent,
    EditProductsComponent,
  ],
  providers: [],
})
export class ProductsModule {}
