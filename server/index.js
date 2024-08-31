const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const tokenRoute = require("./routes/tokenRoute");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const corsOptions = {
    origin: '*', 
    methods: 'GET, POST, PUT, DELETE, OPTIONS', 
    allowedHeaders: 'Content-Type, Authorization', 
};

app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/', tokenRoute);

const port = process.env.PORT || 8000;

const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (err) {
        console.log(err);
    }
};

start();