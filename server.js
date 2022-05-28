import express from "express";
import cors from "cors";
import Path from "path";
import BodyParser from "body-parser";
import compression from "compression";

import MainRouter from "./api/main.route.js";

const __dirname = Path.resolve();

const app = express();
import UserForm from "./user.js";
global.User = new UserForm();

//basic set up for server
app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(BodyParser.json());
app.use(
    ["/customer", "/manager"],
    express.static("images", { maxAge: 3600000 })
);
app.use(compression({ filter: shouldCompress }));

// app.use(((req, res, next) => {
//     //when it is not logged in and url is main or admin page then redirect to main page
//     if (!User.loggedIn && req.url != "/" && req.url != "/customer") {
//         res.redirect(process.env.MAIN_PAGE)
//     }
//     //when it is logged in and
//     else if (User.loggedIn && !req.url.includes(`/${User.role}`) && req.url != "/") {
//         res.redirect(process.env.MAIN_PAGE)
//     }
//     else {
//         next()
//         console.log(User)
//     }
// }))

//use MainRouter for main page and suburl
app.use("/", MainRouter);

export default app;
