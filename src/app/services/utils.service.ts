import { Injectable } from '@angular/core'
import { Product } from '../store/product/product.model'

@Injectable({ providedIn: 'root' })
export class UtilsService {
    constructor() {}

    getRandomItems<T>(arr: Array<T>, count: number): T[] {
        const mutableArr = [...arr]
        for (let i = mutableArr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            ;[mutableArr[i], mutableArr[j]] = [mutableArr[j], mutableArr[i]]
        }
        return mutableArr.slice(0, count)
    }

    getPriceAfterDiscount(product: Product) {
        return product.price - (product?.discount ?? 0)
    }

    getDiscountPercent(product: Product) {
        return Math.round(((product?.discount ?? 0) / product.price) * 100)
    }
}
