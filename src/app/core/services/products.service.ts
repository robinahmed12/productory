import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product.models';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private dbUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  postProductsData(product: Product): Observable<Product> {
    return this.http.post<Product>(this.dbUrl, product);
  }

 getProductData(): Observable<Product[]> {

  return this.http.get<Product[]>(this.dbUrl).pipe(
    map(products => products.map(product => ({ ...product })))
  );
}

  getProductDetails(id: string) {
    return this.http.get(`${this.dbUrl}/${id}`);
  }

  updateProduct(id: string, updatedData: Partial<Product>) {
    return this.http.put(`${this.dbUrl}/${id}`, updatedData);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.dbUrl}/${id}`);
  }
}
