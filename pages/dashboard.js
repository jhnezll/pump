import React, {useContext} from 'react';
import TextInput from "../components/forms/TextInput";
import Button from "../components/forms/Button";
import PageLayout from "../components/PageLayout";
import SessionContext from "../util/SessionContext";
import {useRouter} from "next/router";

export default function Dashboard() {
    const {isAuthenticated} = useContext(SessionContext)

    const router = useRouter()

    return(
        <PageLayout privateRoute title="Dashboard">
            <div className="flex justify-center items-center h-screen">
                <div>
                    <div className="w-full text-center rounded-lg border border-gray-200 p-8 space-y-4">
                        <h1 className="font-bold text-2xl">Choose a Calculator</h1>
                        <Button sizes="lg" variant="filled" onClick={() => router.push("/fatandmuscle")}>Fat Loss and Muscle Gain</Button>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}