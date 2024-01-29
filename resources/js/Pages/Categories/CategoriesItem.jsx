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
            <td>{category.fruits_count ? category.fruits_count : '-'}</td>
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
                    disabled={category.fruits_count > 0}
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
