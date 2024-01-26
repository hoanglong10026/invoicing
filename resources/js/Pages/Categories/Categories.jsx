import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

import DeleteCategoryModal from "./DeleteCategoryModal";
import CategoryModal from "./CategoryModal";
import { useState } from "react";
import CategoriesItem from "./CategoriesItem";

export default function Categories({ auth, categories }) {
    const title = "Fruit Categories";

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
                            Add Category
                        </PrimaryButton>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="text-left pb-5">No</th>
                                        <th className="text-left pb-5">Name</th>
                                        <th className="text-left pb-5">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((c, index) => {
                                        return (
                                            <CategoriesItem
                                                key={c.id}
                                                category={c}
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

            <DeleteCategoryModal category={deleteData} />
            <CategoryModal category={updateData} />
        </AuthenticatedLayout>
    );
}
