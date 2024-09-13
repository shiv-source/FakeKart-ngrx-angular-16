import { Directive, HostListener } from '@angular/core'

@Directive({
    selector: '[scrollToTop]'
})
export class ScrollToTopDirective {
    constructor() {}

    @HostListener('click', ['$event'])
    onClick() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}
