'use client'

import { motion } from 'framer-motion'
import { MailCheck } from 'lucide-react'

export default function VerifyEmail() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-card rounded-lg shadow-lg p-8 text-center">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl font-bold text-foreground mb-4">Verify Your Email</h1>
                </motion.div>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <p className="text-muted-foreground mb-6">
                        We&apos;ve sent a verification link to your email address. Please check your inbox and click the link to verify your account.
                    </p>
                </motion.div>

                <FloatingInbox />

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <p className="text-sm text-muted-foreground mt-6">
                        Don&apos;t see the email? Check your spam folder, just in case it ended up there.
                    </p>
                </motion.div>
            </div>
        </div>
    )
}

function FloatingInbox() {
    return (
        <motion.div
            className="relative w-[60rem] mx-auto my-8 overflow-hidden shadow-[0_25px_20px_-20px_rgba(0,0,0,0.45)]"
            initial={{
                scale: 0,
                width: 0,
                height: 0,
                opacity: 0,
            }}
            animate={{
                scale: 1,
                width: "15rem",
                height: "10rem",
                opacity: 1,
            }}
            transition={{
                duration: 0.7,
                ease: [0.34, 1.56, 0.64, 1],
                scale: {
                    type: "spring",
                    damping: 12,
                    stiffness: 100,
                    delay: 0.1, // Slight delay for scale
                },
                width: {
                    type: "spring",
                    damping: 15,
                    stiffness: 80,
                },
                height: {
                    type: "spring",
                    damping: 15,
                    stiffness: 80,
                    delay: 0.2, // Slight delay for height
                },
            }}
        >
            <motion.div
                className="absolute inset-0"
                animate={{
                    y: [150, -15],
                    opacity: 1,
                    scale: [1, 1],
                }}
                transition={{
                    duration: 3,
                    ease: [0.5, 0, 0, 0.5],
                    times: [0, 1],
                    delay: 0.8,
                }}
            >
                <MailCheck className="h-full w-full text-primary" />
            </motion.div>
        </motion.div>
    )
}

