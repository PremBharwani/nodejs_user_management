const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

//
var file = require('./better_search_config.json')
// YOU WILL HAVE TO UPDATE THE CONNECTION STRING TO YOUR MongoDB YOURSELF, OR ADJUST ACCORDINGLY IF 
// YOU'RE USING A LOCAL DB 
const connectionString = file.db_link
//













const plog = (message)=>{
    console.log(message);
}




const MongoClient = require('mongodb').MongoClient

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')

    const db = client.db('student-list')
    const students_info_list = db.collection('student_info_list')

    app.get('/add',(req,res)=>{

        /*
        Expecting a json like this (roll is compulsory, and atleast one more field is required) :

        {
            "roll":"200269",
            "facebook":"bharwaniprem",
            "discord_user":"dirtbkr","discord_tag"="2010",
            "linkedin":"prem-bharwani",
            "instagram":"prembharwani"
        }

        */

        //extracting the roll number from the json 
        var val=req.body.roll
        var facebook_username = req.body.facebook; var linkedin_username=req.body.linkedin; var discord_username=req.body.discord_user; var discord_tag=req.discord_tag;
        var instagram_username=req.body.instagram;
    
        var upload_obj = { 
            _id : val
        }
        if(facebook_username!=undefined){
            upload_obj['facebook_username']=facebook_username
        }
        if(linkedin_username!=undefined){
            upload_obj['linkedin_username']=linkedin_username
        }
        if(discord_username!=undefined && discord_tag!=undefined){
            upload_obj['discord_tag']=discord_tag
            upload_obj['discord_username']=discord_username
        }
        if(instagram_username!=undefined){
            upload_obj['instagram_username']=instagram_username
        }

        students_info_list.insertOne(upload_obj).then(result=>{
            plog(result)
            res.send("OK")
        }).catch(err=>{
            console.error(err)
            res.send("Couldn't add the info")
        })
    })

    // Expects a GET request with JSON content as : {"roll":"200269"}
    // Returns the available user names for the sites :)
    app.get('/info',(req,res)=>{
        var roll = req.body.roll
        // plog(`info of roll requested : ${roll}`)
        const cursor = students_info_list.find({"_id":roll}).toArray().then(results=>{
            // console.log(results)
            res.send((results))
        }).catch(err=>{console.error(err)})
    })


    // To update any values 
    app.put('/update',(req,res)=>{
        var val=req.body.roll
        var facebook_username = req.body.facebook; var linkedin_username=req.body.linkedin; var discord_username=req.body.discord_user; var discord_tag=req.discord_tag;
        var instagram_username=req.body.instagram;
    
        var identify_obj = { 
            _id : val
        }
        var upload_obj= {}
        if(facebook_username!=undefined){
            upload_obj['facebook_username']=facebook_username
        }
        if(linkedin_username!=undefined){
            upload_obj['linkedin_username']=linkedin_username
        }
        if(discord_username!=undefined && discord_tag!=undefined){
            upload_obj['discord_tag']=discord_tag
            upload_obj['discord_username']=discord_username
        }
        if(instagram_username!=undefined){
            upload_obj['instagram_username']=instagram_username
        }

        students_info_list.findOneAndUpdate(
            {
                "_id":val
            },
            {
                $set: upload_obj
            },
            {
                upsert: true
            }
        ).then(result=>{plog(result);res.send("Updated")}).catch(err=>{console.error(err)})

    })


    // To delete any data
    app.delete('/remove',(req,res)=>{

        var val=req.body.roll
        var facebook_username = req.body.facebook; var linkedin_username=req.body.linkedin; var discord_username=req.body.discord_user; var discord_tag=req.discord_tag;
        var instagram_username=req.body.instagram;
    
        var identify_obj = { 
            "_id" : val
        }
        var upload_obj= {}
        if(facebook_username!=undefined){
            upload_obj['facebook_username']=null
        }
        if(linkedin_username!=undefined){
            upload_obj['linkedin_username']=null
        }
        if(discord_username!=undefined && discord_tag!=undefined){
            upload_obj['discord_tag']=null
            upload_obj['discord_username']=null
        }
        if(instagram_username!=undefined){
            upload_obj['instagram_username']=null
        }

        students_info_list.findOneAndUpdate(
            {
                "_id":val
            },
            {
                $unset: upload_obj
            },
            {
                upsert: true
            }
        ).then(result=>{plog(result);res.send("Updated")}).catch(err=>{console.error(err)})

    })
    //delete ends


  })




app.listen(port,()=>{
    console.log(`Server is running at http://127.0.0.1:${port}/ `)
})




















