import { JobApplication } from "@/types/application";

interface SummaryCardsProps {
  applications: JobApplication[];
}

export default function SummaryCards({
  applications,
}: SummaryCardsProps) {
  const totalApplications = applications.length;

  const interviews = applications.filter(
    (application) => application.status === "Interview"
  ).length;

  const selected = applications.filter(
    (application) => application.status === "Selected"
  ).length;

  const cards = [
    {
      title: "Total Applications",
      value: totalApplications,
    },
    {
      title: "Interviews",
      value: interviews,
    },
    {
      title: "Selected",
      value: selected,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border bg-white p-5 shadow-sm"
        >
          <p className="text-sm text-gray-500">{card.title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}