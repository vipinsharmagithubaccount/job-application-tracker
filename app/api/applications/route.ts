import { NextResponse } from "next/server";
import { getApplications, saveApplications } from "@/lib/storage";
import { JobApplication, ApplicationStatus } from "@/types/application";

export async function GET() {
  try {
    const applications = await getApplications();

    return NextResponse.json(applications);
  } catch (error) {
    console.error("GET applications error:", error);

    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { companyName, jobRole, status } = body;

    if (!companyName || !jobRole || !status) {
      return NextResponse.json(
        { error: "Company name, job role and status are required" },
        { status: 400 }
      );
    }

    const validStatuses: ApplicationStatus[] = [
      "Applied",
      "Interview",
      "Rejected",
      "Selected",
    ];

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid application status" },
        { status: 400 }
      );
    }

    const applications = await getApplications();

    const newApplication: JobApplication = {
      id: crypto.randomUUID(),
      companyName,
      jobRole,
      status,
    };

    applications.push(newApplication);

    await saveApplications(applications);

    return NextResponse.json(newApplication, { status: 201 });
  } catch (error) {
    console.error("POST application error:", error);

    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 }
    );
  }
}