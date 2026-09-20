import { NextResponse } from "next/server";
import { getApplications, saveApplications } from "@/lib/storage";
import { ApplicationStatus } from "@/types/application";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function PATCH(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const applications = await getApplications();

    const applicationIndex = applications.findIndex(
      (application) => application.id === id
    );

    if (applicationIndex === -1) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    if (body.status) {
      const validStatuses: ApplicationStatus[] = [
        "Applied",
        "Interview",
        "Rejected",
        "Selected",
      ];

      if (!validStatuses.includes(body.status)) {
        return NextResponse.json(
          { error: "Invalid application status" },
          { status: 400 }
        );
      }

      applications[applicationIndex].status = body.status;
    }

    if (body.companyName !== undefined) {
      applications[applicationIndex].companyName = body.companyName;
    }

    if (body.jobRole !== undefined) {
      applications[applicationIndex].jobRole = body.jobRole;
    }

    await saveApplications(applications);

    return NextResponse.json(applications[applicationIndex]);
  } catch (error) {
    console.error("PATCH application error:", error);

    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    const applications = await getApplications();

    const applicationExists = applications.some(
      (application) => application.id === id
    );

    if (!applicationExists) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    const updatedApplications = applications.filter(
      (application) => application.id !== id
    );

    await saveApplications(updatedApplications);

    return NextResponse.json({
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("DELETE application error:", error);

    return NextResponse.json(
      { error: "Failed to delete application" },
      { status: 500 }
    );
  }
}