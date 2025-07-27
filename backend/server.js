import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

// app config 

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()


//middlewares 
app.use(express.json())
// app.use(cors())

const allowedOrigins = [
  'https://mediqueue-seven.vercel.app',
  'https://medi-queue-t5g2.vercel.app',
  'http://localhost:5173',
];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    'token'
    
  ],
}));

//api endpoints
app.use('/api/admin',adminRouter)
// localhost:4000/api/admin/add-doctor
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
    res.send('API WORKING MEDIQUEUE')
})

// app.listen(port, ()=> console.log("Server Started",port))

export default app