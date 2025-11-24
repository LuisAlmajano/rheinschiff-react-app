import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";


const getAwsCredentials = (firebaseToken) => {
  return fromCognitoIdentityPool({
    identityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,
    client: new CognitoIdentityClient({
      region: process.env.REACT_APP_COGNITO_REGION,
    }),
    logins: {
      [`securetoken.google.com/${process.env.REACT_APP_FIREBASE_PROJECT_ID}`]:
        firebaseToken,
    },
  });
};

export default getAwsCredentials;
