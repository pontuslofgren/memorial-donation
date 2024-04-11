import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useAppState } from '../useAppState'
import { Field } from '../components/Field';
import { Input } from '../components/Input';
import { useForm } from 'react-hook-form';
import { Form } from '../components/Form'
import { Button } from '../components/Button';

export const Route = createLazyFileRoute('/tributeDetails/lazy copy')({
    component: TributeDetails,
})

function TributeDetails() {
    const [state, setState] = useAppState();
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm({ defaultValues: state, mode: "onSubmit" });
    // const watchPassword = watch("password");
    const navigate = useNavigate();

    const saveData = (data) => {
        console.log("Hello")
        setState({ ...state, ...data });
        navigate({ to: '/personalDetails' });
    };

    return (
        <Form onSubmit={handleSubmit(saveData)}>
            <fieldset>
                <legend>Contact</legend>
                <Field label="Honoree name" error={errors?.honoree}>
                    <Input
                        {...register("honoree", { required: "Honoree is required" })}
                        id="honoree"
                    />
                </Field>

                <Field label="Message" error={errors?.message}>
                    <Input
                        {...register("message", { required: "Message is required" })}
                        id="message"
                    />
                </Field>

                <Button>Next {">"}</Button>
            </fieldset>
        </Form>
    );
}