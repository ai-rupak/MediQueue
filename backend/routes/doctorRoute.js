import expres from'express'
import { doctorList } from '../controllers/doctorController.js'

const doctorRouter = expres.Router()


doctorRouter.get('/list',doctorList)

export default doctorRouter