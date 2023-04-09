import express, { json, urlencoded } from 'express'
import 'dotenv/config'
import { responseHelper } from './helpers/response-helpers.js'
import { errorHelper } from './helpers/error-helper.js'
import appRoutes from './routes/index.js'
import morgan from 'morgan'
import cors from 'cors'

const port = process.env.PORT || 8000

const whitelist = [
	'http://localhost:3000',
	'https://writeit.ravindranag.in'
]

const app = express()

app.use(morgan('dev'))
app.use(cors({
	origin: ['http://localhost:3000', 'https://writeit.ravindranag.in']
}))
app.use(json())
app.use(urlencoded({
	extended: true
}))

app.use(responseHelper)
app.use(appRoutes)
app.use(errorHelper)

app.listen(port, (err) => {
	if(err) {
		console.error(err)
	} else {
		console.log('[server] Listening on port', port)
	}
})
