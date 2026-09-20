import { ApplicationStatus } from "@/types/application";

interface StatusFilterProps {
  value: ApplicationStatus | "All";
  onChange: (value: ApplicationStatus | "All") => void;
}

export default function StatusFilter({
  value,
  onChange,
}: StatusFilterProps) {
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="statusFilter"
        className="text-sm font-medium text-gray-700"
      >
        Filter:
      </label>

      <select
        id="statusFilter"
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value as ApplicationStatus | "All"
          )
        }
        className="rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="All">All</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Rejected">Rejected</option>
        <option value="Selected">Selected</option>
      </select>
    </div>
  );
}