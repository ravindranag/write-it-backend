import 'dotenv/config'
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig);

const storage = getStorage(app)
const userFolderRef = ref(storage, 'users')

const uploadAvatarImage = async (file, filename) => {
	try {
		const fileRef = ref(userFolderRef, filename)
		const snapshot = await uploadBytes(fileRef, file)
		console.log(snapshot)
		return {
			uploaded: 1,
			key: fileRef.fullPath
		}
	}
	catch(err) {
		console.error(err)
		return {
			uploaded: 0
		}
	}
}

const getAvatarDownloadUrl = async (key) => {
	const fileRef = ref(storage, key)
	try {
		const url = await getDownloadURL(fileRef)
		return url
	}
	catch(err) {
		console.log(err)
		return ''
	}
}

export {
	uploadAvatarImage,
	getAvatarDownloadUrl
}