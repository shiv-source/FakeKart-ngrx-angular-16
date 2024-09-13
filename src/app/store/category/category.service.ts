import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { CategoryApiResponse, CategoryProductApiResponse } from './category.model'
import { CategoryProduct } from './category.reducer'

@Injectable({ providedIn: 'root' })
export class CategoryService {
    constructor(private http: HttpClient) {}

    getCategories(): Observable<string[]> {
        return this.http.get<CategoryApiResponse>(`${environment.apiUrl}/products/category`).pipe(map(res => res.categories))
    }

    getProductsByCategory(category: string): Observable<CategoryProduct> {
        return this.http
            .get<CategoryProductApiResponse>(`${environment.apiUrl}/products/category`, {
                params: {
                    type: category
                }
            })
            .pipe(map(res => <CategoryProduct>{ category, products: res.products }))
    }
}
