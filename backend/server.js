const express=require('express');
const app=express();
const dotenv=require('dotenv');
const path=require('path');
const connectDatabase=require('./config/database');
const cors=require('cors');
const cookieParser = require('cookie-parser');
const cloudinary=require('cloudinary');
const fileUpload=require('express-fileupload');
const {errorMiddleware}=require('./middlewares/errorMiddleware');
dotenv.config({path:path.join(__dirname,'config','config.env')});

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

connectDatabase();
app.use(cors({
    origin:[process.env.FRONTEND_URL,process.env.DASHBOARD_URL],
    credentials:true
}));

cloudinary.v2.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET

})

const message=require('./routes/message');
const user=require('./routes/user');
const appointment=require('./routes/appointment')

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use('/api/v1/message',message);
app.use('/api/v1/user',user);
app.use('/api/v1/appointment',appointment)


app.use(errorMiddleware);
app.listen(process.env.PORT,()=>{
    console.log(`Server is listening to the port ${process.env.PORT}`)
})