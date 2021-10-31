import express from 'express'
import { getBMI,getBMR,getIBW,getTDEE,getBFP,getABSI,getWHR } from './tools.js'
const app = express()
app.get('/',(req,res)=>{
    res.json({info:'💪'})
})

app.get('/:toolName',(req,res)=>{
    const toolName = (req.params.toolName).toLowerCase()
   switch(toolName) {
       case 'bmi':
           //weight, height
           res.status(200).json({info:getBMI(req.query)})
        break
        case 'bmr':
            //weight,height,gender,age
            res.status(200).json({info:getBMR(req.query)})
            break
        case 'ibw':
            //weight,height,gender
            res.status(200).json({info:getIBW(req.query)})
            break
        case 'tdee':
            //weight,height,gender,age,activitylevel
            res.status(200).json({info:getTDEE(req.query)})
            break
        case 'bfp':
            //weight,height,gender,age
            res.status(200).json({info:getBFP(req.query)})
            break
        case 'absi':
            //weight,height,gender,waist,age
            res.status(200).json({info: getABSI(req.query)})
            break
        case 'whr':
            //gender,waist,hip
            res.status(200).json({info: getWHR(req.query)})
        break
        default:
            res.status(200).json({err:'Please make sure to select a valid tool name'})
   }
})

app.listen(2000)