
const { GoogleGenerativeAI } = require("@google/generative-ai");
  require('dotenv').config()
  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const PORT = 3000;

app.use(express.json());
app.use(bodyParser.json());
 

app.get('/', (req, res) => {

   res.send('Hello, World!');
})
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//const prompt = "speak anything in hindi.";
const generateContent = async(prompt) =>{

   try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return result.response.text();
    
   } catch (error) {
     console.error("Error generating content:", error);
   }
}
 //generateContent();
 app.get('/gemini',async(req , res)=>{
     try {
      const data = req.body.question;
      const result = await generateContent(data);
      res.send({
        "result": result
      })
     } catch (error) {
       console.error(error)
     }
 })

app.listen(PORT,()=>{

  console.log('this app is running on Port 3000')
})
