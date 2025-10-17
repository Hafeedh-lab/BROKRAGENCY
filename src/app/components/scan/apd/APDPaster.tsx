'use client';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function APDPaster({ value, onChange }: Props) {
  return (
    <textarea
      className="form-textarea h-40"
      placeholder="Paste proposal text to decode scope, pricing, and risk."
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
