const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const uploadRoutes = require('./routes/fileUpload');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(console.log('Online Database running'))


app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api', uploadRoutes)
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);


// ========== DEPLOYMENT ==============


if (process.env.NODE_ENV === 'production') {
    const __dirname1 = path.resolve()

    app.use(express.static(path.join(__dirname1, "/frontend/build")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
    })
} else {
    app.get('/', (req, res) => {
        res.send("API is running successfully.")
    })
}

// ========== DEPLOYMENT ==============


app.use(notFound)
app.use(errorHandler)


app.listen(port, () => {console.log(`Server running on ${port}`)})