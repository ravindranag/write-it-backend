import express, { json } from 'express'
import cors from 'cors'
import router from './routes/index.js'
import { ERROR_PRISMA_UNIQUE_CONSTRAINT } from './lib/constants/index.js'

const port = process.env.PORT || 8000
const app = express()

app.use(cors())
app.use(json())

app.use(router)

app.use((err, req, res, next) => {
	if(err) {
		// console.log(err)

		if(err.code === ERROR_PRISMA_UNIQUE_CONSTRAINT) {
			err.message = `${err.meta.target[0]} should be unique`
		}

		res.status(500).json({
			error: 'An error occurred',
			message: err.message
		})
	}
})

app.listen(port, (err) => {
	if(err) {
		console.error('Server failed to start', err)
	} else {
		console.log('Server listening on port', port)
	}
})