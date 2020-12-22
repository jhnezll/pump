import PageLayout from "../components/PageLayout";
import Button from "../components/forms/Button";
import React, {useContext} from "react";
import SessionContext from "../util/SessionContext";
import {useRouter} from "next/router";


export default function Home() {
    const {isAuthenticated} = useContext(SessionContext)
    const router = useRouter()

    if (isAuthenticated) {
        router.push("/dashboard")
    } else {
        console.log("User is not logged in.")
    }

    return (
        <PageLayout title="Welcome to Pump!">
            <div className="h-screen flex justify-center items-center px-12 bg-gray-50">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl">You must login in order to keep track of your stats.</h1>
                    <div className="flex justify-center space-x-4">
                        <Button sizes="lg" variant="light" type="submit" onClick={() => router.push("/auth/signin")}>Log in</Button>
                        <Button sizes="lg" variant="filled" type="submit" onClick={() => router.push("/auth/signup")}>Sign Up</Button>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}
