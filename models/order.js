import moment from "moment";
export default class Order {
    constructor(id, orderItems, totalAmount, date) {
        this.id = id;
        this.orderItems = orderItems;
        this.totalAmount = totalAmount;
        this.date = date;
    }

    get readableDate() {
        return moment(this.date).format("MMMM Do YYYY");
    }
}
