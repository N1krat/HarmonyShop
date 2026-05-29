import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SHARED_UI_IMPORTS } from '../../../shared/shared-ui.imports';
import { TranslationService } from '../../core/services/translation.service';
import { LanguageService } from '../../core/services/language.service';
import { AdminService } from '../../core/services/admin.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product-detail-body',
  standalone: true,
  imports: [FormsModule, RouterModule, ...SHARED_UI_IMPORTS],
  templateUrl: './body.html',
  styleUrls: ['./body.css']
})
export class ProductDetailBodyComponent implements OnInit, OnDestroy {
  product?: any;
  quantity = 1;
  selectedImage = '';
  private langSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private cartService: CartService,
    private translationService: TranslationService,
    private languageService: LanguageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.langSub = this.languageService.language$.subscribe(() => {
      this.cdr.markForCheck();
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadProduct(id);
    }
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }

  loadProduct(id: number): void {
    this.adminService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.selectedImage = data.images?.[0] || '';
        this.quantity = 1;
      },
      error: (err) => {
        console.error('Error loading product:', err);
      }
    });
  }

  selectImage(img: string): void {
    this.selectedImage = img;
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  getImageUrl(imgPath?: string): string {
    return imgPath ? `http://localhost:3000${imgPath}` : 'assets/no-image.png';
  }

  addToCart(product: any): void {
    if (!product?.id) {
      alert(this.translationService.translate('productPage.invalidProduct'));
      return;
    }

    this.cartService.addToCart({
      id: product.id,
      name: product.name || 'Unknown',
      price: product.price || 0,
      quantity: this.quantity,
      image: product.images?.[0] || product.image || ''
    });

    alert(this.translationService.translate('productPage.addedToCart', {
      name: product.name || 'Product',
      qty: this.quantity
    }));
    this.quantity = 1;
  }
}
