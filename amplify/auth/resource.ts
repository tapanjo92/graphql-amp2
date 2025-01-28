import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      // Changed from "verification" block to "type"
      type: "VerificationEmailWithLink",
      passwordSettings: {
        minLength: 8,
        requireNumbers: true,
        requireSpecialCharacters: true,
        requireUppercase: true,
        requireLowercase: true,
      },
    },
    externalProviders: {
      callbackUrls: [
        "http://localhost:3000/",
      ],
      logoutUrls: [
        "http://localhost:3000/",
      ],
      google: {
        clientId: secret("GOOGLE_CLIENT_ID"),
        clientSecret: secret("GOOGLE_CLIENT_SECRET"),
        scopes: ["openid", "email", "profile"],
        attributeMapping: {
          email: "email",
          givenName: "given_name",
          familyName: "family_name",
        },
      },
    },
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
    },
  },
});
