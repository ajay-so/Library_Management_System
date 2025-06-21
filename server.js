require("dotenv").config();
const express = require("express");
const bookRouter = require("./routes/bookRoutes");
const connectDB = require("./config/db");
const morgan = require("morgan");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const authorRouter = require("./routes/authorRoutes");

const app = express();

//Database connection
connectDB();

//Middlewares
app.use(morgan("dev"));

//express middleware
app.use(express.json());

app.use("/books", bookRouter);
app.use("/authors", authorRouter);

//Not found middleware
app.use(notFound);

//Error handler
app.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port , () =>{
    console.log(`Server is running on port ${port}`);
});
