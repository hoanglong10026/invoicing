import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { createRef, useState } from "react";
import InvoicesItem from "./InvoicesItem";
import DeleteInvoiceModal from "./DeleteInvoiceModal";
import AddInvoiceModal from "./AddInvoiceModal";
import EditInvoiceModal from "./EditInvoiceModal";

export default function Invoices({ auth, invoices, fruits }) {
    const title = "Invoices";

    const [deleteData, setDeleteData] = useState(null);

    const invoiceRef = createRef();
    const editInvoiceRef = createRef();

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
                                invoiceRef.current.open();
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
                                                editInvoiceRef={editInvoiceRef}
                                            />
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <AddInvoiceModal ref={invoiceRef} fruits={fruits} />
            <EditInvoiceModal ref={editInvoiceRef} fruits={fruits} />
            <DeleteInvoiceModal invoice={deleteData} />
        </AuthenticatedLayout>
    );
}
