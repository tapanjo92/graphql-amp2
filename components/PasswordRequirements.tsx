import React from 'react';

interface PasswordRequirementsProps {
  password: string;
}

const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({ password }) => {
  const requirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains a number', met: /\d/.test(password) },
    { label: 'Contains a special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    { label: 'Contains an uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains a lowercase letter', met: /[a-z]/.test(password) },
  ];

  return (
    <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
      <h4 style={{ marginBottom: '0.5rem', color: '#333' }}>Password Requirements:</h4>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {requirements.map((req, index) => (
          <li
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '0.25rem',
              color: req.met ? '#28a745' : '#dc3545'
            }}
          >
            <span style={{ marginRight: '0.5rem' }}>
              {req.met ? '✓' : '×'}
            </span>
            {req.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordRequirements;
