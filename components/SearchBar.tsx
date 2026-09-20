interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
  }
  
  export default function SearchBar({
    value,
    onChange,
  }: SearchBarProps) {
    return (
      <div className="w-full">
        <label
          htmlFor="search"
          className="sr-only"
        >
          Search applications
        </label>
  
        <input
          id="search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search by company or job role..."
          className="w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );
  }