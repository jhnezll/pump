import React, {useContext, useState} from "react";
import TextInput from "../components/forms/TextInput";
import Button from "../components/forms/Button";
import SessionContext from "../util/SessionContext";
import PageLayout from "../components/PageLayout";
import {useRouter} from "next/router";
import fb from "../util/firebase-config";

export default function FatAndMuscle() {

    const router = useRouter()

    const {userProfile} = useContext(SessionContext)

    const [data, setData] = useState({
        prevWeight: "",
        prevBF: "",
        currWeight: "",
        currBF: "",
        fatLost: 0,
        muscleGained: 0
    })

    function handleSubmit(event) {
        event.preventDefault()
        console.log(data)

        const pW = data.prevWeight
        const cW = data.currWeight
        const pB = data.prevBF
        const cB = data.currBF

        const prevLeanWeight = pW * (pB/100)
        const currLeanWeight = cW * (cB/100)
        const fatLost = prevLeanWeight - currLeanWeight
        const totalLost = pW - cW
        const muscleGained = fatLost - totalLost

        setData({
            ...data,
            fatLost: fatLost,
            muscleGained: muscleGained
        })

        sendToFB()
    }

    function sendToFB() {
        fb.firestore().collection("users").doc(userProfile.uid).collection("measurements").doc("fatandmuscle").set({
            date: new Date(),
            weight: data.currWeight,
            bfp: data.currBF,
            fatLost: data.fatLost,
            muscleGained: data.muscleGained
        })
    }

    return(
        <PageLayout privateRoute title="Fat and Muscle Calculator">
            <div className="flex justify-center items-center h-screen">
                <div>
                    <div className="w-full text-center rounded-lg border border-gray-200 p-8">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <h1 className="font-bold text-2xl">🏋 Fat Loss and Muscle Gain</h1>

                            {/*Previous*/}
                            <TextInput label="Previous Weight (lbs)" id="previous-weight" type="number" required
                                onChange={event => setData({
                                    ...data,
                                    prevWeight: event.target.value
                                })} value={data.prevWeight}
                            />
                            <TextInput label="Previous Body Fat Percentage" id="previous-bf" type="number" required
                                onChange={event => setData({
                                    ...data,
                                    prevBF: event.target.value
                                })} value={data.prevBF}
                            />

                            {/*Current*/}
                            <TextInput label="Current Weight (lbs)" id="current-weight" type="number" required
                                onChange={event => setData({
                                    ...data,
                                    currWeight: event.target.value
                                })} value={data.currWeight}
                            />
                            <TextInput label="Current Body Fat Percentage" id="current-bf" type="number" required
                                onChange={event => setData({
                                    ...data,
                                    currBF: event.target.value
                                })} value={data.currBF}
                            />

                            {/*Data*/}
                            <div className="text-right space-y-2">
                                <h1>Fat lost: {data.fatLost.toFixed(2)} lbs</h1>
                                <h1>️Muscle Gained: {data.muscleGained.toFixed(2)} lbs</h1>
                            </div>

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