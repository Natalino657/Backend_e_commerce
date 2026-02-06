import paypal from "@paypal/checkout-server-sdk";

import dotenv from "dotenv";

dotenv.config();

if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
  throw new Error(
    "Missing paypal Client or secret. Please check your .env file",
  );
}

const enviroment =
  process.env.NODE_ENV === "production"
    ? new paypal.core.LiveEnvironment(
        process.env.PAYPAL_CLIENT_ID,
        process.env.PAYPAL_CLIENT_SECRET,
      )
    : new paypal.core.SandboxEnvironment(
        process.env.PAYPAL_CLIENT_ID,
        process.env.PAYPAL_CLIENT_SECRET,
      );

const client = new paypal.core.PayPalHttpClient(enviroment);
export default client;
