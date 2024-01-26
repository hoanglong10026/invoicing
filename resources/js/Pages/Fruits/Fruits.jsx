import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import FruitsItem from "./FruitsItem";
import FruitModal from "./FruitModal";
import DeleteFruitModal from "./DeleteFruitModal";

export default function Fruits({ auth, categories, fruits }) {
    const title = "Fruits";

    const [deleteData, setDeleteData] = useState(null);
    const [updateData, setUpdateData] = useState(null);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {title}
                </h2>
            }
        >
            <Head title={title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-5 text-right">
                        <PrimaryButton
                            onClick={() => {
                                setUpdateData({
                                    id: -1,
                                });
                            }}
                        >
                            Add Fruit
                        </PrimaryButton>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="text-left pb-5">No</th>
                                        <th className="text-left pb-5">
                                            Fruit
                                        </th>
                                        <th className="text-left pb-5">Unit</th>
                                        <th className="text-left pb-5">
                                            Price
                                        </th>
                                        <th className="text-left pb-5">
                                            Category
                                        </th>
                                        <th className="text-left pb-5">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fruits.map((f, index) => {
                                        return (
                                            <FruitsItem
                                                key={f.id}
                                                fruit={f}
                                                index={index}
                                                setDeleteData={setDeleteData}
                                                setUpdateData={setUpdateData}
                                            />
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <FruitModal fruit={updateData} categories={categories} />
            <DeleteFruitModal fruit={deleteData} />
        </AuthenticatedLayout>
    );
}
