import React from "react";
import Button from "../../components/forms/Button";
import PageLayout from "../../components/PageLayout";
import {useRouter} from "next/router";

export default function Index() {
    const router = useRouter()

    return(
        <PageLayout privateRoute title="Base Stats">
            <div className="flex justify-center items-center h-screen">
                <div>
                    <div className="text-center rounded-lg border border-gray-200 p-8 w-full md:w-96">
                        <div className="space-y-4">
                            <h1 className="font-bold text-2xl md:text-3xl">📃 Calculators</h1>
                            <Button sizes="md" variant="filled" onClick={() => router.push("calculator/protein")}>Suggested Protein Intake</Button>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}