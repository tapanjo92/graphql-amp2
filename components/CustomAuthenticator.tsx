import { Authenticator, useTheme } from '@aws-amplify/ui-react';
import { useState } from 'react';
import PasswordRequirements from './PasswordRequirements';

// Custom authentication components with password requirements
export function CustomAuthenticator({ children }: { children: React.ReactNode }) {
  const { tokens } = useTheme();
  const [password, setPassword] = useState('');

  const components = {
    SignUp: {
      FormFields() {
        return (
          <>
            {/* Default signup fields with password monitoring */}
            <Authenticator.SignUp.FormFields
              components={{
                Password: {
                  props: {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      setPassword(e.target.value);
                    }
                  }
                }
              }}
            />

            {/* Add password requirements component with real-time validation */}
            <PasswordRequirements password={password} />
          </>
        );
      },
    },
  };

  const services = {
    async validateCustomSignUp(formData: Record<string, string>) {
      // Get the password from the form data
      const password = formData.password;
      
      // Validate password requirements
      const requirements = [
        password.length >= 8,
        /\d/.test(password),
        /[!@#$%^&*(),.?":{}|<>]/.test(password),
        /[A-Z]/.test(password),
        /[a-z]/.test(password),
      ];

      // Check if all requirements are met
      const isValid = requirements.every(req => req);
      
      if (!isValid) {
        throw new Error(
          'Password must be at least 8 characters long and contain numbers, special characters, uppercase and lowercase letters.'
        );
      }
    },
  };

  return (
    <Authenticator
      components={components}
      services={services}
      hideSignUp={false}
    >
      {children}
    </Authenticator>
  );
}

export default CustomAuthenticator;
