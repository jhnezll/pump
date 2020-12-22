import React from "react";
import fb from "../../util/firebase-config";
import {useRouter} from "next/router";


export default function Logout() {
    const router = useRouter()

    fb.auth().signOut().then(
        router.push("/")
    )

    return(
        <div>Logging out...</div>
    )
}