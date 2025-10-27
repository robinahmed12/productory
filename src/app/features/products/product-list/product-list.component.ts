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
  displayedProducts: Product[] = [];
  categories: string[] = ['Analytics', 'Roadmaps', 'Collaboration', 'Planning'];

  selectedCategory = '';
  searchTerm = '';
  sortOption = '';
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProducts();

    this.route.queryParams.subscribe((params) => {
      this.selectedCategory = params['category'] || '';
      this.searchTerm = params['search'] || '';
      this.sortOption = params['sort'] || '';
      this.currentPage = +params['page'] || 1;
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

  applyFilter() {
    this.filteredProducts = this.products.filter((p) => {
      const matchCategory =
        !this.selectedCategory || p.category === this.selectedCategory;
      const matchSearch =
        !this.searchTerm ||
        p.productName.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });

    this.applySort();

    this.totalPages = Math.ceil(
      this.filteredProducts.length / this.itemsPerPage
    );
    this.paginateProducts();
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.currentPage = 1;
    this.applyFilter();
    this.updateQueryParams();
  }

  clearCategory() {
    this.selectedCategory = '';
    this.currentPage = 1;
    this.applyFilter();
    this.updateQueryParams();
  }

  onSearchChange() {
    this.currentPage = 1;
    this.applyFilter();
    this.updateQueryParams();
  }

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
    this.currentPage = 1;
    this.applySort();
    this.paginateProducts();
    this.updateQueryParams();
  }

  updateQueryParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        category: this.selectedCategory || null,
        search: this.searchTerm || null,
        sort: this.sortOption || null,
        page: this.currentPage !== 1 ? this.currentPage : null,
      },
      queryParamsHandling: 'merge',
    });
  }

  paginateProducts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.displayedProducts = this.filteredProducts.slice(start, end);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginateProducts();
    this.updateQueryParams();
  }

  onViewDetails(product: Product) {
    this.router.navigate(['/products/product-details', product.id], {
      queryParams: {
        category: product.category,
        productName: product.productName,
        price: product.price,
      },
      queryParamsHandling: 'merge',
    });
  }
}
