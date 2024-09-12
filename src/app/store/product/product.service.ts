import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { ProductApiResponse, ProductsApiResponse } from 'src/app/interfaces/apiResponse'
import { environment } from 'src/environments/environment'
import { Product } from './product.model'

@Injectable({ providedIn: 'root' })
export class ProductService {
    constructor(private readonly http: HttpClient) {}

    getProducts(): Observable<Product[]> {
        return this.http
            .get<ProductsApiResponse>(`${environment.apiUrl}/products`)
            .pipe(map((res: ProductsApiResponse) => res.products))
    }

    getProductById(productId: number): Observable<Product> {
        return this.http
            .get<ProductApiResponse>(`${environment.apiUrl}/products/${productId}`)
            .pipe(map((res: ProductApiResponse) => res.product))
    }
}
