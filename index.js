
require('dotenv').config();
import express from "express";
import cors from "cors";
import helmet  from "helmet";
import passport from "passport";
// const mongoose = require('mongoose');

// database connection
import ConnectDB from "./database/connection"

//google Authentication config
import googleAuthConfig from "./config/google.config";  

// private route authentication config
import privateRouteConfig from "./config/route.config";


//API 
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant";
import Food from "./API/Food";
import Menu from "./API/Menu";
import Image from "./API/Image";
import Order from "./API/Orders";
import Review from "./API/Reviews";
import User from "./API/User";

// passport congif 
googleAuthConfig(passport);
privateRouteConfig(passport);

const zomato = express();
zomato.use(cors());
zomato.use(express.json());
zomato.use(helmet()); 
zomato.use(passport.initialize());
// zomato.use(passport.session());


// applications routes 
zomato.use("/auth",Auth);
zomato.use("/restaurant", Restaurant);
zomato.use("/food", Food);
zomato.use("/menu", Menu);
zomato.use("/image", Image);
zomato.use("/order", Order);
zomato.use("/review", Review);
zomato.use("/user", User);

const PORT=process.env.PORT||4000;

zomato.listen(PORT,() => {
    ConnectDB().then(() => {
        console.log("server is running !!!");
    }) 
    .catch((error) => {
        console.log("server is running ,but connection to database is failed");
        console.log(error);
    })
});

     









