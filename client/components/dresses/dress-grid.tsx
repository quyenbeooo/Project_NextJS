import DressCard from "./dress-card";
import type { Dress } from "@/lib/mock-data";

export default function DressGrid({ dresses }: { dresses: Dress[] }) {
  if (dresses.length === 0) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        Không tìm thấy váy nào phù hợp.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {dresses.map((d) => (
        <DressCard key={d.id} dress={d} />
      ))}
    </div>
  );
}
