import { Users, School, GraduationCap, BookOpen } from "lucide-react";
import Badge from "../ui/badge/Badge";

const metrics = [
  {
    title: "Total Registration",
    value: "97,878",
    icon: Users,
    badge: "Today Registration",

  },
  {
    title: "Total Applied",
    value: "0",
    icon: Users,
    badge: "Today Applied",

  },
  {
    title: "Total Colleges",
    value: "101",
    icon: School,
  },
  {
    title: "Total Degree",
    value: "4",
    icon: GraduationCap,
  },
  {
    title: "Total Subject",
    value: "430",
    icon: BookOpen,
  },
];

export default function DashboardMetrics() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-4">
      {metrics.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 md:p-6"
        >
          {/* Left content */}
          <div>
            <span className="text-sm text-gray-500">{item.title}</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
              {item.value}
              
            </h4>

             <h5 className="mt-2 font-bold text-gray-800 text-title-sm">
             {item.badge && <Badge >{item.badge}</Badge>}
            </h5>
           
          </div>

          {/* Right icon */}
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
            <item.icon className="text-gray-800 size-8" />
          </div>
        </div>
      ))}
    </div>
  );
}
