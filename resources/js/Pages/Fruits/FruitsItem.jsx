import PrimaryButton from "@/Components/PrimaryButton";

export default function FruitsItem({
    setDeleteData,
    setUpdateData,
    fruit,
    index,
}) {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{fruit.name}</td>
            <td>{fruit.unit}</td>
            <td className="text-right pr-5">{fruit.price}$</td>
            <td>{fruit?.category?.name}</td>
            <td>{fruit.invoice_count ? fruit.invoice_count : '-'}</td>
            <td className="flex gap-4">
                <PrimaryButton
                    onClick={() => {
                        setUpdateData({
                            ...fruit,
                        });
                    }}
                >
                    Edit
                </PrimaryButton>
                <PrimaryButton
                    disabled={fruit.invoice_count > 0}
                    onClick={() => {
                        setDeleteData({
                            ...fruit,
                        });
                    }}
                >
                    Delete
                </PrimaryButton>
            </td>
        </tr>
    );
}
