
import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailSubject: 'Verify your email'
    },
    password: {
      require: true
    },
    externalProviders: {
      callbackUrls: [
        "http://localhost:3000/"  // only localhost for initial deployment
      ],
      logoutUrls: [
        "http://localhost:3000/"  // only localhost for initial deployment
      ],
      google: {
        clientId: secret("GOOGLE_CLIENT_ID"),
        clientSecret: secret("GOOGLE_CLIENT_SECRET"),
        scopes: ["openid", "email", "profile"],
        attributeMapping: {
          email: "email",
          givenName: "given_name",
          familyName: "family_name"
        }
      }
    }
  },
  passwordPolicy: {
    minLength: 8,
    requireLowercase: true,
    requireUppercase: true,
    requireNumbers: true,
    requireSpecialCharacters: true
  },
  userAttributes: {
    email: {
      required: true,
      mutable: true,
    },
    givenName: {
      required: true,
      mutable: true,
    },
    familyName: {
      required: false,
      mutable: true,
    }
  }
});

