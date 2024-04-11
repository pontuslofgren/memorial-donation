import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useAppState } from '../../useAppState'
import { Field } from '../../components/Field';
import { Input } from '../../components/Input';
import { useForm } from 'react-hook-form';
import { Form } from '../../components/Form'
import { Button } from '../../components/Button';
import { tributeDetailsFormInput } from '../../memorialForm/types';
import { Stepper } from '../../components/Stepper';

export const Route = createLazyFileRoute('/tributeDetails/lazy copy')({
    component: TributeDetails,
})

function TributeDetails() {
    const [state, setState] = useAppState();
    const step = 1;
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm<tributeDetailsFormInput>({ defaultValues: state, mode: "onSubmit" });
    // const watchPassword = watch("password");
    const navigate = useNavigate();

    const saveData = (data) => {
        console.log("Hello")
        setState({ ...state, ...data });
        navigate({ to: '/steps/personalDetails' });
    };

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
                        <Input
                            {...register("message", { required: "Message is required" })}
                            id="message"
                        />
                    </Field>

                    <Field label="Amount" error={errors?.message}>
                        <Input
                            {...register("amount", { required: "Amount is required" })}
                            id="amount" type="number"
                        />
                    </Field>

                    <Button>Next {">"}</Button>
                </fieldset>
            </Form>
        </>
    );
}