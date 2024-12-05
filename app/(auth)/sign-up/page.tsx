"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Image from "next/image";
import { Loader2, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { generateReactHelpers } from "@uploadthing/react"
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export default function SignUp() {
	const { useUploadThing } = generateReactHelpers<OurFileRouter>();
	const { startUpload } = useUploadThing("imageUploader", {
		onClientUploadComplete: (res) => {
			console.log('Upload completed', res);
		},
		onUploadError: (error) => {
			console.error('Upload error', error);
		}
	})
	const { toast } = useToast()
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("")
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImage(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmitForm = async () => {
		setLoading(true)
		try {
			let imageUrl = "";
			if (image) {
				const profileUpload = await startUpload([image]);
				if (!profileUpload?.[0]?.url) {
					throw new Error('Image upload failed');
				}
				imageUrl = profileUpload[0].url;
			}
			await authClient.signUp.email({
				email,
				password,
				username: username,
				name: `${firstName} ${lastName}`,
				image: image ? imageUrl : "",
				callbackURL: '/sign-in',
				fetchOptions: {
					credentials: 'include',
					onResponse: () => {
						setLoading(false);
						toast({
							title: "User is being created...",
							description: "Verify your email address to continue"
						})
					},
					onRequest: () => {
						setLoading(true);
						toast({
							title: 'almost done....',
							description: "verify your email to continue"
						})
					},
					onError: (ctx) => {
						toast({
							title: 'error',
							description: ctx.error.message
						});
					},
					onSuccess: async () => {
						router.push("/verify-email");
					},
				},
			});
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="h-screen w-screen flex items-center justify-center">
			<Card className="z-50 rounded-md rounded-t-none max-w-md">
				<CardHeader>
					<CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
					<CardDescription className="text-xs md:text-sm">
						Enter your information to create an account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label htmlFor="first-name">First name</Label>
								<Input
									id="first-name"
									placeholder="Max"
									required
									onChange={(e) => setFirstName(e.target.value)}
									value={firstName}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="last-name">Last name</Label>
								<Input
									id="last-name"
									placeholder="Robinson"
									required
									onChange={(e) => setLastName(e.target.value)}
									value={lastName}
								/>
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="username">Username</Label>
							<Input
								id="username"
								placeholder="maxrobinson"
								required
								onChange={(e) => setUsername(e.target.value)}
								value={username}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								required
								onChange={(e) => setEmail(e.target.value)}
								value={email}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								autoComplete="new-password"
								placeholder="Password"
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password_confirmation">Confirm Password</Label>
							<Input
								id="password_confirmation"
								type="password"
								value={passwordConfirmation}
								onChange={(e) => setPasswordConfirmation(e.target.value)}
								autoComplete="new-password"
								placeholder="Confirm Password"
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="image">Profile Image (optional)</Label>
							<div className="flex items-end gap-4">
								{imagePreview && (
									<div className="relative w-16 h-16 rounded-sm overflow-hidden">
										<Image
											src={imagePreview}
											alt="Profile preview"
											layout="fill"
											objectFit="cover"
										/>
									</div>
								)}
								<div className="flex items-center gap-2 w-full">
									<Input
										id="image"
										type="file"
										accept="image/*"
										onChange={handleImageChange}
										className="w-full"
									/>
									{imagePreview && (
										<X
											className="cursor-pointer"
											onClick={() => {
												setImage(null);
												setImagePreview(null);
											}}
										/>
									)}
								</div>
							</div>
						</div>
						<Button
							type="submit"
							className="w-full"
							disabled={loading}
							onClick={handleSubmitForm}
						>
							{loading ? (
								<Loader2 size={16} className="animate-spin" />
							) : (
								"Create an account"
							)}
						</Button>
					</div>
				</CardContent>
				<CardFooter>
					<div className="flex justify-center w-full border-t py-4">
						<p className="text-center text-xs text-neutral-500">
							Secured by <span className="text-orange-400">better-auth.</span>
						</p>
					</div>
				</CardFooter>
			</Card>
		</div>

	);
}