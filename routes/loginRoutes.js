const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;
const issuesData = data.issues;

router.get('/', async (req, res) => {
    try {
        if (req.session.user) {
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

router.get('/adminLogin', async (req, res) => {
    try {
        res.render('grievances/adminLogin');
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
        if (newUser === 1){
            res.render('grievances/error', { title: "Error", message: "User With this email Id already exists"});
        }
        else{
            req.session.user = newUser.email
            req.session.AuthCookie = req.sessionID;
            let sessionInfo = req.session.user
            return res.status(201).redirect("userhome");
        }
        //res.render('grievances/profile', { newUser: newUser, sessionInfo: sessionInfo });
    } catch (e) {
        res.render('grievances/error', { title: "Error", message: e });
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


router.post('/adminLogin', async (req, res) => {
    try {
        console.log(" Admin Logging Innnn")
        let login_form_parameters = req.body;
        let user_auth = await usersData.logInAdmin(login_form_parameters.email, login_form_parameters.password); // Admin Login function called
        //here hashpassword is actually password entered by the user!! It is not hashed
        if (user_auth != -1) {
            req.session.user = login_form_parameters.email;
            req.session.AuthCookie = req.sessionID; // alis for req.session.id;
            return res.status(201).redirect("adminHome");
        } else {
            res.status(401).render('grievances/adminLogin', { message: "You entered wrong password" });
        }
    } catch (error) {
        res.status(401).json({ error: "Page Not Found" });
    }

});

router.get('/adminHome', async (req, res) => {
    try {
        let issueList = await issuesData.getAllIssues();
        let sessionInfo = req.session.user;


        res.render('grievances/adminHome', { sessionInfo: sessionInfo, issueList: issueList });
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

//view all my issues
router.get('/ViewAllMyIssues', async (req, res) => {
    try {
        const newUser = await usersData.getUserByEmail(req.session.user); //userId?
        let sessionInfo = req.session.user
        const issueByUserId = await issuesData.getIssuesByUserId(newUser._id)
        res.render('grievances/ViewAllMyIssues', { issueByUserId: issueByUserId, sessionInfo: sessionInfo })
    } catch (e) {
        res.render('grievances/error', { title: "error", message: "No issues found" })
    }

});

//update issues
router.get('/issueUpdate/:id', async (req, res) => {
    try {
        if (req.session.user === undefined) {
            return res.render('grievances/error', { title: "error", message: "User Not Logged In" })
        }
        const issue = await issuesData.getIssueById(req.params.id)
        res.render('grievances/issueUpdate', { issue: issue })
        // const newUser = await usersData.getUserByEmail(req.session.user);
        // res.render('grievances/profileupdate', { newUser: newUser })
    } catch (e) {
        res.render('grievances/error', { title: "error", message: e })
    }
});

router.post('/issueUpdate/:id', async (req, res) => {
    if (req.session.user === undefined) {
        return res.render('grievances/error', { title: "error", message: "User Not Logged In" })
    }
    const requestBody = req.body;
    let updatedObject = {};
    try {
        const oldIssue = await issuesData.getIssueById(req.params.id)
        if (requestBody.name && requestBody.name !== oldIssue.name) updatedObject.name = requestBody.name;
        if (requestBody.category && requestBody.category !== oldIssue.category) updatedObject.category = requestBody.category;
        if (requestBody.date && requestBody.date !== oldIssue.date) updatedObject.date = requestBody.date;
        if (requestBody.latitude && requestBody.latitude !== oldIssue.latitude) updatedObject.latitude = requestBody.latitude;
        if (requestBody.longitude && requestBody.longitude !== oldIssue.longitude) updatedObject.longitude = requestBody.longitude;
        if (requestBody.city && requestBody.city !== oldIssue.city)
            updatedObject.city = requestBody.city;
        if (requestBody.state && requestBody.state !== oldIssue.state)
            updatedObject.state = requestBody.state;
    } catch (e) {
        res.status(404).json({ error: 'Issue not found to modify the record' });
        return;
    }

    try {
        const updatedIssue = await issuesData.updateIssue(req.params.id, requestBody.name, requestBody.category, requestBody.date, requestBody.latitude, requestBody.longitude, requestBody.city, requestBody.state)
        let sessionInfo = req.session.user;
        const issueList = [updatedIssue];
        res.render('grievances/issueUpdateSuccessful', { issueList: issueList, sessionInfo: sessionInfo })
        // res.json(updatedUser);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});
// Delete User Route
router.get('/deleteAccount', async (req, res) => {
    try {
        await usersData.removeUser(req.session.user);
        req.session.destroy();
        res.redirect('/');
    } catch (e) {
        res.status(500).render()
    }
});
//delete issue
router.post('/issueDelete/:id', async (req, res) => {
    try {
        const result = await issuesData.removeIssue(req.params.id)
        res.redirect('/ViewAllMyIssues');
    } catch (e) {
        res.status(500).render()
    }
});
module.exports = router;
