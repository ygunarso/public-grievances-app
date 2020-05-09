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
            req.session.user = login_form_parameters.email;
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

// route to show User Profile

router.get('/profile', async (req, res) => {
    try {
        const newUser = await usersData.getUserByEmail(req.session.user); //userId?
        res.render('grievances/profile', { newUser: newUser })
    } catch (e) {
        res.render('grievances/error', { title: "error", message: e })
    }

});

// profile update Routes

router.get('/profileupdate', async (req, res) => {
    try {
        const newUser = await usersData.getUserByEmail(req.session.user);
        res.render('grievances/profileupdate', { newUser: newUser })
    } catch (e) {
        res.render('grievances/error', { title: "error", message: e })
    }

});

router.post('/profileupdate', async (req, res) => {
    const requestBody = req.body;
    let updatedObject = {};
    try {
        const oldPost = await usersData.getUserByEmail(req.session.user);
        if (requestBody.firstName && requestBody.firstName !== oldPost.firstName) updatedObject.firstName = requestBody.firstName;
        if (requestBody.lastName && requestBody.lastName !== oldPost.lastName) updatedObject.lastName = requestBody.lastName;
        if (requestBody.email && requestBody.email !== oldPost.email) updatedObject.email = requestBody.email;
        if (requestBody.city && requestBody.city !== oldPost.city)
            updatedObject.city = requestBody.city;
        if (requestBody.state && requestBody.state !== oldPost.state)
            updatedObject.state = requestBody.state;
    } catch (e) {
        res.status(404).json({ error: 'User not found to modify the record' });
        return;
    }

    try {
        const updatedUser = await usersData.updateUser(req.session.user, requestBody.firstName, requestBody.lastName, requestBody.email, requestBody.city, requestBody.state);
        res.render('grievances/UserUpdateSuccessful', { newUser: updatedUser })
        // res.json(updatedUser);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});


module.exports = router;
