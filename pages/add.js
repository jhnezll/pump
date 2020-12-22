import React, {useContext, useState} from "react";
import TextInput from "../components/forms/TextInput";
import Button from "../components/forms/Button";
import SessionContext from "../util/SessionContext";
import PageLayout from "../components/PageLayout";
import {useRouter} from "next/router";
import fb from "../util/firebase-config";

export default function Add() {

    const router = useRouter()

    const {userProfile} = useContext(SessionContext)

    const [data, setData] = useState({
        weight: "",
        bfp: "",
    })

    function handleSubmit(event) {
        event.preventDefault()
        console.log(data)
        sendToFirebase()
    }

    function sendToFirebase() {
        fb.firestore().collection("users").doc(userProfile.uid).collection("measurements").doc().set({
            date: new Date(),
            weight: data.weight,
            bfp: data.bfp,
        })
    }

    return(
        <PageLayout privateRoute title="Measurements">
            <div className="flex justify-center items-center h-screen">
                <div>
                    <div className="w-full text-center rounded-lg border border-gray-200 p-8">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <h1 className="font-bold text-2xl md:text-3xl">🏋 Input Measurements Below</h1>

                            {/*Data Input*/}
                            <TextInput label="Weight (lbs)" id="weight" type="number" required
                                onChange={event => setData({
                                    ...data,
                                    weight: event.target.value
                                })} value={data.weight}
                            />
                            <TextInput label="Body Fat Percentage" id="bfp" type="number" required
                                onChange={event => setData({
                                    ...data,
                                    bfp: event.target.value
                                })} value={data.bfp}
                            />

                            {/*Bottom of Forum*/}
                            <div className="text-right pt-4 space-x-2">
                                <Button sizes="lg" variant="light" onClick={() => router.push("/dashboard")}>Back</Button>
                                <Button sizes="lg" variant="filled" type="submit">Submit</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}