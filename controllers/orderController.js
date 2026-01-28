import asyncHandler from "../middleware/asyncHandler";
import Order from "../models/orderModal";
import Product from "../models/productModel";
import { calcPrice } from "../utils/calcPrice";

const addOrderItem = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymantMethod } = req.body;

  //if(!orderItems || orderitems.length === 0)
  if (!orderItems?.length) {
    res.status(400);
    throw new Error("No order Items");
  }

  const itemsFromDB = await Product.find({
    _id: { $in: orderItems.map((x) => x._id) },
  });
});
