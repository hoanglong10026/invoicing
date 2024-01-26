import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

const DeleteFruitModal = ({ fruit }) => {
    const {
        data,
        setData,
        processing,
        delete: destroy,
        reset,
    } = useForm({
        openModal: false,
    });

    useEffect(() => {
        if (fruit) setData({ ...fruit, openModal: true });
    }, [fruit]);

    const closeModal = () => {
        setData("openModal", false);
        reset();
    };

    const deleteFruit = (e) => {
        e.preventDefault();

        destroy(
            route("fruits.destroy", {
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
        <Modal show={data.openModal} onClose={closeModal}>
            <form onSubmit={deleteFruit} className="p-6">
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

export default DeleteFruitModal;
