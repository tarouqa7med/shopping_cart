import { Component, computed, signal, AfterViewInit } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Navbar } from './navbar/navbar';
import { LoadingPage } from './loadingPage/loadingPage';

declare const WOW: any;

type Product = {
        id: number,
        name: string,
        price: number,
        quantity: number,
        img: string
}
@Component({
        imports: [Navbar, CommonModule, LoadingPage],
        selector: 'app-root',
        styleUrl: './app.scss',
        templateUrl: './app.html',
})
export class App implements AfterViewInit { 

        constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

        ngAfterViewInit(): void {
                if (isPlatformBrowser(this.platformId)) {
                        new WOW({
                                boxClass: 'wow',
                                animateClass: 'animate__animated',
                                offset: 0,
                                mobile: true,
                                live: true
                        }).init();
                }
        }

        products = signal<Product[]>([
                {
                        id: 0,
                        name: "Logitech G502 HERO High Performance Gaming Mouse-USB",
                        price: 22.5,
                        quantity: 0,
                        img: "1.png"
                },
                {
                        id: 1,
                        name: "Cooler Master Devastator 3 Plus",
                        price: 24,
                        quantity: 0,
                        img: "2.png"
                },
                {
                        id: 2,
                        name: "X4 / S18 Laptop Cooling Pad",
                        price: 18,
                        quantity: 0,
                        img: "3.png"
                },
                {
                        id: 3,
                        name: " Western Digital External Storage 1TB HDD",
                        price: 65,
                        quantity: 0,
                        img: "4.png"
                },
                {
                        id: 4,
                        name: "HP E-Series: HP E27m G4 QHD USB-C Conferencing Monitor",
                        price: 305.95,
                        quantity: 0,
                        img: "5.png"
                },
                {
                        id: 5,
                        name: "Logitech C310 HD 720p Webcam",
                        price: 49.99,
                        quantity: 0,
                        img: "6.png"
                },
                {
                        id: 6,
                        name: "ZealSound K66 Pro USB Condenser Microphone",
                        price: 34.99,
                        quantity: 0,
                        img: "7.png"
                },
                {
                        id: 7,
                        name: "HP OMEN 45L Gaming Desktop (GT22) Intel Core i7 13700KF",
                        price: 3769,
                        quantity: 0,
                        img: "8.png"
                },
                {
                        id: 8,
                        name: "HP Envy x360 14inch 2-in-1 Laptop - 16GB DDR4 - 512GB NVMe SSD",
                        price: 774.05,
                        quantity: 0,
                        img: "9.png"
                },
                {
                        id: 9,
                        name: "HOMCOM Swivel Reclining Gaming Chair with Footrest",
                        price: 230.81,
                        quantity: 0,
                        img: "10.png"
                },
                {
                        id: 10,
                        name: "Intel Core Ultra 9 285K Processor",
                        price: 632,
                        quantity: 0,
                        img: "11.png"
                },
                {
                        id: 11,
                        name: "Palit GeForce RTX 5090 GameRock OC 32GB GDDR7",
                        price: 8090.26,
                        quantity: 0,
                        img: "12.png"
                },
        ]);

        maxQuantity: number = 100;
        minQuantity: number = 0;
        disabled: boolean = true;

        totalItems = computed(() => {
                return this.products().reduce(function (total, item) {
                        return total + item.quantity;
                }, this.minQuantity);
        })
        totalPrice = computed(() => {
                return this.products().reduce(function (total, item) {
                        return total + (item.price * item.quantity);
                }, this.minQuantity);
        })

        increaseQuantity($index: number) {
                this.products.update(function (temp) {
                        return temp.map(function (product) {
                                if (product.id == $index) {
                                        product.quantity++;
                                        return product;
                                } else { return product };
                        })
                })
        }
        decreaseQuantity($index: number) {
                this.products.update(function (temp) {
                        return temp.map(function (product) {
                                if (product.id == $index) {
                                        product.quantity--;
                                        return product;
                                } else { return product };
                        })
                })
        }
}
