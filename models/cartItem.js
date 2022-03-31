export class CartItem {
    constructor(quantity, title, price, sum, image, ownerPushToken) {
        this.quantity = quantity;
        this.title = title;
        this.price = price;
        this.sum = sum;
        this.image = image;
        this.ownerPushToken = ownerPushToken|| null;
    }
}
