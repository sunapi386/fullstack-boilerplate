import React, { useState, Fragment } from "react"
import Link from "next/link"
import { Button, Input, styled } from "@noquarter/ui"
import { GraphQLError } from "graphql"

import { useForgotPassword } from "../lib/graphql/user/hooks"

import AuthForm from "../components/AuthForm"

function ForgotPassword() {
  const [email, setEmail] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  const [forgotPassword] = useForgotPassword()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setLoading(true)
    forgotPassword({
      variables: { email },
    })
      .then(() => {
        setLoading(false)
        setSuccess(true)
      })
      .catch((loginError: GraphQLError) => {
        setLoading(false)
        setError(loginError.message.split(":")[1])
      })
  }
  return (
    <AuthForm handleSubmit={handleSubmit}>
      {success ? (
        <Fragment>
          <StyledLinks>
            <StyledText>We've sent you a link by email!</StyledText>
          </StyledLinks>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </Fragment>
      ) : (
        <Fragment>
          <StyledText>
            What is your email? We'll send you a link to reset your password
          </StyledText>
          <br />
          <Input
            label="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            required={true}
            placeholder="jim@gmail.com"
          />
          <br />
          <Button loading={loading} full={true}>
            Send reset link
          </Button>
          {error && <StyledError>{error}</StyledError>}
          <StyledLinks>
            <Link href="/login">
              <StyledLink>Login</StyledLink>
            </Link>
          </StyledLinks>
        </Fragment>
      )}
    </AuthForm>
  )
}

export default ForgotPassword

const StyledText = styled.p`
  color: ${p => p.theme.colorText};
`

const StyledLinks = styled.div`
  width: 100%;
  padding: ${p => p.theme.paddingL} 0;
  ${p => p.theme.flexBetween};
`

const StyledLink = styled.a`
  text-decoration: none;
  outline: none;
  cursor: pointer;
  color: ${p => p.theme.colorText};
  padding: ${p => p.theme.paddingS};
  font-size: ${p => p.theme.textM};

  &:hover {
    opacity: 0.8;
  }
  &:focus {
    text-decoration: underline;
  }
`
const StyledError = styled.div`
  opacity: 0.4;
  width: 100%;
  text-align: right;
  color: ${p => p.theme.colorText};
  padding: ${p => p.theme.paddingM};
  font-size: ${p => p.theme.textS};
`