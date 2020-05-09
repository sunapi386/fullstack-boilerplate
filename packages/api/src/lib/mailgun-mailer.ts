import { NodeMailgun } from 'ts-mailgun';
import {
  IS_PRODUCTION,
  IS_STAGING,
  EMAIL_FROM,
  MAILGUN_KEY,
  EMAIL_CO_NAME,
  MAILGUN_DOMAIN,
} from "./config"

export const mgmailer = new NodeMailgun();
mgmailer.apiKey = MAILGUN_KEY;
mgmailer.domain = MAILGUN_DOMAIN;
mgmailer.fromEmail = EMAIL_FROM;
mgmailer.fromTitle = EMAIL_CO_NAME;
mgmailer.init();

export interface MailArgs {
  to: string | string[]
  subject: string
  body: string
}

export const mgsend = (args: MailArgs) => {
  if (!MAILGUN_KEY) {
    console.log("send nothing, no MAILGUN_KEY")
    console.log("MailArgs:", args)
    return
  }
  if (IS_PRODUCTION || IS_STAGING) {
    mgmailer
      .send(args.to, args.subject, args.body )
      .then(result => {
        console.log("Email sent to", args.to, result )
      })
      .catch(error => {
        console.log(error)
      })
  } else {
    console.log('Not in production, pretend to send', args)
  }
}
