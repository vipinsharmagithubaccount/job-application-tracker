import { promises as fs } from "fs";
import path from "path";
import { JobApplication } from "@/types/application";

const dataDirectory = path.join(process.cwd(), "data");
const dataFile = path.join(dataDirectory, "applications.json");

async function ensureDataFile() {
  await fs.mkdir(dataDirectory, { recursive: true });

  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, "[]", "utf-8");
  }
}

export async function getApplications(): Promise<JobApplication[]> {
  await ensureDataFile();

  const file = await fs.readFile(dataFile, "utf-8");
  return JSON.parse(file);
}

export async function saveApplications(
  applications: JobApplication[]
): Promise<void> {
  await ensureDataFile();

  await fs.writeFile(
    dataFile,
    JSON.stringify(applications, null, 2),
    "utf-8"
  );
}