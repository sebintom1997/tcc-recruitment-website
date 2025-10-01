"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { Shield, User, Lock } from "lucide-react"

export default function AdminLogin() {
  const router = useRouter()
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simple authentication
    if (credentials.username === "admin" && credentials.password === "admin") {
      // Set session in localStorage (in production, use proper authentication)
      localStorage.setItem("admin_session", "authenticated")
      router.push("/admin/jobs")
    } else {
      setError("Invalid username or password")
    }
    
    setIsLoading(false)
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 min-h-screen flex items-center">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-40">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-primary/30 to-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-accent/25 to-primary/15 rounded-full blur-3xl" />
        </div>
      </div>

      <Container>
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground mb-6">
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Admin Portal</h1>
            <p className="text-xl text-muted-foreground">
              Secure access to job management dashboard
            </p>
          </div>

          {/* Login Card */}
          <Card className="border-0 shadow-2xl bg-background/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-semibold">Sign In</CardTitle>
              <p className="text-muted-foreground">
                Enter your credentials to access the admin panel
              </p>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-base font-medium">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      value={credentials.username}
                      onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                      placeholder="Enter your username"
                      className="pl-10 h-12 text-base"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-base font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      value={credentials.password}
                      onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Enter your password"
                      className="pl-10 h-12 text-base"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                    <p className="text-red-600 font-medium">{error}</p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full h-12 text-base font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </>
                  ) : (
                    "Access Dashboard"
                  )}
                </Button>
              </form>

              {/* Demo credentials hint */}
              <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  <strong>Demo credentials:</strong> admin / admin
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  )
}
