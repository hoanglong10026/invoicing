import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Select from "@/Components/Select";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

const FruitModal = ({ fruit, categories }) => {
    const { data, setData, processing, put, post, reset, errors, clearErrors } =
        useForm({
            openModal: false,
        });

    const closeModal = () => {
        setData("openModal", false);
        reset();
    };

    const createFruit = () => {
        post(route("fruits.store"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => {},
        });
    };

    const updateFruit = () => {
        put(
            route("fruits.update", {
                id: data.id,
            }),
            {
                preserveScroll: true,
                onSuccess: () => closeModal(),
                onError: () => {},
            }
        );
    };

    const saveFruit = (e) => {
        e.preventDefault();
        if (data.id > 0) {
            updateFruit();
        } else {
            createFruit();
        }
    };

    useEffect(() => {
        if (fruit) {
            setData({
                ...fruit,
                openModal: true,
            });
            clearErrors();
        }
    }, [fruit]);

    const categoryOptions = categories.map((c) => {
        return {
            label: c.name,
            value: c.id,
        };
    });

    return (
        <Modal show={data.openModal} onClose={closeModal}>
            <form onSubmit={saveFruit} className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                    {data.id > 0 ? "Edit" : "Add"}
                </h2>

                <div className="mt-6">
                    <InputLabel htmlFor="category_id" value="Category" />

                    <Select
                        id="category_id"
                        name="category_id"
                        value={data.category_id || ""}
                        onChange={(e) => setData("category_id", e.target.value)}
                        className="mt-1 block w-3/4"
                        options={[
                            {
                                label: "",
                                value: "",
                            },
                            ...categoryOptions,
                        ]}
                    />

                    <InputError message={errors.category_id} className="mt-2" />
                </div>

                <div className="mt-6">
                    <InputLabel htmlFor="name" value="Fruit name" />

                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="mt-1 block w-3/4"
                        isFocused
                        placeholder="Fruit name"
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-6">
                    <InputLabel htmlFor="unit" value="Unit" />

                    <Select
                        id="unit"
                        name="unit"
                        value={data.unit}
                        onChange={(e) => setData("unit", e.target.value)}
                        className="mt-1 block w-3/4"
                        options={[
                            {
                                label: "pcs",
                                value: "pcs",
                            },
                            {
                                label: "pack",
                                value: "pack",
                            },
                            {
                                label: "kg",
                                value: "kg",
                            },
                        ]}
                    />

                    <InputError message={errors.unit} className="mt-2" />
                </div>

                <div className="mt-6">
                    <InputLabel htmlFor="price" value="Price" />

                    <TextInput
                        id="price"
                        type="text"
                        name="price"
                        value={data.price}
                        onChange={(e) => setData("price", e.target.value)}
                        className="mt-1 block w-3/4"
                        isFocused
                        placeholder="Price"
                    />

                    <InputError message={errors.price} className="mt-2" />
                </div>

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
};

export default FruitModal;
