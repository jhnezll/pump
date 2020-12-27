import React, {useEffect, useState} from "react";
import PageLayout from "../../components/PageLayout";
import TextInput from "../../components/forms/TextInput";
import Button from "../../components/forms/Button";
import {useRouter} from "next/router";
import SelectInput from "../../components/SelectInput";
import fb from "../../util/firebase-config";

export default function Protein() {

    const router = useRouter()
    const leanness = ['', 'Very Lean', 'Average Leanness', 'Not Lean']
    const [data, setData] = useState({
        weight: null,
        bfp: null,
        leanMass: null,
        recProteinIntake: null
    })

    function handleSubmit() {
        event.preventDefault()

        const bfp = data.bfp
        const weight = data.weight
        let lMod

        if (bfp <= 12) {
            lMod = 1.6
        } else if (bfp > 12 && bfp < 20) {
            lMod = 1.4
        } else {
            lMod = 1.2
        }

        const bf = weight * (bfp/100)
        const leanMass = weight - bf
        const recProteinIntake = leanMass * lMod

        setData({
            ...data,
            leanMass: leanMass.toFixed(0),
            recProteinIntake: recProteinIntake.toFixed(0)
        }).then(console.log(data))
    }

    return(
        <PageLayout privateRoute title="Base Stats">
            <div className="flex justify-center items-center h-screen">
                <div>
                    <div className="text-center rounded-lg border border-gray-200 p-8 w-full md:w-96">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <h1 className="font-bold text-2xl md:text-3xl">🥊 Protein Intake</h1>

                            {/*Data Input*/}
                            <TextInput label="Weight (lbs)" id="weight" type="number" required
                                onChange={event => setData({
                                    ...data,
                                    weight: event.target.value
                                })} value={data.weight}/>
                            <TextInput label="Body Fat Percentage" id="bfp" type="number" required
                                onChange={event => setData({
                                    ...data,
                                    bfp: event.target.value
                                })} value={data.bfp}/>
                            <div className="text-right">
                                <h1>Lean Mass: {data.leanMass} lbs</h1>
                                <h1>Suggested Intake: {data.recProteinIntake} grams</h1>
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