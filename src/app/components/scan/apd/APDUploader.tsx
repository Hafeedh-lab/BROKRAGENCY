'use client';

interface Props {
  onUpload: (file: File) => void;
}

export function APDUploader({ onUpload }: Props) {
  return (
    <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-brand-blue/40 rounded-xl p-6 cursor-pointer bg-base hover:border-brand-blue transition-colors">
      <input
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            onUpload(file);
          }
        }}
      />
      <span className="text-brand-blue font-semibold">Upload proposal PDF</span>
      <span className="text-sm text-neutral-600">Max 25MB • auto-deletes in 24h</span>
    </label>
  );
}
