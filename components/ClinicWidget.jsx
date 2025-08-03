"use client";

export default function ClinicWidget() {
  return (
    <div className="p-[1px] w-full h-full">
    <iframe
      src="/widgets/clinic.html"
      className="w-full h-full rounded-3xl overflow-hidden"
      loading="lazy"
    />
    </div>
  );
}
