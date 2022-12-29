const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");


require("./db/conn");



const Register = require("./models/register");
const { LOADIPHLPAPI } = require("dns");
const { log, Console } = require("console");


const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path)


app.get("/",(req,res)=>{
    res.render("login");
});

app.get("/index",(req,res)=>{
    res.render("index");
});

app.get("/shop",(req,res)=>{
    res.render("shop");
});

app.get("/blog",(req,res)=>{
    res.render("blog");
});

app.get("/about",(req,res)=>{
    res.render("about");
});

app.get("/contact",(req,res)=>{
    res.render("contact");
});

app.get("/cart",(req,res)=>{
    res.render("cart");
});

app.get("/sproduct",(req,res)=>{
    res.render("sproduct");
});

app.get("/register",(req,res) =>{
    res.render("register");
});

app.get("/login",(req,res) =>{
    res.render("login");
});

app.post("/register", async (req,res) =>{
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){
            const registerCustomer = new Register({
                name : req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: password,
                confirmpassword: cpassword
            });

           const registered = await registerCustomer.save();
           res.status(201).render("index");
        }
        else{
            res.send("Password are not matching")
        }
    } catch (error) {
        res.status(400).send(error);
    }
});


// login validation


app.post("/login", async (req,res) =>{
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email})
        
        if(useremail.password === password){
            res.status(201).render("index");
        }
        else{
            res.send("invalid login details");
        }

    } catch (error) {
        res.status(400).send("invalid login details");
    }
});


app.listen(port, () =>{
    console.log(`Server is running at port no ${port}`);
});




