import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { addSelectedProduct, loadProducts } from 'src/app/store/product/product.action'
import { Product } from 'src/app/store/product/product.model'
import { selectProducts } from 'src/app/store/product/product.selector'
import { HomeComponent } from './home.component'

describe('HomeComponent', () => {
    let component: HomeComponent
    let fixture: ComponentFixture<HomeComponent>
    let mockStore: MockStore
    let mockRouter: Router
    let dispatchSpy: jasmine.Spy
    const mockProducts: Product[] = [
        {
            id: 2,
            title: 'Mens Casual Premium Slim Fit T-Shirts ',
            price: 22.3,
            description:
                'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
            category: "men's clothing",
            image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
            rating: {
                rate: 4.1,
                count: 259
            }
        },
        {
            id: 3,
            title: 'Mens Cotton Jacket',
            price: 55.99,
            description:
                'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
            category: "men's clothing",
            image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
            rating: {
                rate: 4.7,
                count: 500
            }
        }
    ]

    beforeEach(async () => {
        const routerSpy = jasmine.createSpyObj('Router', ['navigate'])

        await TestBed.configureTestingModule({
            declarations: [HomeComponent],
            providers: [
                provideMockStore({
                    selectors: [{ selector: selectProducts, value: mockProducts }]
                }),
                { provide: Router, useValue: routerSpy }
            ]
        }).compileComponents()

        fixture = TestBed.createComponent(HomeComponent)
        component = fixture.componentInstance
        mockStore = TestBed.inject(Store) as MockStore
        mockRouter = TestBed.inject(Router)
        dispatchSpy = spyOn(mockStore, 'dispatch')
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should dispatch loadProducts action on init', () => {
        component.ngOnInit()
        expect(dispatchSpy).toHaveBeenCalledWith(loadProducts())
    })

    it('should select products from the store', done => {
        component.products$.subscribe(products => {
            expect(products).toEqual(mockProducts)
            done()
        })
    })

    it('should navigate and dispatch addSelectedProduct action when onProductSelectEvent is called', () => {
        const selectedProduct: Product = {
            id: 2,
            title: 'Mens Casual Premium Slim Fit T-Shirts ',
            price: 22.3,
            description:
                'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
            category: "men's clothing",
            image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
            rating: {
                rate: 4.1,
                count: 259
            }
        }

        component.onProductSelectEvent(selectedProduct)

        expect(mockRouter.navigate).toHaveBeenCalledWith(['/product/2'])
        expect(dispatchSpy).toHaveBeenCalledWith(addSelectedProduct({ selectedProduct }))
    })
})
