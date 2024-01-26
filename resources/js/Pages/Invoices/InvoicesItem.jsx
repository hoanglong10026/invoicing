import PrimaryButton from "@/Components/PrimaryButton";
import dayjs from "dayjs";
import { formatNumber } from "@/Hooks/useFormat";

export default function InvoicesItem({
    setDeleteData,
    setUpdateData,
    invoice,
    index,
}) {
    const createdAt = dayjs(invoice.created_at).format("DD-MM-YYYY HH:mm");
    const updatedAt = dayjs(invoice.updated_at).format("DD-MM-YYYY HH:mm");

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{invoice.customer_name}</td>
            <td className="text-right pr-5">{formatNumber(invoice.amount)}</td>
            <td>{createdAt}</td>
            <td>{updatedAt === createdAt ? "NA" : updatedAt}</td>
            <td className="flex gap-4">
                <PrimaryButton
                    onClick={() => {
                        setUpdateData({
                            ...invoice,
                        });
                    }}
                >
                    Edit
                </PrimaryButton>
                <PrimaryButton
                    onClick={() => {
                        setDeleteData({
                            ...invoice,
                        });
                    }}
                >
                    Delete
                </PrimaryButton>
            </td>
        </tr>
    );
}
