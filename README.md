# Node.js user data management server using MongoDB

> A Node.js server to work perform CRUD operations on user's data stored on a cloud database ( MongoDB ).

I took a simple use case here, I am handling user's social media handles ( You can customise it to any other data according to your requirement ). This server can Create, Update, Delete, and Read from this database.

( I am yet to implement a email-confirmation system to perform data modification from authenticated users only, which I plan to do using the `nodemailer` module. )

(Each request has to have an identifier for the user and other required details formatted in JSON format while making the request)

Serving endpoints and their descriptions are :
* Creating a new user : `/add `
* Updating the existing users detail : `/update `
* Deleting the user's detail : `/remove`
* To fetch the information of a particular user : `/info`


