# CS 546 Project: Public Grievances Application
Group Members: Steven Gunarso, Samir Shah, Rajit Gohel, Devila Bakrania

Video Walkthrough : https://www.youtube.com/watch?v=xEWF8WUnzo4&t=69s
Video Created by Rajit Gohel

Please replace my google maps API keys with yours in order to view the maps functionality.These keys are present in various handlebars files.

The idea of the application is to allow users (citizens) to post public grievances instantaneously on the web application. The admins (public workers) then verifies the complaint, handles it, and resolves the issue. The value of the application is a platform for easy communication between citizens and local/state government. This web application can be deployed and integrated in the public service sector of government (police, fire department, etc).

## Setup

Make sure you have MongoDB installed on your local machine

### Clone repository
```sh
$ git clone git@github.com:ygunarso/public-grievances-app.git
$ cd public-grievances-app
```

### Install dependencies
```sh
$ npm install
```

### Populate database with seed file
```sh
$ npm run seed
```

### Run Application
```sh
$ npm start
```
Go to http://localhost:3000/

## More Information

1. Admin accounts will be able to view all posted issues through the admin login
2. Admin accounts will also be able to create new issues through the user login
3. The "Download All Issues" button will download all the posted issues as a "summary.txt" file to the project folder

USER LOGIN INFO
User1
Email : samir@gmail.com
Password: Samir123
User 2
Email: rajit@gmail.com
Password: Rajit123
User 3
Email: steve@gmail.com
Password: Steve123

ADMIN LOGIN INFO
Email: admin@gmail.com
Password: Admin123

NOTE : Please Use Google Chrome as preferred browser. Enable the user location.
Please create Issues for each user except Admin.
Users have been populated using seed file.
