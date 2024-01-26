import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

const DeleteCategoryModal = ({ category }) => {
    const {
        data,
        setData,
        processing,
        delete: destroy,
        reset,
    } = useForm({
        confirmingDeletion: false,
    });

    useEffect(() => {
        if (category) setData({ ...category, confirmingDeletion: true });
    }, [category]);

    const closeModal = () => {
        setData("confirmingDeletion", false);
        reset();
    };

    const deleteCategory = (e) => {
        e.preventDefault();

        destroy(
            route("categories.destroy", {
                id: data.id,
            }),
            {
                preserveScroll: true,
                onSuccess: () => closeModal(),
                onError: () => {},
            }
        );
    };

    return (
        <Modal show={data.confirmingDeletion} onClose={closeModal}>
            <form onSubmit={deleteCategory} className="p-6">
                <h2 className="text-lg font-medium text-gray-900">
                    Are you sure you want to delete ?
                </h2>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={closeModal}>
                        Cancel
                    </SecondaryButton>

                    <DangerButton className="ms-3" disabled={processing}>
                        Delete
                    </DangerButton>
                </div>
            </form>
        </Modal>
    );
};

export default DeleteCategoryModal;
