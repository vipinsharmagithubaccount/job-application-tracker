"use client";

import { JobApplication } from "@/types/application";

interface ApplicationListProps {
  applications: JobApplication[];
  onStatusChange: (
    id: string,
    status: JobApplication["status"]
  ) => void;
  onDelete: (id: string) => void;
}

function getStatusClasses(status: JobApplication["status"]) {
  switch (status) {
    case "Applied":
      return "bg-blue-50 text-blue-700 border-blue-200";

    case "Interview":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";

    case "Rejected":
      return "bg-red-50 text-red-700 border-red-200";

    case "Selected":
      return "bg-green-50 text-green-700 border-green-200";
  }
}

export default function ApplicationList({
  applications,
  onStatusChange,
  onDelete,
}: ApplicationListProps) {
  if (applications.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">
          No applications found
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Try changing your search or filter, or add a new
          application.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="border-b px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Applications
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {applications.length} application
          {applications.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="divide-y">
        {applications.map((application) => (
          <div
            key={application.id}
            className="flex flex-col gap-4 p-6 transition hover:bg-gray-50 md:flex-row md:items-center md:justify-between"
          >
            <div className="min-w-0">
              <h3 className="truncate font-semibold text-gray-900">
                {application.companyName}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {application.jobRole}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusClasses(
                  application.status
                )}`}
              >
                {application.status}
              </span>

              <select
                value={application.status}
                onChange={(event) =>
                  onStatusChange(
                    application.id,
                    event.target.value as JobApplication["status"]
                  )
                }
                aria-label={`Change status for ${application.companyName}`}
                className="rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Rejected">Rejected</option>
                <option value="Selected">Selected</option>
              </select>

              <button
                type="button"
                onClick={() => {
                  const confirmed = window.confirm(
                    `Delete the application for ${application.companyName}?`
                  );

                  if (confirmed) {
                    onDelete(application.id);
                  }
                }}
                className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}