'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from 'lucide-react'
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function ResetPassword() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false);
    const { toast } = useToast()
    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await authClient.forgetPassword({
                email: email,
                redirectTo: "/reset-password",
                fetchOptions: {
                    onRequest: (ctx) => {
                        toast({
                            title: 'Sending reset instructions',
                            description: 'Please check your email inbox shortly'
                        });
                    },
                    onResponse: (ctx) => {
                        setLoading(false);
                        toast({
                            title: 'Reset email sent',
                            description: 'Instructions have been sent to your email'
                        });
                    },
                    onSuccess: () => {
                        router.push('/verify-email');
                    },
                    onError: (ctx) => {
                        toast({
                            title: 'Error',
                            description: ctx.error.message,
                            variant: 'destructive'
                        });
                    }
                }
            });
        } catch (error) {
            setLoading(false);
            toast({
                title: 'Error',
                description: 'Failed to initiate password reset',
                variant: 'destructive'
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="w-[400px] bg-card shadow-lg">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-card-foreground">Forgot Password</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Enter your email to reset your password
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={handleResetPassword}>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="Enter your email address"
                                    type="email"
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    value={email}
                                    required
                                    className="bg-background border-input"
                                />
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <Button className="w-full" type="submit">
                                    {
                                        loading ? (
                                            <Loader2 size={16} className="animate-spin" />
                                        ) : (
                                            <div className="flex">
                                                Reset Password <ArrowRight className="ml-2 h-4 w-4" />
                                            </div>
                                        )
                                    }
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

