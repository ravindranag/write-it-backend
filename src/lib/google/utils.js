import { google } from "googleapis";
import { authorize } from "./token.js";
import { createMimeMessage } from "mimetext";
import { getOtpHtmlTemplate } from "./html.js";

const composeRawMessage = ({
	to,
	subject,
	html
}) => {
	const msg = createMimeMessage()
	msg.setSender({
		name: 'Write It',
		addr: 'writeit.by.rv@gmail.com'
	})
	msg.setRecipient(to)
	msg.setSubject(subject)
	msg.setMessage('text/html', html)
	return msg.asEncoded()
}

const dispatchMail = async (auth, email, otp) => {
	const gmail = google.gmail({
		version: 'v1',
		auth
	})

	const msgOptions = {
		to: email,
		subject: 'OTP for Email Verification',
		html: getOtpHtmlTemplate(otp)
	}

	try {
		const msg = await gmail.users.messages.send({
			userId: 'me',
			requestBody: {
				raw: composeRawMessage(msgOptions)
			}
		})
		console.log(msg)
	} catch (err) {
		console.error('Cannot send mail', err.message)
	}
}

export const sendOTPToUser = async ({ email, otp }) => {
	const auth = await authorize()
	dispatchMail(auth, email, otp)
}