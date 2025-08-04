import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mountain } from "lucide-react"

export default function WelcomePage() {
  return (
    <div className="flex flex-col min-h-[100dvh] items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="container px-4 md:px-6 text-center space-y-6">
        <Mountain className="mx-auto h-16 w-16 text-primary" />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Welcome to StockWise</h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
          Your trusted platform for smart stock trading and portfolio management. Get started today and take control of
          your investments.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row justify-center">
          <Link href="/login">
            <Button size="lg" className="w-full sm:w-auto">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
