import express from "express";
import cors from "cors";

// App configurations
const app = express();

// Middlewares
app.use(express.json({ limit: "16kb" }));
app.use(cors());

// Routes imports
import productRouter from "./routes/products.routes.js";
import categoryRouter from "./routes/categories.routes.js";
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/users", userRouter);

export { app };
