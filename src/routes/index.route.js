const homeController=require("../app/Controller/homeController");
const proController=require("../app/Controller/ProductController");
const loginController =require("../app/Controller/loginController");
const authentication =require("../Middleware/authentication");
const registerController=require("../app/Controller/registerController");
const seniorController = require("../app/Controller/SeniorController");
const adminController = require("../app/Controller/AdminController");
const upload = require("../Middleware/upload");

function indexRoute(app){

    //login
    app.get("/",loginController.getLogin)
    app.post("/", authentication.checkLogin)
    app.get("/logout", loginController.logout)

    //client
    app.get("/home", authentication.checkLoginCust, homeController.getHome)
    app.get("/cust-search-pro/:name",homeController.custSearchPro)

    //register
    app.get("/register",registerController.register)
    app.post("/register",loginController.checkexist)

    //senior admin
    app.get("/dashboard-senior", authentication.checkCookieSeniorAdmin, seniorController.getDashboard)


    //shop
    app.post("/shop/new", authentication.checkCookieSeniorAdmin, seniorController.newShop)
    app.get("/shop/edit/:id", authentication.checkCookieSeniorAdmin, seniorController.getInfoShop)
    app.post("/shop/edit/", authentication.checkCookieSeniorAdmin, seniorController.updateShop)
    app.delete("/shop/delete", authentication.checkCookieSeniorAdmin, seniorController.deleteShop)

    //staff
    app.get('/staff', authentication.checkCookieSeniorAdmin, seniorController.staffList)
    app.post('/staff/new', authentication.checkCookieSeniorAdmin, seniorController.newStaff)
    app.get('/staff/edit/:id', authentication.checkCookieSeniorAdmin, seniorController.getStaffInfo)
    app.put('/staff/edit', authentication.checkCookieSeniorAdmin, seniorController.updateStaff)
    app.delete('/staff/delete', authentication.checkCookieSeniorAdmin, seniorController.deleteStaff)

    //category
    app.get('/category', authentication.checkCookieAdmin, adminController.getCateList)
    app.post('/category/new', authentication.checkCookieAdmin, adminController.newCate)
    app.get('/category/edit/:id', authentication.checkCookieAdmin, adminController.getInfoCate)
    app.put('/category/edit', authentication.checkCookieAdmin, adminController.updateCate)
    app.delete('/category/delete', authentication.checkCookieAdmin, adminController.deleteCate)

    //supplier
    app.get('/supplier', authentication.checkCookieAdmin, adminController.getSupList)
    app.post('/supplier/new', authentication.checkCookieAdmin, adminController.newSup)
    app.get('/supplier/edit/:id', authentication.checkCookieAdmin, adminController.getSupInfo)
    app.put('/supplier/edit', authentication.checkCookieAdmin, adminController.updateSup)
    app.delete('/supplier/delete', authentication.checkCookieAdmin, adminController.deleteSup)

    //product
    app.get("/dashboard-admin", authentication.checkCookieAdmin, adminController.getProList)
    app.get('/product/find/:name', authentication.checkCookieAdmin, adminController.findPro)
    app.post('/product/new', authentication.checkCookieAdmin, upload.single('proImage'), adminController.newPro)
    app.get('/product/edit/:id', authentication.checkCookieAdmin, adminController.getProInfo)
    app.put('/product/edit', authentication.checkCookieAdmin, upload.single('proImage'),adminController.updatePro)
    app.delete('/product/delete', authentication.checkCookieAdmin, adminController.deletePro)

    //404
    app.get('*', homeController.notFound)
}
module.exports=indexRoute