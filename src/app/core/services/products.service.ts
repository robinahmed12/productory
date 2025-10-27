import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Product } from 'src/app/shared/models/product.models';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private dbUrl =
    'https://productory-fc23a-default-rtdb.firebaseio.com/products.json';

  constructor(private http: HttpClient) {}

  postProductsData(data: any) {
    return this.http.post(this.dbUrl, data);
  }

  getProductData() {
    return this.http.get<{ [key: string]: any }>(this.dbUrl).pipe(
      map((data) =>
        Object.entries(data).map(([id, product]) => ({
          id,
          ...product,
        }))
      )
    );
  }

  getProductDetails(id: string) {
    const productUrl = `https://productory-fc23a-default-rtdb.firebaseio.com/products/${id}.json`;
    return this.http.get(productUrl);
  }

    updateProduct(id: string, updatedData: Partial<Product>) {
    const productUrl = `https://productory-fc23a-default-rtdb.firebaseio.com/products/${id}.json`;
    return this.http.patch(productUrl, updatedData);
  }
}
