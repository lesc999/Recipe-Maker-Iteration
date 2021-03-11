const Person = require('../personModels')
const bcrypt = require('bcrypt');


const loginController = {};

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

 loginController.signup = (req, res) => {
   newPerson = req.body
    const pass = newPerson.password
    const saltRounds = 10
    bcrypt.hash(pass, saltRounds)
    .then(hash => {
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
          res.status(200).cookie("user", req.body.username).redirect('/')
        }
    }
    )
    .catch(err => res.status(401).send(err))
  })}



module.exports = loginController