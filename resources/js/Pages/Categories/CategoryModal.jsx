import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

const CategoryModal = ({ category }) => {
    const { data, setData, processing, put, post, reset, errors, clearErrors } =
        useForm({
            openModal: false,
        });

    const closeModal = () => {
        setData("openModal", false);
        reset();
    };

    const createCategory = () => {
        post(route("categories.store"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => {},
        });
    };

    const updateCategory = () => {
        put(
            route("categories.update", {
                id: data.id,
            }),
            {
                preserveScroll: true,
                onSuccess: () => closeModal(),
                onError: () => {},
            }
        );
    };

    const saveCategory = (e) => {
        e.preventDefault();
        if (data.id > 0) {
            updateCategory();
        } else {
            createCategory();
        }
    };

    useEffect(() => {
        if (category) {
            setData({
                ...category,
                openModal: true,
            });
            clearErrors();
        }
    }, [category]);

    return (
        <Modal show={data.openModal} onClose={closeModal}>
            <form onSubmit={saveCategory} className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                    {data.id > 0 ? "Edit" : "Add"}
                </h2>

                <div className="mt-6">
                    <InputLabel
                        htmlFor="name"
                        value="name"
                        className="sr-only"
                    />

                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="mt-1 block w-3/4"
                        isFocused
                        placeholder="Category name"
                    />

                    <InputError message={errors.name} className="mt-2" />
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

export default CategoryModal;
