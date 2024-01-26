import PrimaryButton from "@/Components/PrimaryButton";

export default function CategoriesItem({
    setDeleteData,
    setUpdateData,
    category,
    index,
}) {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{category.name}</td>
            <td className="flex gap-4">
                <PrimaryButton
                    onClick={() => {
                        setUpdateData({
                            ...category,
                        });
                    }}
                >
                    Edit
                </PrimaryButton>
                <PrimaryButton
                    onClick={() => {
                        setDeleteData({
                            ...category,
                        });
                    }}
                >
                    Delete
                </PrimaryButton>
            </td>
        </tr>
    );
}
