import { ComponentType } from 'react';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import PasswordRequirements from './PasswordRequirements';
import { useState } from 'react';

export function withPasswordValidation(WrappedComponent: ComponentType<any>) {
  return function WithPasswordValidationComponent(props: any) {
    const [password, setPassword] = useState('');
    const { user } = useAuthenticator();

    const validatePassword = (password: string) => {
      const requirements = [
        password.length >= 8,
        /\d/.test(password),
        /[!@#$%^&*(),.?":{}|<>]/.test(password),
        /[A-Z]/.test(password),
        /[a-z]/.test(password),
      ];
      
      return requirements.every(req => req);
    };

    const formFields = {
      signUp: {
        password: {
          order: 2,
          isRequired: true,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
        }
      }
    };

    return (
      <Authenticator.Provider>
        <WrappedComponent
          {...props}
          formFields={formFields}
          components={{
            SignUp: {
              FormFields() {
                return (
                  <>
                    <Authenticator.SignUp.FormFields />
                    <PasswordRequirements password={password} />
                  </>
                );
              },
            },
          }}
          services={{
            async validateCustomSignUp(formData: Record<string, string>) {
              if (!validatePassword(formData.password)) {
                throw new Error(
                  'Password must be at least 8 characters long and contain numbers, special characters, uppercase and lowercase letters.'
                );
              }
            },
          }}
        />
      </Authenticator.Provider>
    );
  };
}
