import React, {useContext, useEffect, useState} from "react";
import TextInput from "../components/forms/TextInput";
import SelectInput from "../components/SelectInput";
import Index from "../components/SelectInput";
import Button from "../components/forms/Button";
import PageLayout from "../components/PageLayout";
import {useRouter} from "next/router";
import fb from "../util/firebase-config";
import SessionContext from "../util/SessionContext";

export default function BaseStats() {
    const router = useRouter()
    const {userProfile} = useContext(SessionContext)

    const [data, setData] = useState({
        name: "",
        height: "",
        gender: "",
    })

    const genders = ['', 'Male', 'Female']

    useEffect(() => {
        fb.firestore().collection("users").doc(userProfile.uid).collection("basestats").doc("currentStats").get()
            .then(function(doc) {
                if (doc.exists) {
                    const data = doc.data()
                    setData({
                        name: data.name,
                        height: data.height,
                        gender: data.gender
                    })
                } else {
                    setData({
                        name: "",
                        height: "",
                        gender: ""
                    })
                }
            })
    }, [])

    function handleSubmit(event) {
        event.preventDefault()
        fb.firestore().collection("users").doc(userProfile.uid).collection("basestats").doc("currentStats").set({
            name: data.name,
            height: data.height,
            gender: data.gender
        })
    }

    return(
        <PageLayout privateRoute title="Base Stats">
            <div className="flex justify-center items-center h-screen">
                <div>
                    <div className="text-center rounded-lg border border-gray-200 p-8 w-full md:w-96">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <h1 className="font-bold text-2xl md:text-3xl">🤸 Base Stats</h1>
                            {/*Data Input*/}
                            <TextInput label="Name" id="name" type="text" required
                                       onChange={event => setData({
                                           ...data,
                                           name: event.target.value
                                       })} value={data.name}
                            />
                            <TextInput label="Height (in)" id="height" type="number" required
                                       onChange={event => setData({
                                           ...data,
                                           height: event.target.value
                                       })} value={data.height}
                            />
                            <SelectInput values={genders} label="Gender" id="gender" required
                                         onChange={event => setData({
                                             ...data,
                                             gender: event.target.value
                                         })} value={data.gender}
                            />

                            {/*Bottom of Forum*/}
                            <div className="text-right pt-4 space-x-2">
                                <Button sizes="lg" variant="light" onClick={() => router.push("/dashboard")}>Back</Button>
                                <Button sizes="lg" variant="filled" type="submit">Apply</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}