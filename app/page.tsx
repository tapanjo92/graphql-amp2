"use client";
import { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import { fetchUserAttributes } from 'aws-amplify/auth';
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator, Button } from '@aws-amplify/ui-react';
import type { AuthUser } from '@aws-amplify/ui-react-core';
import { useRouter } from 'next/navigation';
import { withPasswordValidation } from '../components/withPasswordValidation';
import { CustomSignIn, CustomSignUp } from '@/components/CustomAuthComponents';

Amplify.configure(outputs);

const authenticatorConfig = {
  variation: 'modal',
  loginMechanisms: ['email'],
  components: {
    SignIn: CustomSignIn,
    SignUp: CustomSignUp()
  },
  formFields: {
    signUp: {
      password: {
        isRequired: true,
        order: 2,
        label: 'Password',
      },
      confirm_password: {
        isRequired: true,
        order: 3,
        label: 'Confirm Password'
      }
    }
  },
  services: {
    async validateCustomSignUp(formData: Record<string, string>) {
      const password = formData.password;
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters');
      }
      if (!/\d/.test(password)) {
        throw new Error('Password must contain at least one number');
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        throw new Error('Password must contain at least one special character');
      }
      if (!/[A-Z]/.test(password)) {
        throw new Error('Password must contain at least one uppercase letter');
      }
      if (!/[a-z]/.test(password)) {
        throw new Error('Password must contain at least one lowercase letter');
      }
    }
  }
};

function App({ signOut, user }: { signOut?: () => void; user?: AuthUser }) {
  const [userName, setUserName] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await fetchUserAttributes();
        setUserName(user.email || 'User');
      } catch (error) {
        console.error('Error fetching user:', error);
        setUserName('User');
      }
    };
    fetchUser();
  }, []);

  const handlePTEClick = () => {
    router.push('/pte');
  };

  return (
        <main style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px',
          backgroundColor: '#ffffff'
        }}>
          {/* Header Section */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            borderBottom: '1px solid #eaeaea',
            paddingBottom: '20px'
          }}>
            <div>
              <h1 style={{ 
                margin: 0, 
                fontSize: '24px',
                color: '#333333'
              }}>
                Welcome, {userName}!
              </h1>
            </div>
            <Button
              onClick={signOut}
              variation="primary"
              style={{
                backgroundColor: '#ff0000',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Sign Out
            </Button>
          </div>

          {/* Main Content Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            marginTop: '40px'
          }}>
            {/* PTE Section */}
            <div style={{
              padding: '30px',
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              textAlign: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ 
                color: '#2c3e50',
                marginBottom: '15px'
              }}>
                PTE Practice Tests
              </h2>
              <p style={{ 
                fontSize: '1.1rem', 
                color: '#666',
                marginBottom: '20px'
              }}>
                Take a mock PTE test to practice and improve your skills
              </p>
              <Button
                onClick={handlePTEClick}
                variation="primary"
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  transition: 'background-color 0.3s ease'
                }}
              >
                Start PTE Practice
              </Button>
            </div>

            {/* Additional Features Section */}
            <div style={{
              padding: '30px',
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              textAlign: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ 
                color: '#2c3e50',
                marginBottom: '15px'
              }}>
                Study Resources
              </h2>
              <p style={{ 
                fontSize: '1.1rem', 
                color: '#666',
                marginBottom: '20px'
              }}>
                Access study materials and practice resources
              </p>
              <Button
                onClick={() => router.push('/resources')}
                variation="primary"
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  transition: 'background-color 0.3s ease'
                }}
              >
                View Resources
              </Button>
            </div>
          </div>

          {/* Footer Section */}
          <footer style={{
            marginTop: '40px',
            textAlign: 'center',
            padding: '20px',
            borderTop: '1px solid #eaeaea',
            color: '#666'
          }}>
            <p>© 2024 Your Application Name. All rights reserved.</p>
          </footer>
        </main>
  );
}

const AppWithAuth = withPasswordValidation(App);
export default withAuthenticator(AppWithAuth, authenticatorConfig);

