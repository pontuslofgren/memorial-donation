import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useAppState } from '../../useAppState'
import { Field } from '../../components/Field';
import { Input } from '../../components/Input';
import { useForm } from 'react-hook-form';
import { Form } from '../../components/Form'
import { Button } from '../../components/Button';

export const Route = createLazyFileRoute('/steps/paymentDetails')({
    component: PaymentDetails,
})

function PaymentDetails() {
    const [state] = useAppState();
    console.log(state);
    const {
        handleSubmit,
    } = useForm({ defaultValues: state, mode: "onSubmit" });
    // const watchPassword = watch("password");
    const navigate = useNavigate();

    const saveData = (data) => {
        console.log("Hello")
        // setState({ ...state, ...data });
        navigate({ to: '/about' });
    };

    return (
        <Form onSubmit={handleSubmit(saveData)}>
            <fieldset>
                <Button>Next {">"}</Button>
            </fieldset>
        </Form>
    );
}