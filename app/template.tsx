import PageTransition from "@/components/shared/PageTransition"

export default function Template({
  children,
}: {
  children: React.ReactNode
}) {
  return <PageTransition>{children}</PageTransition>
}
