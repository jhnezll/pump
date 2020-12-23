import React, {useContext, useEffect, useState} from 'react';
import TextInput from "../components/forms/TextInput";
import Button from "../components/forms/Button";
import PageLayout from "../components/PageLayout";
import SessionContext from "../util/SessionContext";
import {useRouter} from "next/router";
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend} from 'recharts';
import fb from "../util/firebase-config";
import { compareAsc, format } from 'date-fns'

export default function Dashboard() {
    const {isAuthenticated, userProfile} = useContext(SessionContext)
    const router = useRouter()

    const [data, setData] = useState([])

    useEffect(() => {
        fb.firestore().collection("users").doc(userProfile.uid).collection("measurements").get()
            .then(r => {
                const data = r.docs.map(doc => ({date: format(doc.data().date.toDate(), 'L-d-y'), lbs: doc.data().weight}))
                console.log(data)
                setData(data)
            })
    }, [])



    return(
        <PageLayout title="Dashboard">
            <div className="h-screen flex justify-center items-center px-12 bg-gray-50">
                <div className="text-center space-y-4">

                    <LineChart width={730} height={250} data={data}
                               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend/>
                        <Line type="monotone" dataKey="lbs" stroke="#3B82F6" />
                    </LineChart>

                </div>
            </div>
        </PageLayout>
    )
}