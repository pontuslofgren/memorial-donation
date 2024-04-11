import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useAppState } from '../useAppState'
import { Field } from '../components/Field';
import { Input } from '../components/Input';
import { useForm } from 'react-hook-form';
import { Form } from '../components/Form'
import { Button } from '../components/Button';

export const Route = createLazyFileRoute('/payment')({
    component: PaymentDetails,
})

function PaymentDetails() {
    const [state] = useAppState();
    console.log(state);
    const { handleSubmit } = useForm({ defaultValues: state, mode: "onSubmit" });

    const submitData = (data) => {
        console.info(data);
        // Submit data to the server
    };

    return (
        <Form onSubmit={handleSubmit(submitData)}>
            <Field label="Credit card" error={errors?.card}>
                <Input
                    {...register("card", { required: "card is required" })}
                    id="card"
                />
            </Field>
            <Button>Next {">"}</Button>
        </Form>
    );
}