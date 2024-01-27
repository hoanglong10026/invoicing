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

const AddInvoiceModal = forwardRef(({ fruits }, ref) => {
    const { data, setData, processing, post, reset, errors, clearErrors } =
        useForm({
            openModal: false,
            invoice_detail: [],
        });

    useImperativeHandle(ref, () => ({
        open: () => {
            setData({
                openModal: true,
                invoice_detail: [],
            });
        },
    }));

    const closeModal = () => {
        setData({
            openModal: false,
            invoice_detail: [],
        });

        reset();
        clearErrors();
    };

    const saveInvoice = (e) => {
        e.preventDefault();

        post(route("invoices.store"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => {},
        });
    };

    const removeDetail = (index) => {
        let details = [...data.invoice_detail];
        details.splice(index, 1);
        setData("invoice_detail", details);
    };

    const addDetail = (newDetail) => {
        const details = data.invoice_detail;

        // check fruit exist in cart
        const index = details.findIndex(
            (d) => d.fruit_id == newDetail.fruit_id
        );

        if (index == -1) {
            details.push(newDetail);
        } else {
            const detail = details[index];
            let quantity = parseInt(detail.quantity);
            quantity += parseInt(newDetail.quantity);
            details[index] = {
                ...details[index],
                quantity,
            };
        }

        setData("invoice_detail", details);
    };

    return (
        <Modal show={data.openModal} onClose={closeModal}>
            <form onSubmit={saveInvoice} className="p-6" id="invoice-frm">
                <h2 className="text-lg font-medium text-gray-900">
                    Add Invoice
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
                            {data.invoice_detail.map((detail, index) => {
                                const fruit = fruits.find(
                                    (f) => f.id === parseInt(detail.fruit_id)
                                );

                                const amount = fruit.price * detail.quantity;
                                return (
                                    <tr key={`${index}-${fruit.id}`}>
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
                                                    removeDetail(index)
                                                }
                                            >
                                                Delete
                                            </PrimaryButton>
                                        </td>
                                    </tr>
                                );
                            })}
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

export default AddInvoiceModal;
