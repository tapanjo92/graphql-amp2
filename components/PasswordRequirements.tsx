import React from 'react';

interface PasswordRequirementsProps {
  password: string;
}

export const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({ password }) => {
  // Password validation rules
  const requirements = [
    { label: 'At least 8 characters', test: (pwd: string) => pwd.length >= 8 },
    { label: 'Contains a number', test: (pwd: string) => /\d/.test(pwd) },
    { label: 'Contains a special character', test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
    { label: 'Contains an uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
    { label: 'Contains a lowercase letter', test: (pwd: string) => /[a-z]/.test(pwd) },
  ];

  return (
    <div className="password-requirements" style={{ marginTop: '10px' }}>
      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>Password must have:</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {requirements.map((req, index) => (
          <li
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '0.8rem',
              color: req.test(password) ? '#2ecc71' : '#e74c3c',
              marginBottom: '3px'
            }}
          >
            <span style={{ marginRight: '5px' }}>
              {req.test(password) ? '✓' : '✗'}
            </span>
            {req.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordRequirements;
