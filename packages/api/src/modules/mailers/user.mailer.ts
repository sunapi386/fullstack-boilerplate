import { Service } from "typedi"
import {
  FULL_WEB_URL,
  EMAIL_CO_NAME,
  SENDGRID_RESET_TEMPLATE_ID,
  SENDGRID_WELCOME_TEMPLATE_ID,
} from "../../lib/config"
import { User } from "../entities/user.entity"
import { Mailer } from "../../lib/mailer"

@Service()
export class UserMailer extends Mailer {
  sendWelcomeEmail(user: User) {
    console.log("sendWelcomeEmail", user.email)
    this.send({
      templateId: SENDGRID_WELCOME_TEMPLATE_ID,
      to: user.email,
      variables: {
        firstName: user.firstName,
        companyName: EMAIL_CO_NAME,
      },
    })
  }

  sendResetPasswordLink(user: User, token: string) {
    console.log("sendResetPasswordLink", user.email)
    this.send({
      templateId: SENDGRID_RESET_TEMPLATE_ID,
      to: user.email,
      variables: {
        firstName: `${user.firstName}`,
        companyName: EMAIL_CO_NAME,
        resetLink: `${FULL_WEB_URL()}/reset-password?token=${token}`,
      },
    })
  }
}
