import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CartItem } from "src/app/common/cart-item";
import { Product } from "src/app/common/product";
import { CartService } from "src/app/services/cart.service";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"],
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  handleProductDetails() {
    //get "id" param string convert to number
    const theProductId: number = +this.route.snapshot.paramMap.get("id")!;

    this.productService.getProduct(theProductId).subscribe((data) => {
      this.product = data;
    });
  }

  addToCart(theProduct: Product) {
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }
}
