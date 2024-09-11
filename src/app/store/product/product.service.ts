import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environment/environment'
import { Product } from './product.model'

@Injectable({ providedIn: 'root' })
export class ProductService {
    constructor(private readonly http: HttpClient) {}

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${environment.apiUrl}/products`)
    }

    getProductById(productId: number): Observable<Product> {
        return this.http.get<Product>(`${environment.apiUrl}/products/${productId}`)
    }
}
