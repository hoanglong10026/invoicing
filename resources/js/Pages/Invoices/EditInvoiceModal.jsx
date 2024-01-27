import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { forwardRef, useImperativeHandle } from "react";
import AddFruitForm from "./components/AddFruitForm";
import { formatNumber } from "@/Hooks/useFormat";
import cs from "classnames";

const EditInvoiceModal = forwardRef(({ fruits }, ref) => {
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

    const saveInvoice = (e) => {
        e.preventDefault();

        put(
            route("invoices.update", {
                invoice: data.id,
            }),
            {
                preserveScroll: true,
                onSuccess: () => closeModal(),
                onError: () => {},
            }
        );
    };

    const removeDetail = (index, detail) => {
        let details = [...data.invoice_details];
        if (detail?.id) {
            details[index] = {
                ...details[index],
                delete: !detail?.delete,
            };
        } else {
            details.splice(index, 1);
        }

        setData("invoice_details", details);
    };

    const addDetail = (newDetail) => {
        const details = data.invoice_details;

        // check fruit exist in cart
        const index = details.findIndex(
            (d) => d.fruit_id == newDetail.fruit_id
        );

        if (index == -1) {
            details.push(newDetail);
        } else {
            let quantity = parseInt(newDetail.quantity);
            details[index] = {
                ...details[index],
                quantity,
            };
        }

        setData("invoice_details", details);
    };

    return (
        <Modal show={data.openModal} onClose={closeModal}>
            <form onSubmit={saveInvoice} className="p-6" id="invoice-frm">
                <h2 className="text-lg font-medium text-gray-900">
                    Edit Invoice
                </h2>

                <div className="mt-6">
                    <InputLabel htmlFor="customer_name" value="Customer name" />

                    <TextInput
                        id="customer_name"
                        type="text"
                        name="customer_name"
                        value={data.customer_name}
                        onChange={(e) =>
                            setData("customer_name", e.target.value)
                        }
                        className="mt-1 block w-3/4"
                        isFocused
                    />

                    <InputError
                        message={errors.customer_name}
                        className="mt-2"
                    />
                </div>

                <div className="mt-6">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-left pb-5">No</th>
                                <th className="text-left pb-5">Category</th>
                                <th className="text-left pb-5">Fruit</th>
                                <th className="text-left pb-5">Unit</th>
                                <th className="text-left pb-5">Price</th>
                                <th className="text-left pb-5">Quantity</th>
                                <th className="text-left pb-5">Amount</th>
                                <th className="text-left pb-5"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.invoice_details.map((detail, index) => {
                                const fruit = fruits.find(
                                    (f) => f.id === parseInt(detail.fruit_id)
                                );

                                const amount = fruit.price * detail.quantity;
                                return (
                                    <tr
                                        key={`${index}-${fruit.id}`}
                                        className={cs(
                                            detail.delete && "line-through"
                                        )}
                                    >
                                        <td>{index + 1}</td>
                                        <td>{fruit.category.name}</td>
                                        <td>{fruit.name}</td>
                                        <td className="text-right pr-4">
                                            {fruit.unit}
                                        </td>
                                        <td className="text-right pr-4">
                                            {formatNumber(fruit.price)}
                                        </td>
                                        <td className="text-right pr-4">
                                            {detail.quantity}
                                        </td>
                                        <td className="text-right pr-4">
                                            {formatNumber(amount)}
                                        </td>
                                        <td>
                                            <PrimaryButton
                                                type="button"
                                                onClick={() =>
                                                    removeDetail(index, detail)
                                                }
                                            >
                                                {detail?.delete
                                                    ? "Recover"
                                                    : "Delete"}
                                            </PrimaryButton>
                                        </td>
                                    </tr>
                                );
                            })}

                            {data.invoice_details.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="text-center text-gray-300"
                                    >
                                        Empty data
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <hr className="mt-6" />

                <AddFruitForm
                    fruits={fruits}
                    onChange={(newDetail) => addDetail(newDetail)}
                />

                <hr className="mt-6" />

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={closeModal}>
                        Cancel
                    </SecondaryButton>

                    <PrimaryButton className="ms-3" disabled={processing}>
                        Submit
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
});

export default EditInvoiceModal;
