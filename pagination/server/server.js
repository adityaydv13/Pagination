// // create app
// const express=require('express');
// const mongoose=require('mongoose');
// const cors=require('cors');

 
// const app=require(express());

// const PORT = 5000;

// mongoose.connect('mongodb://localhost:27017/pagination', { 
//         useNewUrlParser: true, 
//         useUnifiedTopology: true 
//     })
//         .then(() => console.log('Connect to MongoDB'))
//         .catch(err => console.error('Error connecting to MongoDB:', err));
    
// const userSchema=new mongoose.Schema({
//     name:String,
//     email:String,
//     college:String
// })

// const dataset=mongoose.model('dataset',userSchema);

// app.post('/dataEnter',async (req,res)=>{
//     const { name, email, message } = req.body;

//     if (!name || !email || !message) {
//         return res.status(400).json({ success: false, message: "All fields are required!" });
//     }

//     try {
//         const newEntry = new FormData({ name, email, message });
//         await newEntry.save();
//         res.json({ success: true, message: "Data stored successfully!" });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error saving data", error });
//     }
// });

// // data accessing with limitation of 2 

// app.get('/accessData', async (req, res) => {
//     try {
//         const page = parseInt(req.query.page) || 1;  
//         const limit = 2; 
//         const skip = (page - 1) * limit;  

//         const data = await FormData.find().skip(skip).limit(limit); 
//         const totalDocuments = await FormData.countDocuments();  
//         const totalPages = Math.ceil(totalDocuments / limit); 

//         res.json({
//             success: true,
//             data,
//             pagination: {
//                 currentPage: page,
//                 totalPages
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error retrieving data", error });
//     }
// });



// app.listen(port,()=>{
//     console.log("server started");
// })


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express(); // Ensure 'app' is defined
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/paginationDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Connection Error:", err));

// Define Mongoose Schema and Model
const FormDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const FormData = mongoose.model('FormData', FormDataSchema);

// POST Route to Add Data
app.post('/dataEnter', async (req, res) => {
    try {
        const newEntry = new FormData(req.body);
        await newEntry.save();
        res.status(201).json({ success: true, message: "Data saved successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error saving data", error });
    }
});

// GET Route with Pagination
app.get('/accessData', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 2;
        const skip = (page - 1) * limit;

        const data = await FormData.find().skip(skip).limit(limit);
        const totalDocuments = await FormData.countDocuments();
        const totalPages = Math.ceil(totalDocuments / limit);

        res.json({
            success: true,
            data,
            pagination: {
                currentPage: page,
                totalPages
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving data", error });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
