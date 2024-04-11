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
    const [customAmountVisible, setCustomAmountVisible] = useState<boolean>(false);
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
                        <div>
                            <label for="100">
                                <input
                                    type="radio"
                                    value="100"
                                    name="amountRadio"
                                    {...register("amount")}
                                    onChange={toggleCustomAmount}
                                    checked={selectedAmount === "100"}
                                />
                                $100
                            </label>
                            <label for="500">
                                <input
                                    type="radio"
                                    value="500"
                                    name="amountRadio"
                                    {...register("amount")}
                                    onChange={toggleCustomAmount}
                                    checked={selectedAmount === "500"}
                                />
                                $500
                            </label>
                            <label for="custom">
                                <input
                                    type="radio"
                                    value="custom"
                                    name="amountRadio"
                                    onChange={toggleCustomAmount}
                                    checked={selectedAmount === "custom"}
                                />
                                Custom
                            </label>


                            {selectedAmount === "custom" && (
                                <Input
                                    {...register("amount", { required: "Amount is required" })}
                                    id="amount" type="number"
                                />
                            )}

                        </div>
                    </Field>

                    <Button>Continue</Button>
                </fieldset>
            </Form >
        </>
    );
}