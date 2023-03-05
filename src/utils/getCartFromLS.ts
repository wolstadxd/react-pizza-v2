import {CalcTotalPrice} from "./calcTotalPrice";
import {CartItem} from "../redux/slices/cart/types";

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart')
    const items = data ? JSON.parse(data) : []
    const totalPrice = CalcTotalPrice(items)

    return {
        items: items  as CartItem[],
        totalPrice
    }
}