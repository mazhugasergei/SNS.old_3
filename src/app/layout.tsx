import "@/styles/globals.css"
import "@/styles/index.css"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import ThemeProvider from "@/app/components/ThemeProvider"
import mongoose from "mongoose"
import { User } from "@/models/User"

// connect to the db
mongoose.connect(process.env.MONGODB_URI!).then(() => console.log("connected to db"))

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Wave",
	description: "Mazhuga Sergei's SNS graduation thesis"
}

export default ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en" /* >>> */ suppressHydrationWarning={true} /* <<< */>
			<body className={`${inter.className} relative`}>
				<ThemeProvider attribute="class" disableTransitionOnChange>
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	)
}
