# CS 546 Project: Public Grievances Application
Group Members: Yohanes Steven Gunarso, Samir Shah, Rajit Gohel, Devila Bakrania

The idea of the application is to allow users (citizens) to post public grievances instantaneously on the web application. The admins (public workers) then verifies the complaint, handles it, and resolves the issue. The value of the application is a platform for easy communication between citizens and local/state government.  This web application can be deployed and integrated in the public service sector of government (police, fire department, etc).

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
$ npm seed
```

### Run Application
```sh
$ npm start
```
Go to <a href="https://localhost:3000">this link</a>.

## More Information

1. Admin accounts will be able to view all posted issues through the admin login
2. Admin accounts will also be able to create new issues through the user login
3. The "Download All Issues" button will download all the posted issues as a "summary.txt" file to the project folder
