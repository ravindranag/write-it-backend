import 'dotenv/config'
import { writeFile } from 'fs'

const generateTokenJsonFile = () => {
	const token = {
		type: process.env.TOKEN_TYPE,
		"client_id": process.env.TOKEN_CLIENT_ID,
		"client_secret": process.env.TOKEN_CLIENT_SECRET,
		refresh_token: process.env.TOKEN_REFRESH_TOKEN
	}

	writeFile('token.json', JSON.stringify(token), (err) => {
		if(err)  console.log('operation failed', err)
		console.log('done')
	})
}

generateTokenJsonFile()