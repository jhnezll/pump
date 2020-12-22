import PageLayout from "../components/PageLayout";
import Dropdown from "../components/forms/Dropdown";
import TextInput from "../components/forms/TextInput";

export default function Home() {

    return (
        <PageLayout title="Welcome to Pump!">
            <div className="h-screen flex justify-center items-center px-12 bg-gray-50">
                <div className="text-center">
                    <h1>index</h1>
                </div>
            </div>
        </PageLayout>
    )
}
