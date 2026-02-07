import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler.js";
import orderRoutes from "./routes/orderRoutes.js";
import paypalRoutes from "./routes/paypalRoutes.js";

import cors from "cookie-parser";
dotenv.config();
connectDB();

const app = express();

const port = 5300;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/paypal", paypalRoutes);

app.get("/api/config/paypal", (req, res) => {
  const clientId = process.env.PAYPAL_CLIENT_ID;

  if (!clientId) {
    res.status(500).json({
      error: "Paypal client id is not configured",
    });
  }

  res.json({ clientId });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
