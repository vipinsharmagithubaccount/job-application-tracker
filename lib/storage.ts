import { promises as fs } from "fs";
import path from "path";
import { get, put } from "@vercel/blob";
import { JobApplication } from "@/types/application";

const dataDirectory = path.join(process.cwd(), "data");
const dataFile = path.join(dataDirectory, "applications.json");

const blobPath = "applications.json";

async function getLocalApplications(): Promise<JobApplication[]> {
  await fs.mkdir(dataDirectory, { recursive: true });

  try {
    const file = await fs.readFile(dataFile, "utf-8");
    return JSON.parse(file);
  } catch {
    await fs.writeFile(dataFile, "[]", "utf-8");
    return [];
  }
}

async function saveLocalApplications(
  applications: JobApplication[]
): Promise<void> {
  await fs.mkdir(dataDirectory, { recursive: true });

  await fs.writeFile(
    dataFile,
    JSON.stringify(applications, null, 2),
    "utf-8"
  );
}

async function getBlobApplications(): Promise<JobApplication[]> {
  try {
    const result = await get(blobPath, {
      access: "private",
      useCache: false,
    });

    if (!result) {
      return [];
    }

    const text = await new Response(result.stream).text();

    return JSON.parse(text);
  } catch {
    return [];
  }
}

async function saveBlobApplications(
  applications: JobApplication[]
): Promise<void> {
  await put(
    blobPath,
    JSON.stringify(applications, null, 2),
    {
      access: "private",
      allowOverwrite: true,
    }
  );
}

export async function getApplications(): Promise<JobApplication[]> {
  if (process.env.VERCEL === "1") {
    return getBlobApplications();
  }

  return getLocalApplications();
}

export async function saveApplications(
  applications: JobApplication[]
): Promise<void> {
  if (process.env.VERCEL === "1") {
    await saveBlobApplications(applications);
    return;
  }

  await saveLocalApplications(applications);
}