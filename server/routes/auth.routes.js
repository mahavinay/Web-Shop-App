const { Router } = require("express");
const router = Router();
const passport = require("passport");
const bcrypt = require("bcrypt");


const User = require("../models/user.model");

router.post("/signup", (req,res) =>{
    const { username, password, email } = req.body;

    if (!username || !email || !password) {
        res.status(400).json({ message: "Provide username and password and email" });
        return;
      }
    
      const emailFormatRegex = /^\S+@\S+\.\S+$/;

      if (!emailFormatRegex.test(email)) {
        res.status(400).json({message : "Please use a valid email address."})
        
        return;
      }

      if (password.length < 7) {
        res.status(400).json({
          message:
            "Please make your password at least 8 characters long for security purposes.",
        });
        return;
      }

      User.findOne({ username }, (err, foundUser) => {
        if (err) {
            res.status(500).json({ message: "Username check went bad." });
            return;
          }

          if (foundUser) {
            res.status(400).json({ message: "Username exists. Choose another one." });
            return;
          }

          const salt = bcrypt.genSaltSync(10);
          const hashPass = bcrypt.hashSync(password, salt);

          const aNewUser = new User({
            username: username,
            email: email,
            password: hashPass,
          });
          aNewUser.save((err) => {
            // When/If any issues arise while saving the user to the database
            if (err) {
              res
                .status(400)
                .json({ message: "Saving user to database went wrong." });
              return;
            }
      
            // Automatically log in user after sign up
            // .login() here is actually predefined passport method
            req.login(aNewUser, (err) => {
              if (err) {
                res.status(500).json({ message: "Login after signup went bad." });
                return;
              }

              res.status(200).json(aNewUser);
            });
          });


      });

});

router.post("/login", (req,res,next) =>{
    passport.authenticate("local", (err, theUser, failureDetails) =>{
        if(err){
            res
            .status(500)
            .json({message : "Something went wrong authenticating user"})
            return;
        }

        if(!theUser) {
            res
            .status(401)
            .json(failureDetails)
            return;
        }

        req.login(theUser, (err) =>{
            if(err){
                res.status(500).json({message: "Session save went wrong"})
                return;
            }
            res.status(200).json(theUser)
        })
    })(req,res,next)

})

router.post("/logout", (req,res,next) =>{
    req.logout();
    res.status(200).json({message: "Logout Succussful"})
})

router.get("/loggedin", (req,res,next) =>{
    if(req.isAuthenticated()){
        res.status(200).json(req.user)
        return;
    }
    res.status(403).json({message: "Unauthorized"});
})

module.exports = router;