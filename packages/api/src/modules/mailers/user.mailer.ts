import { Service } from "typedi"
import { FULL_WEB_URL, EMAIL_CO_NAME } from "../../lib/config"
import { User } from "../entities/user.entity"
import { mgsend } from "../../lib/mailgun-mailer"

@Service()
export class UserMailer {
  // todo send email confirm
  sendWelcomeEmail(user: User) {
    console.log("sendWelcomeEmail", user.email)
    mgsend({
      to: user.email,
      subject: `Welcome to ${EMAIL_CO_NAME}`,
      body: `Thank you for registering at <a href="${FULL_WEB_URL}">${EMAIL_CO_NAME}</a>`,
    })
  }

  sendResetPasswordLink(user: User, token: string) {
    const link = `${FULL_WEB_URL()}/reset-password?token=${token}`
    console.log("sendResetPasswordLink", user.email, link)
    mgsend({
      to: user.email,
      subject: `Reset link for ${EMAIL_CO_NAME}`,
      body: `<a href="${link}">${link}</a>`,
    })
  }
}
