import { ProjectOverview } from "@/app/libs/projects";

export default function Overview({ data }: { data: ProjectOverview }) {
    // Define the items to map through for a cleaner loop
    const items = [
        { label: "Year", value: data.year },
        { label: "Role", value: data.role },
        { label: "Scope", value: data.scope },
        { label: "Timeline", value: data.timeline },
        { label: "Platform", value: data.platform },
        // We handle 'Tools' separately since it's an array
    ];

    return (
        <div className="grid gap-2.5">
            {items.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                    <span className="text-base text-tertiary-text font-medium">
                        {item.label}
                    </span>
                    <span className="text-primary-text font-medium text-base">
                        {item.value}
                    </span>
                </div>
            ))}

            {/* Tools Section (rendered as tags/text) */}
            <div className="flex justify-between">
                <span className="text-base text-tertiary-text font-medium">
                    Tools
                </span>
                <span className="text-primary-text font-medium text-base">
                    {data.tools.join(", ")}
                </span>
            </div>
        </div>
    );
}