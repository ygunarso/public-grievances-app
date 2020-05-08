const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;

router.get('/', async (req, res) => {
    try {
        if (req.session.userId) {
            res.redirect('userhome');
        } else {
            res.render('grievances/index');
        }

    } catch (error) {
        res.status(401).json({ error: "Page Not Found" });
    }

});

router.get('/login', async (req, res) => {
    try {
        res.render('grievances/login');
    } catch (error) {
        res.status(401).json({ error: "Page Not Found" });
    }

});
router.get('/signup', async (req, res) => {
    try {
        res.render('grievances/signup');
    } catch (error) {
        res.status(401).json({ error: "Page Not Found" });
    }

});

router.post('/signup', async (req, res) => {
    let userInfo = req.body;
    if (!userInfo) {
        res.status(400).json({ error: 'You must provide data to create a user' });
        return;
    }
    if (!userInfo.firstName) {
        res.status(400).json({ error: 'You must provide a first name' });
        return;
    }
    if (!userInfo.lastName) {
        res.status(400).json({ error: 'You must provide a last name' });
        return;
    }
    if (!userInfo.email) {
        res.status(400).json({ error: 'You must provide an email' });
        return;
    }
    if (!userInfo.city) {
        res.status(400).json({ error: 'You must provide city' });
        return;
    }
    if (!userInfo.hashedPassword) {
        res.status(400).json({ error: 'You must provide password' });
        return;
    }
    if (!userInfo.state) {
        res.status(400).json({ error: 'You must provide state' });
        return;
    }
    try {
        const newUser = await usersData.addUser(userInfo.firstName, userInfo.lastName, userInfo.email, userInfo.hashedPassword, userInfo.city, userInfo.state);
        //res.json(newUser);
        req.session.user = newUser.email
        req.session.AuthCookie = req.sessionID;
        let sessionInfo = req.session.user
        res.render('grievances/profile', { newUser: newUser, sessionInfo: sessionInfo });
    } catch (e) {
        res.sendStatus(400);
    }

});

router.post('/login', async (req, res) => {
    try {
        console.log("Logging Innnn")
        let login_form_parameters = req.body;
        let user_auth = await usersData.logInUser(login_form_parameters.email, login_form_parameters.password);
        //here hashpassword is actually password entered by the user!! It is not hashed
        if (user_auth != -1) {
            req.session.userId = login_form_parameters.email;
            req.session.AuthCookie = req.sessionID; // alis for req.session.id;
            return res.status(201).redirect("userhome");
        } else {
            res.status(401).render('grievances/login', { message: "You entered wrong password" });
        }
    } catch (error) {
        res.status(401).json({ error: "Page Not Found" });
    }

});

router.get('/userhome', async (req, res) => {
    try {
        res.render('grievances/userhome');
    } catch (error) {
        res.status(401).json({ error: "Page Not Found" });
    }

});

router.get('/logout', async (req, res) => {
    try {
        req.session.destroy();
        res.redirect('/');
    } catch (error) {
        res.status(401).json({ error: "Page Not Found" });
    }

});


module.exports = router;
