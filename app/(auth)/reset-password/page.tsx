'use client'

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Eye, EyeOff, ArrowRight } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function NewPassword() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[400px] bg-card shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-card-foreground">Reset Password</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your new password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    placeholder="Enter your new password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="bg-background border-input pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  placeholder="Confirm your new password"
                  type="password"
                  required
                  className="bg-background border-input"
                />
              </div>
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button className="w-full" type="submit">
                  Reset Password
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                >
                  <Link 
                    href="/login" 
                    className="text-sm text-primary hover:text-primary/90 transition-colors"
                  >
                    Back to Login
                  </Link>
                </motion.div>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

