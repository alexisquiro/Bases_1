const express=require('express');


const app = express();

const port = process.env.PORT || 4000; // set our port


app.set('json spaces',2)

//midlewere

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//routes
app.use(require('./routes/index'))


app.listen(port);

console.log(`Server started on port ${port}`);