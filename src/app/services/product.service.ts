import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "../common/product";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ProductCategory } from "../common/product-category";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private categoryUrl = "http://localhost:8080/api/product-category";
  private baseUrl = "http://localhost:8080/api/products";

  constructor(private httpClient: HttpClient) {}

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient
      .get<GetResponseProducts>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }

  getProduct(theProductId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  getProductListPaginate(
    thePage: number,
    thePageSize: number,
    theCategoryId: number
  ): Observable<GetResponseProducts> {
    //need to build URL based on category id, page and size
    const searchUrl =
      `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}` +
      `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductList(theCategoryId: number): Observable<Product[]> {
    //need to build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductsCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }
}
//unwrap the JSON from Spring Data REST _embedded entry
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
//unwrap the JSON from Spring Data REST _embedded entry
interface GetResponseProductsCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
