require("dotenv").config();
const express = require("express");
const bookRouter = require("./routes/bookRouter");
const connectDB = require("./config/db");
const morgan = require("morgan");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const authorRouter = require("./routes/authorRouter");
const userRouter = require("./routes/userRouter");
const loanRouter = require("./routes/loanRouter");
const reviewRouter = require("./routes/reviewRouter");
const path = require("path");

const app = express();

//Database connection
connectDB();

//logger middleware
app.use(morgan("dev"));

//express middleware
app.use(express.json());

//serve static files
const uploadsPath = path.join(__dirname, "uploads"); // Absolute path to uploads folder
const serveUploads = express.static(uploadsPath);    // Middleware to serve static files

//Routes middleware
app.use("/books", bookRouter);
app.use("/authors", authorRouter);
app.use("/uploads", serveUploads);
app.use("/users", userRouter);
app.use("/loans", loanRouter);
app.use("/books/:id/reviews", reviewRouter);

//Not found middleware
app.use(notFound);

//Error handler
app.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port , () =>{
    console.log(`Server is running on port ${port}`);
});
