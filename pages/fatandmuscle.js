import React, {useState} from "react";
import TextInput from "../components/forms/TextInput";
import Button from "../components/forms/Button";

export default function FatAndMuscle() {
    const [data, setData] = useState({
        prevWeight: "",
        prevBF: "",
        currWeight: "",
        currBF: "",
        fatLost: "",
        muscleGained: ""
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

    }

    return(
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
                        <div className="text-right pt-4">
                            <Button sizes="lg" variant="filled" type="submit">Submit</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}