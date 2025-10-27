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
    this.fetchProduct();

    // Apply category from URL if present
    this.route.queryParams.subscribe((params) => {
      if (params['category']) {
        this.selectedCategory = params['category'];
        this.applyFilter();
      } else if (!params['category'] && this.selectedCategory) {
        this.clearFilter(false);
      }
    });
  }

  // Fetch products
  fetchProduct() {
    this.productsService.getProductData().subscribe({
      next: (products) => {
        this.products = products;
        this.applyFilter();
      },
      error: (err) => console.log(err),
    });
  }

  // Filter by category and update URL
  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category },
      queryParamsHandling: 'merge',
    });
    this.applyFilter();
  }

  // Clear category filter
  clearFilter(updateUrl: boolean = true) {
    this.selectedCategory = '';
    if (updateUrl) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { category: null },
        queryParamsHandling: 'merge',
      });
    }
    this.applyFilter();
  }

  // Apply category + search filters and then sort
  applyFilter() {
    this.filteredProducts = this.products.filter((p) => {
      const matchesCategory = !this.selectedCategory || p.category === this.selectedCategory;
      const matchesSearch = !this.searchTerm || p.productName.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    this.sortProducts();
  }

  filterProducts() {
    this.applyFilter();
  }

  // Sort products based on selected option
  sortProducts() {
    if (!this.sortOption) return;

    switch (this.sortOption) {
      case '1': // Price: Low to High
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case '2': // Price: High to Low
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case '3': // Newest First
        this.filteredProducts.sort(
          (a, b) => new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime()
        );
        break;
      case '4': // Name: A-Z
        this.filteredProducts.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
    }
  }

  // Navigate to product details
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
