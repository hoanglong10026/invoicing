import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import InvoicesItem from "./InvoicesItem";
import DeleteInvoiceModal from "./DeleteInvoiceModal";

export default function Invoices({ auth, invoices }) {
    const title = "Invoices";

    const [deleteData, setDeleteData] = useState(null);
    const [updateData, setUpdateData] = useState(null);

    console.log('invoices', invoices)
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
                            Add Invoice
                        </PrimaryButton>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="text-left pb-5">No</th>
                                        <th className="text-left pb-5">
                                            Customer
                                        </th>
                                        <th className="text-left pb-5">
                                            Amount
                                        </th>
                                        <th className="text-left pb-5">
                                            Created at
                                        </th>
                                        <th className="text-left pb-5">
                                            Updated at
                                        </th>
                                        <th className="text-left pb-5">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoices.map((invoice, index) => {
                                        return (
                                            <InvoicesItem
                                                key={invoice.id}
                                                invoice={invoice}
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

            <DeleteInvoiceModal invoice={deleteData} />
        </AuthenticatedLayout>
    );
}
