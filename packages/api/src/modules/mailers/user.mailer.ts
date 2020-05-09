import { Service } from "typedi"
import { FULL_WEB_URL } from "../../lib/config"
import { User } from "../entities/user.entity"
import { mgsend } from "../../lib/mailgun-mailer"

@Service()
export class UserMailer {
  sendWelcomeEmail(user: User) {
    console.log("sendWelcomeEmail", user.email)
    mgsend({
      to: user.email,
      subject: "Welcome",
      body: "Thank you for registering.",
    })
  }

  sendResetPasswordLink(user: User, token: string) {
    const link = `${FULL_WEB_URL()}/reset-password?token=${token}`
    console.log("sendResetPasswordLink", user.email, link)
    mgsend({
      to: user.email,
      subject: "Reset link",
      body: `<a href="${link}">${link}</a>`,
    })
  }
}
