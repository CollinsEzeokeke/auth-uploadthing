import { Suspense } from "react";
import NewPassword from "@/components/reset-password";

export default function ResetPassword() {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <NewPassword />
    </Suspense>
  )
}