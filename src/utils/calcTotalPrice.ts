import {CartItem} from "../redux/slices/cart/types";

export const CalcTotalPrice = (items: CartItem[]) => {
    return items.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum
    }, 0)
}