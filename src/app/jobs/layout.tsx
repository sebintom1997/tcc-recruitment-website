import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Jobs - TCC Recruitment | Find Your Perfect Role",
  description: "Discover opportunities that match your skills, values, and career aspirations from our curated selection of world-class companies.",
  keywords: ["jobs", "careers", "opportunities", "hiring", "recruitment", "employment"],
  openGraph: {
    title: "Jobs - TCC Recruitment | Find Your Perfect Role",
    description: "Discover opportunities that match your skills, values, and career aspirations from our curated selection of world-class companies.",
    type: "website",
  },
}

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
