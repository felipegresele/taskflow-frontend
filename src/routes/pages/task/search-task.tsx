export function SearchTask({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex gap-3">
      <input
        placeholder="Buscar por nome"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-xl p-2 h-10 flex-1"
      />
    </div>
  );
}