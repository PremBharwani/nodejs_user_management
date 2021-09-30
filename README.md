# Node.js user data management server using MongoDB

> A Node.js server to work perform CRUD operations on user's data stored on a cloud database ( MongoDB ).


## Description
I took a simple use case here, I am handling user's social media handles ( You can customise it to any other data according to your requirement ). This server can Create, Update, Delete, and Read from this database.

( I am yet to implement a email-confirmation system to perform data modification from authenticated users only, which I plan to do using the `nodemailer` module. )

(Each request has to have an identifier for the user and other required details formatted in JSON format while making the request)

Serving endpoints and their descriptions are :
* Creating a new user : `/add `
* Updating the existing users detail : `/update `
* Deleting the user's detail : `/remove`
* To fetch the information of a particular user : `/info`


## Usage

Firstly you will have to setup your MongoDB, and then enter your MongoDB *connection string* in the `app.js` file, line 11 :
```
...
const connectionString = <ENTER_YOUR_CONNECTION_STRING_HERE>
...
```

[Also make sure you have whitelisted your device's IP address using the MongoDB console]

And then after going to the directory, run the following command to get the server running:
```
$ node app.js
```

Next make use of `curl` command or any tools ( `Insomnia` , etc.) to make your requests to the server.

Each request should always have the indentifier( 'roll' in my case ), and along with that other detials as per the requirements :
Example request, Using the `/add` endpoint:
```
        {
            "roll":"200269",
            "facebook":"bharwaniprem",
            "discord_user":"dirtbkr","discord_tag"="2010",
            "linkedin":"prem-bharwani",
            "instagram":"prembharwani"
        }
```

This would add an user with the the following details
