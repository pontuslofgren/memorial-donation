import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useAppState } from '../../useAppState'
import { Field } from '../../components/Field';
import { Input } from '../../components/Input';
import { useForm } from 'react-hook-form';
import { Form } from '../../components/Form'
import { Button } from '../../components/Button';
import { tributeDetailsFormInput } from '../../memorialForm/types';
import { Stepper } from '../../components/Stepper';
import { Textarea } from '../../components/Textarea';
import { useState } from 'react';

export const Route = createLazyFileRoute('/tributeDetails/lazy copy')({
    component: TributeDetails,
})

function TributeDetails() {
    const [state, setState] = useAppState();
    const [selectedAmount, setSelectedAmount] = useState("");
    const step = 1;
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<tributeDetailsFormInput>({ defaultValues: state, mode: "onSubmit" });
    // const watchPassword = watch("password");
    const navigate = useNavigate();

    const saveData = (data) => {
        setState({ ...state, ...data });
        navigate({ to: '/steps/preview' });
    };

    const toggleCustomAmount = (e) => {
        const { value } = e.target;
        setSelectedAmount(value);

    }

    return (
        <>
            <Stepper step={step} />
            <Form onSubmit={handleSubmit(saveData)}>
                <fieldset>
                    <legend>Honoree details</legend>
                    <Field label="Honoree name" error={errors?.honoreeName}>
                        <Input
                            {...register("honoreeName", { required: "Honoree name is required" })}
                            id="honoreeName"
                        />
                    </Field>

                    <Field label="Message" error={errors?.message}>
                        <Textarea
                            {...register("message", { required: "Message is required" })}
                            id="message"
                        />
                    </Field>

                    <Field label="Amount" error={errors?.message}>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="flex items-center ps-4 border border-gray-200 rounded mb-2">
                                <input
                                    {...register("amount", {
                                        required: selectedAmount !== "custom" ? "Amount is required" : undefined,
                                    })}
                                    onChange={toggleCustomAmount}
                                    checked={selectedAmount === "150"}
                                    value="150"
                                    id="bordered-radio-150"
                                    type="radio"
                                    name="amount"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                <label
                                    htmlFor="bordered-radio-150"
                                    className="w-full py-4 ms-2 text-sm font-medium text-gray-900">
                                    SEK 150
                                </label>
                            </div>
                            <div className="flex items-center ps-4 border border-gray-200 rounded mb-2">
                                <input
                                    {...register("amount", {
                                        required: selectedAmount !== "custom" ? "Amount is required" : undefined,
                                    })}
                                    onChange={toggleCustomAmount}
                                    checked={selectedAmount === "500"}
                                    value="500"
                                    id="bordered-radio-500"
                                    type="radio"
                                    name="amount"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                <label
                                    htmlFor="bordered-radio-500"
                                    className="w-full py-4 ms-2 text-sm font-medium text-gray-900">
                                    SEK 500
                                </label>
                            </div>
                            <div className="flex items-center ps-4 border border-gray-200 rounded mb-2">
                                <input
                                    {...register("amount", {
                                        required: selectedAmount !== "custom" ? "Amount is required" : undefined,
                                    })}
                                    onChange={toggleCustomAmount}
                                    checked={selectedAmount === "1000"}
                                    value="1000"
                                    id="bordered-radio-1000"
                                    type="radio"
                                    name="amount"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                <label
                                    htmlFor="bordered-radio-1000"
                                    className="w-full py-4 ms-2 text-sm font-medium text-gray-900">
                                    SEK 1 000
                                </label>
                            </div>
                            <div className="flex items-center ps-4 border border-gray-200 rounded mb-2">
                                <input
                                    onChange={toggleCustomAmount}
                                    checked={selectedAmount === "custom"}
                                    id="bordered-radio-custom"
                                    type="radio"
                                    value="custom"
                                    name="amount"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                <label
                                    htmlFor="bordered-radio-custom"
                                    className="w-full py-4 ms-2 text-sm font-medium text-gray-900">
                                    Other
                                </label>
                            </div>

                            {selectedAmount === "custom" && (
                                <input
                                    {...register("amount", { required: "Amount is required" })}
                                    type="number"
                                    id="amount"
                                    placeholder="Enter custom amount"
                                    className="col-span-2 flex justify-center items-center px-4 border border-gray-200 rounded mb-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                            )}

                        </div>
                    </Field>

                    <Button>Continue</Button>
                </fieldset>
            </Form >
        </>
    );
}