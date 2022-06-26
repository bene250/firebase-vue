const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const puppeteer = require('puppeteer');
const fs = require('fs')


const app = express();


//initialize firestore database 

const serviceAccount = require("./permissions.json");
const { format } = require("path");
const { application } = require("express");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db= admin.firestore();
// Allow app to use cors

app.use(cors({origin: true}));

//routes
app.get("/", (req, res)=>{
    return res.status(200).send({message:'hello world'})
})


//post

app.get("/api/pdf", async (req, res)=>{
    try{
        const id = (new Date().getTime().toString(36));
      
        const browser = await puppeteer.launch({headless: true}); 
        const page = await browser.newPage();

       
        await page.goto("https://tekloon.dev/today-i-learned/puppeteer-wait-for-download-implementation/", {
          waitUntil: 'networkidle2',
        })
        const pdfBuffer = await page.pdf({ format:'a4'});
        await page.close();
        await browser.close();
        res.set({'Content-Type': 'application/pdf'});
        res.send(
            pdfBuffer
        )
    }
    catch(err){
        console.log(err.message)
    }
})






exports.app = functions.https.onRequest(app)