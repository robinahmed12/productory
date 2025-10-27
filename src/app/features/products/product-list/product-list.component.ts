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
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = ['Analytics', 'Roadmaps', 'Collaboration', 'Planning'];

  selectedCategory: string = '';
  searchTerm: string = '';
  sortOption: string = '';

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProducts();

    // Apply filters from query params on page load
    this.route.queryParams.subscribe((params) => {
      this.selectedCategory = params['category'] || '';
      this.searchTerm = params['search'] || '';
      this.sortOption = params['sort'] || '';
      this.applyFilter();
    });
  }

  fetchProducts() {
    this.productsService.getProductData().subscribe({
      next: (products) => {
        this.products = products;
        this.applyFilter();
      },
      error: (err) => console.log(err),
    });
  }

  // Apply category + search filters, then sort
  applyFilter() {
    this.filteredProducts = this.products.filter((p) => {
      const matchesCategory =
        !this.selectedCategory || p.category === this.selectedCategory;
      const matchesSearch =
        !this.searchTerm ||
        p.productName.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    this.applySort();
  }

  // Category filter
  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.applyFilter();
    this.updateQueryParams();
  }

  clearCategory() {
    this.selectedCategory = '';
    this.applyFilter();
    this.updateQueryParams();
  }

  // Search input
  onSearchChange() {
    this.applyFilter();
    this.updateQueryParams();
  }

  // Sort products
  applySort() {
    if (!this.sortOption) return;

    switch (this.sortOption) {
      case '1':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case '2':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case '3':
        this.filteredProducts.sort(
          (a, b) =>
            new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime()
        );
        break;
      case '4':
        this.filteredProducts.sort((a, b) =>
          a.productName.localeCompare(b.productName)
        );
        break;
    }
  }

  onSortChange() {
    this.applySort();
    this.updateQueryParams();
  }

  // Update URL query params
  updateQueryParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        category: this.selectedCategory || null,
        search: this.searchTerm || null,
        sort: this.sortOption || null,
      },
      queryParamsHandling: 'merge',
    });
  }

  // Navigate to product details page
  onViewDetails(product: any) {
    this.router.navigate(['/products/product-details', product.id], {
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
