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
        <PageLayout title="Dashboard">
            <div className="h-screen flex justify-center items-center px-12 bg-gray-50">
                <div className="text-center space-y-4">

                </div>
            </div>
        </PageLayout>
    )
}