"use client";

import { FormEvent, useState } from "react";
import { ApplicationStatus } from "@/types/application";

interface ApplicationFormProps {
  onApplicationAdded: () => void;
}

export default function ApplicationForm({
  onApplicationAdded,
}: ApplicationFormProps) {
  const [companyName, setCompanyName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [status, setStatus] = useState<ApplicationStatus>("Applied");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName,
          jobRole,
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add application");
      }

      setCompanyName("");
      setJobRole("");
      setStatus("Applied");

      onApplicationAdded();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border bg-white p-6 shadow-sm"
    >
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Add Application
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label
            htmlFor="companyName"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Company Name
          </label>

          <input
            id="companyName"
            type="text"
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            placeholder="e.g. Google"
            required
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="jobRole"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Job Role
          </label>

          <input
            id="jobRole"
            type="text"
            value={jobRole}
            onChange={(event) => setJobRole(event.target.value)}
            placeholder="e.g. Software Engineer"
            required
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Status
          </label>

          <select
            id="status"
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as ApplicationStatus)
            }
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            <option value="Selected">Selected</option>
          </select>
        </div>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Adding..." : "Add Application"}
      </button>
    </form>
  );
}