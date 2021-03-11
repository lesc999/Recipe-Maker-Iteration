const Person = require('../personModels')
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const loginController = {};

const secret = "bustedapp"

 loginController.signup = (req, res) => {
   console.log("hit signup!")
   newPerson = req.body
    const pass = newPerson.password
    const saltRounds = 10
    bcrypt.hash(pass, saltRounds)
    .then(hash => {
    console.log(`Hash: ${hash}`);
    Person.create({username: newPerson.username, password: hash}, 
      (err, result) =>{
        if(err){
        return res.status(400).json(err)
      } else {
        return res.status(200).json(result)
      }
    });
  })}
   

  loginController.login = (req, res) =>{
    Person.findOne({username: req.body.username}, (err, results) =>{
      bcrypt.compare(req.body.password, results.password)
      .then(result => {
        if(result){
          // const userObj = {
          //   username: req.body.username,
          // }
          // const token = jwt.sign(userObj, secret, { expiresIn: '1h' })
          res.status(200).cookie("user", req.body.username).redirect('/')
        }
    }
    )
    .catch(err => res.status(401).send(err))
  })}


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