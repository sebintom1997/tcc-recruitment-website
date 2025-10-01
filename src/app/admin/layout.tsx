"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { LogOut, Briefcase, Plus, Home } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const session = localStorage.getItem("admin_session")
    if (session === "authenticated") {
      setIsAuthenticated(true)
    } else if (pathname !== "/admin/login") {
      router.push("/admin/login")
    }
    setIsLoading(false)
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem("admin_session")
    router.push("/admin/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated && pathname !== "/admin/login") {
    return null
  }

  if (pathname === "/admin/login") {
    return children
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Admin Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin/jobs" className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold text-lg">
                  A
                </div>
                <div>
                  <span className="font-bold text-xl">Admin Panel</span>
                  <p className="text-sm text-muted-foreground">Job Management System</p>
                </div>
              </Link>
            </div>

            <nav className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild className="h-10">
                <Link href="/" className="flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>View Site</span>
                </Link>
              </Button>
              
              <Button variant="ghost" size="sm" onClick={handleLogout} className="h-10">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Admin Navigation */}
      <nav className="border-b bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            <Link
              href="/admin/jobs"
              className={`flex items-center space-x-2 px-4 py-5 text-base font-medium border-b-2 transition-colors ${
                pathname === "/admin/jobs"
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Briefcase className="h-5 w-5" />
              <span>Manage Jobs</span>
            </Link>
            
            <Link
              href="/admin/jobs/new"
              className={`flex items-center space-x-2 px-4 py-5 text-base font-medium border-b-2 transition-colors ${
                pathname === "/admin/jobs/new" || pathname.includes("/edit")
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Plus className="h-5 w-5" />
              <span>Add Job</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
