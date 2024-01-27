import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";
import { forwardRef, useImperativeHandle } from "react";
import { formatNumber } from "@/Hooks/useFormat";
import cs from "classnames";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ViewInvoiceModal = forwardRef(({ fruits }, ref) => {
    const { data, setData, processing, put, reset, errors, clearErrors } =
        useForm({
            openModal: false,
            invoice_details: [],
        });

    useImperativeHandle(ref, () => ({
        open: (value) => {
            setData({
                openModal: true,
                ...value,
            });
        },
    }));

    const closeModal = () => {
        setData({
            openModal: false,
            invoice_details: [],
        });

        reset();
        clearErrors();
    };

    const exportPdf = async () => {
        const capture = document.querySelector("#capture");

        const canvas = await html2canvas(capture, { scale: 5 });

        const img = canvas.toDataURL("image/png");
        const wid = canvas.width;
        const hgt = canvas.height;
        const hratio = hgt / wid;
        const doc = new jsPDF("l", "px", "a4");
        const width = doc.internal.pageSize.width;
        const height = width * hratio;

        doc.addImage(img, "JPEG", 0, 0, width, height, "someAlias", "FAST");
        doc.save(`invoice-${data.id}.pdf`);
    };

    let total = 0;
    return (
        <Modal show={data.openModal} onClose={closeModal}>
            <div className="p-6" id="capture">
                <h2 className="text-lg font-medium text-gray-900">Invoice</h2>

                <div className="mt-6">
                    <b>Customer :</b> {data.customer_name}
                </div>

                <div className="mt-6 overflow-auto ">
                    <table className="w-full border-collapse border border-slate-500 ">
                        <thead>
                            <tr>
                                <th className="p-2 text-left pb-5 border border-slate-600 ">No</th>
                                <th className="p-2 text-left pb-5 border border-slate-600 ">Category</th>
                                <th className="p-2 text-left pb-5 border border-slate-600 ">Fruit</th>
                                <th className="p-2 text-left pb-5 border border-slate-600 ">Unit</th>
                                <th className="p-2 text-left pb-5 border border-slate-600 ">Price</th>
                                <th className="p-2 text-left pb-5 border border-slate-600 ">Quantity</th>
                                <th className="p-2 text-left pb-5 border border-slate-600 ">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.invoice_details.map((detail, index) => {
                                const fruit = fruits.find(
                                    (f) => f.id === parseInt(detail.fruit_id)
                                );

                                const amount = fruit.price * detail.quantity;
                                total += amount;

                                return (
                                    <tr
                                        key={`${index}-${fruit.id}`}
                                        className={cs(
                                            detail.delete && "line-through"
                                        )}
                                    >
                                        <td className="p-2 border border-slate-600 ">{index + 1}</td>
                                        <td className="p-2 border border-slate-600 ">{fruit.category.name}</td>
                                        <td className="p-2 border border-slate-600 ">{fruit.name}</td>
                                        <td className="p-2 text-right p-2 border border-slate-600">
                                            {fruit.unit}
                                        </td>
                                        <td className="text-right p-2 border border-slate-600">
                                            {formatNumber(fruit.price)}
                                        </td>
                                        <td className="text-right p-2 border border-slate-600">
                                            {detail.quantity}
                                        </td>
                                        <td className="text-right p-2 border border-slate-600">
                                            {formatNumber(amount)}
                                        </td>
                                    </tr>
                                );
                            })}

                            {data.invoice_details.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="text-center text-gray-300"
                                    >
                                        Empty data
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr >
                                <td colSpan={5}></td>
                                <td className="text-right p-2 font-bold">Total : </td>
                                <td className="text-right p-2">
                                    {formatNumber(total)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <hr className="mt-6" />

            <div className="flex justify-end p-6">
                <SecondaryButton onClick={closeModal}>Close</SecondaryButton>

                <PrimaryButton
                    type="button"
                    onClick={() => exportPdf()}
                    className="ms-3"
                >
                    Download
                </PrimaryButton>
            </div>
        </Modal>
    );
});

export default ViewInvoiceModal;
