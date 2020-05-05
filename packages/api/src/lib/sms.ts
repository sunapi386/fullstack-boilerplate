import {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_FROM_NUMBER,
} from "./config"
import Twilio from "twilio/lib/rest/Twilio"

export const sms = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

export const sendSms = (targetNumber: string, message: string) => {
  console.log(`'${TWILIO_FROM_NUMBER}' -> '${targetNumber}': '${message}'`)
  sms.messages
    .create({
      body: message,
      to: targetNumber,
      from: TWILIO_FROM_NUMBER,
    })
    .then((success) => {
      console.log(success.to)
    })
    .catch((error) => {
      console.log(error.message)
    })
}
