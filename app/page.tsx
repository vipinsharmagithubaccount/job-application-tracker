"use client";

import { useEffect, useMemo, useState } from "react";
import ApplicationForm from "@/components/ApplicationForm";
import ApplicationList from "@/components/ApplicationList";
import StatusFilter from "@/components/StatusFilter";
import SummaryCards from "@/components/SummaryCards";
import SearchBar from "@/components/SearchBar";
import {
  ApplicationStatus,
  JobApplication,
} from "@/types/application";

export default function Home() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [filter, setFilter] = useState<ApplicationStatus | "All">("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  async function fetchApplications() {
    try {
      setError("");

      const response = await fetch("/api/applications");

      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }

      const data = await response.json();
      setApplications(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchApplications();
  }, []);

  async function handleStatusChange(
    id: string,
    status: ApplicationStatus
  ) {
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update application");
      }

      const updatedApplication = await response.json();

      setApplications((currentApplications) =>
        currentApplications.map((application) =>
          application.id === id
            ? updatedApplication
            : application
        )
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update application"
      );
    }
  }

  async function handleDelete(id: string) {
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete application");
      }

      setApplications((currentApplications) =>
        currentApplications.filter(
          (application) => application.id !== id
        )
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete application"
      );
    }
  }

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesStatus =
        filter === "All" ||
        application.status === filter;
  
      const searchTerm = search.toLowerCase().trim();
  
      const matchesSearch =
        application.companyName
          .toLowerCase()
          .includes(searchTerm) ||
        application.jobRole
          .toLowerCase()
          .includes(searchTerm);
  
      return matchesStatus && matchesSearch;
    });
  }, [applications, filter, search]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Job Application Tracker
          </h1>

          <p className="mt-2 text-gray-600">
            Track your job applications, interviews, and outcomes.
          </p>
        </header>

        <div className="space-y-6">
          <SummaryCards applications={applications} />

          <ApplicationForm
            onApplicationAdded={fetchApplications}
          />

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Your Applications
            </h2>

            <div className="flex flex-col gap-3 sm:flex-row">
              <SearchBar
                value={search}
                onChange={setSearch}
              />

              <StatusFilter
                value={filter}
                onChange={setFilter}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
              <p className="text-gray-500">
                Loading applications...
              </p>
            </div>
          ) : error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6">
              <p className="font-medium text-red-700">
                {error}
              </p>

              <button
                type="button"
                onClick={fetchApplications}
                className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          ) : (
            <ApplicationList
              applications={filteredApplications}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </main>
  );
}