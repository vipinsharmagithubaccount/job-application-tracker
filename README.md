# Job Application Tracker

A full-stack job application tracking application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- View all job applications

- Add a new job application

- Update application status

- Delete applications

- Filter applications by status

- Search by company name or job role

- Summary cards for:

  - Total Applications

  - Interviews

  - Selected applications

- Loading, empty, and error states

- Responsive UI

- REST-style CRUD API using Next.js Route Handlers

## Tech Stack

- Next.js

- React

- TypeScript

- Tailwind CSS

- Next.js Route Handlers

- JSON-based storage for the assignment

## Project Structure

```text

app/

├── api/

│   └── applications/

│       ├── route.ts

│       └── [id]/

│           └── route.ts

├── globals.css

├── layout.tsx

└── page.tsx

components/

├── ApplicationForm.tsx

├── ApplicationList.tsx

├── SearchBar.tsx

├── StatusFilter.tsx

└── SummaryCards.tsx

lib/

└── storage.ts

types/

└── application.ts

data/

└── applications.json