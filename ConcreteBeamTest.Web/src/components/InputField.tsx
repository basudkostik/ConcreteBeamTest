import React from 'react';

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export const InputField: React.FC<Props> = ({ label, value, onChange, placeholder }) => {
  return (
    <div className="field">
      <label>{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode="decimal"
      />
    </div>
  );
};



