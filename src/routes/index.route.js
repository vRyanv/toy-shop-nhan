const homeController=require("../app/Controller/homeController");
const proController=require("../app/Controller/ProductController");
const loginController =require("../app/Controller/loginController");
const authentication =require("../Middleware/authentication");
const registerController=require("../app/Controller/registerController");
const seniorController = require("../app/Controller/SeniorController");

function indexRoute(app){

    //login
    app.get("/",loginController.getLogin)
    app.post("/", authentication.checkLogin)

    //client
    app.get("/home",homeController.getHome)

    //register
    app.get("/register",registerController.register)
    app.post("/register",loginController.checkexist)

    //senior admin
    app.get("/dashboard-senior", authentication.checkCookieSeniorAdmin, seniorController.getDashboard)
    app.get("/dashboard-admin", authentication.checkCookieAdmin, loginController.checkexist)

    //shop
    app.post("/shop/new", authentication.checkCookieSeniorAdmin, seniorController.newShop)
    app.delete("/shop/delete", authentication.checkCookieSeniorAdmin, seniorController.deleteShop)

    app.get('*', homeController.notFound)
}
module.exports=indexRoute