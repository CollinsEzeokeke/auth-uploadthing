'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from 'zod'
import { authClient } from "@/lib/auth-client"
import { useToast } from "@/hooks/use-toast"
import { useRouter, useSearchParams } from "next/navigation"

const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters')
  .refine((password) => /[A-Z]/.test(password), {
    message: 'Password must contain at least one uppercase letter',
  })
  .refine((password) => /[a-z]/.test(password), {
    message: 'Password must contain at least one lowercase letter',
  })
  .refine((password) => /[0-9]/.test(password), {
    message: 'Password must contain at least one number',
  })
  .refine((password) => /[^A-Za-z0-9]/.test(password), {
    message: 'Password must contain at least one special character',
  })

interface ValidationErrors {
  uppercase?: boolean
  lowercase?: boolean
  number?: boolean
  special?: boolean
  length?: boolean
}

export default function NewPassword() {
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [isMatching, setIsMatching] = useState(true)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const [finalPassword, setFinalPassword] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null)

  useEffect(() => {
    const token = searchParams.get('token')
    setToken(token)
    setIsValidToken(!!token)

    if (!token) {
      const message = 'Invalid or expired reset link. Please request a new password reset'
      router.push(`/unauthorized?message=${encodeURIComponent(message)}`)
    }
  }, [searchParams, router])

  useEffect(() => {
    const errors: ValidationErrors = {}

    if (password1) {
      errors.uppercase = !/[A-Z]/.test(password1)
      errors.lowercase = !/[a-z]/.test(password1)
      errors.number = !/[0-9]/.test(password1)
      errors.special = !/[^A-Za-z0-9]/.test(password1)
      errors.length = password1.length < 6
    }

    setValidationErrors(errors)
  }, [password1])

  useEffect(() => {
    if (password2) {
      setIsMatching(password1 === password2)
    }
  }, [password1, password2])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {

      setIsLoading(true)
      const validatedPassword = passwordSchema.parse(password1)

      if (password1 === password2) {
        setFinalPassword(validatedPassword)
        if (token) {
          const { data, error } = await authClient.resetPassword({
            newPassword: validatedPassword,
            token: token
          })
          if (error) {
            toast({
              title: 'ERROR',
              description: error.message
            })
          }
          if (data) {
            toast({
              title: 'sucess',
              description: 'Password change made successfully go back to login and continue with the page'
            })
          }
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Validation error:', error.errors)
        toast({
          title: 'Error',
          description: "Please make sure you follow the rules of password change"
        })
      }
    } finally {
      setIsLoading(false)
      toast({
        title: 'Password Updated',
        description: 'You would be redirected to the sign-in page'
      })
      router.push('/sign-in')
    }
  }

  if (isValidToken === null) {
    return <div>Loading...</div>
  }

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
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    placeholder="Enter your new password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="bg-background border-input pr-10"
                    onChange={(e) => {
                      setPassword1(e.target.value)
                    }}
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
                {password1 && (
                  <div className="mt-2 text-sm">
                    <p className={validationErrors.length ? 'text-red-500' : 'text-green-500'}>
                      ✓ At least 6 characters
                    </p>
                    <p className={validationErrors.uppercase ? 'text-red-500' : 'text-green-500'}>
                      ✓ Contains uppercase letter
                    </p>
                    <p className={validationErrors.lowercase ? 'text-red-500' : 'text-green-500'}>
                      ✓ Contains lowercase letter
                    </p>
                    <p className={validationErrors.number ? 'text-red-500' : 'text-green-500'}>
                      ✓ Contains number
                    </p>
                    <p className={validationErrors.special ? 'text-red-500' : 'text-green-500'}>
                      ✓ Contains special character
                    </p>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  placeholder="Confirm your new password"
                  type="password"
                  required
                  className="bg-background border-input"
                  onChange={(e) => {
                    setPassword2(e.target.value)
                  }}
                />

                {password2 && (
                  <p className={`mt-2 text-sm ${isMatching ? 'text-green-500' : 'text-red-500'}`}>
                    {isMatching ? '✓ Passwords match' : '✗ Passwords do not match'}
                  </p>
                )}
              </div>
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {loading ? (
                  <div>loading....</div>
                ) : (
                  <Button className="w-full" type="submit">
                    Reset Password
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}

                {finalPassword && (
                  <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
                    Password successfully validated!
                  </div>
                )}
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