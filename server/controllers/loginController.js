const Person = require('../personModels')
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');

const loginController = {};

 loginController.signup = (req, res) => {
   console.log("hit signup!")
   newPerson = req.body
    const pass = newPerson.password
    const saltRounds = 2
    bcrypt.hash(pass, saltRounds, (err, hash)=>{
      if(err){res.send(err)}else{
      console.log("hashing!")
    return hashedpw4db= {
      saltRounds:saltRounds,
      notEncrypted: pass,
      encrypted: hash
    }}
  })
  console.log(hashedpw4db, "hashed encryption")
    Person.create({username: newPerson.username, password: hashedpw4db}, 
      (err, result) =>{
        if(err){
        return res.status(400).json(err)
      } else {
        return res.status(200).json(result)
      }
    });
  }

  loginController.login = (req, res) =>{
    Person.findOne({username: req.body.username, password: req.body.password}, (err, people) =>{
      if(err){
        return res.status(400).json(err)
      }else if(!people){res.status(401).send("no dice, bruh")}
      else{
        res.redirect('http://localhost:3000/')
      }
    })
  }


  // loginController.login = (req, res) =>{
  //   console.log("login hit,", req.body.password)
  //     passport.authenticate('local'),  function(err, user, info) {
  //       if (err) { return next(err); }
  //       if (!user) { return res.redirect('/login'); }
	
	// // NEED TO CALL req.login()!!!
  //       req.login(user, next);
  //   }(req, res, next)
  // }
/*  

passport.use(UserDetails.createStrategy());

passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());  

  loginController.login = (req, res, next)=>{
  let id = req.body maybe
Item.find({ username: username})
//possible logic for password 
if (passwo)
 }

*/

module.exports = loginController