"use client";
import { Authenticator, Button } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';

export default function PTEPage() {
  const router = useRouter();

  return (
    <Authenticator>
      {() => (
        <main style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '20px'
        }}>
          <div style={{
            textAlign: 'center',
            marginTop: '40px',
            padding: '30px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px'
          }}>
            <h1>Take PTE Mock Quiz</h1>
            <p style={{ fontSize: '1.1rem', color: '#666', marginTop: '20px' }}>
              Test your PTE skills with our mock quiz
            </p>
            <Button
              onClick={() => router.push('/')}
              variation="primary"
              style={{ 
                marginTop: '20px',
                backgroundColor: '#6B7280',
                color: 'white'
              }}
            >
              Back to Home
            </Button>
          </div>
        </main>
      )}
    </Authenticator>
  );
}
