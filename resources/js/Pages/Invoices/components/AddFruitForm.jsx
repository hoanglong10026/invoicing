import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Select from "@/Components/Select";
import TextInput from "@/Components/TextInput";
import React, { useState } from "react";
import { formatNumber } from "@/Hooks/useFormat";
import InputError from "@/Components/InputError";

const AddFruitForm = ({ fruits, onChange }) => {
    const [errors, setErrors] = useState({
        fruit_id: null,
        quantity: null,
    });
    const [data, setData] = useState({
        fruit_id: "",
        quantity: "",
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const fruitOptions = fruits.map((f) => {
        return {
            label: `${f.name} - ${formatNumber(f.price)}`,
            value: f.id,
        };
    });

    const handleSubmit = () => {
        if (!data.fruit_id) {
            setErrors((prev) => {
                return {
                    ...prev,
                    fruit_id: "The fruit field is required.",
                };
            });
        } else {
            setErrors((prev) => {
                return {
                    ...prev,
                    fruit_id: null,
                };
            });
        }

        if (!data.quantity) {
            setErrors((prev) => {
                return {
                    ...prev,
                    quantity: "The quantity field is required.",
                };
            });
        } else {
            setErrors((prev) => {
                return {
                    ...prev,
                    quantity: null,
                };
            });
        }

        if (data.fruit_id && data.quantity) {
            const fruit = fruits.find((f) => f.id === parseInt(data.fruit_id));
            onChange({
                ...data,
                price: fruit.price,
            });
            setData({
                fruit_id: "",
                quantity: "",
            });
        }
    };

    return (
        <>
            <div className="grid md:grid-cols-4 gap-4 mt-6">
                <h3 className="text-md font-medium text-gray-900 flex items-center">
                    <div>Add new Fruit </div>
                </h3>
                <div>
                    <InputLabel htmlFor="fruit_id" value="Fruit" />

                    <Select
                        id="fruit_id"
                        name="fruit_id"
                        value={data.fruit_id || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full"
                        options={[
                            {
                                label: "",
                                value: "",
                            },
                            ...fruitOptions,
                        ]}
                    />


                </div>
                <div>
                    <InputLabel htmlFor="quantity" value="Quantity" />

                    <TextInput
                        id="quantity"
                        type="number"
                        name="quantity"
                        value={data.quantity}
                        onChange={handleChange}
                        className="mt-1 block w-full"
                        isFocused
                    />


                </div>

                <div className="flex items-end">
                    <PrimaryButton
                        type="button"
                        onClick={() => {
                            handleSubmit();
                        }}
                    >
                        Add
                    </PrimaryButton>
                </div>
            </div>
            <InputError message={errors.quantity} className="mt-2" />
            <InputError message={errors.fruit_id} className="mt-2" />
        </>
    );
};

export default AddFruitForm;
