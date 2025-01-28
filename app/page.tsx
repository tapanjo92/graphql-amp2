import { Authenticator, useTheme } from '@aws-amplify/ui-react';
import { useState } from 'react';
import PasswordRequirements from './PasswordRequirements';

type CustomAuthenticatorChildren =
  | React.ReactNode
  | ((props: { signOut?: () => void; user?: any }) => React.ReactNode);

interface CustomAuthenticatorProps {
  children: CustomAuthenticatorChildren;
}

export function CustomAuthenticator({ children }: CustomAuthenticatorProps) {
  const { tokens } = useTheme();
  const [password, setPassword] = useState('');

  const components = {
    SignUp: {
      FormFields() {
        return (
          <>
            <Authenticator.SignUp.FormFields
              components={{
                Password: {
                  props: {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      setPassword(e.target.value);
                    },
                  },
                },
              }}
            />
            <PasswordRequirements password={password} />
          </>
        );
      },
    },
  };

  const services = {
    async validateCustomSignUp(formData: Record<string, string>) {
      const password = formData.password;
      const requirements = [
        password.length >= 8,
        /\d/.test(password),
        /[!@#$%^&*(),.?":{}|<>]/.test(password),
        /[A-Z]/.test(password),
        /[a-z]/.test(password),
      ];
      if (!requirements.every(Boolean)) {
        throw new Error(
          'Password must be at least 8 characters long and contain numbers, ' +
            'special characters, uppercase, and lowercase letters.'
        );
      }
    },
  };

  return (
    <Authenticator components={components} services={services} hideSignUp={false}>
      {(authState) => {
        if (typeof children === 'function') {
          return children(authState);
        }
        return children;
      }}
    </Authenticator>
  );
}

export default CustomAuthenticator;
