const express = require("express");
const app = express();
const fetch = require("node-fetch");
const fs = require('fs');

const PORT = process.env.PORT || 9000;
const API_KEY = "9KSIRBO41a8B8zj4XIz07T3yPiXWjH0A8wHmZSuI";

function getAstronomicPicturesInfo() {
    const data = JSON.parse(fs.readFileSync("resources/astronomicImages.json"))
    return data.map(function(obj){
        return {
        "explanation" : obj.explanation,
        "hdurl" : obj.hdurl,
        "title" : obj.title,
        "url" : obj.url
    }});    
}

async function findAll() {
    const url_page = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=10`;
    try{
        const options = {
        "method" : "GET",
        }

        const response = await fetch(url_page,options)
            .then(res => res.json())
            .catch(e => {
                console.error({
                    "message":"error",
                    error: e
            })
        })

        return response.map(function(obj){
                return {
                "explanation" : obj.explanation,
                "hdurl" : obj.hdurl,
                "title" : obj.title,
                "url" : obj.url
            };    
        })
    }catch (error){
        return res.status(400).json(error);
    }
}


//routes
app.get("/api", async (req,res) =>{
    const filter = req.query.filter
    const pageSize = req.query.pageSize
    const page = req.query.page  
    const allData = getAstronomicPicturesInfo()
    let resultData;
    if(filter) {
        resultData = allData.filter(item => item.title.includes(filter))
    } else {
        resultData = allData
    }    
    if(pageSize && page) {
        resultData = resultData.slice((page - 1) * pageSize, page * pageSize)
    }
    res.send(resultData)  
});


app.listen(PORT, console.log(`server started on port" ${PORT}`))