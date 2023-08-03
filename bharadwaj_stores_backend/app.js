const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const authRouter = require('./routes/auth');
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');


dbConnect();


app.use(morgan('dev'));
app.use(bodyParser.json()); //'Content-type':'application/json'
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/api/user', authRouter);
// app.use('/api/product', productRouter);
// app.use('/api/blog', blogRouter);
// app.use('/api/category', productCategoryRouter);
// app.use('/api/blogcategory', blogCategoryRouter);
// app.use('/api/brand', brandRouter);
// app.use('/api/coupon', couponRouter);


app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})