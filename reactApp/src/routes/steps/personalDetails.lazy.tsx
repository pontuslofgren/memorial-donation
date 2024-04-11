import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useAppState } from '../../useAppState'
import { Field } from '../../components/Field';
import { Input } from '../../components/Input';
import { useForm } from 'react-hook-form';
import { Form } from '../../components/Form'
import { Button } from '../../components/Button';
import { personalDetailsFormInput } from '../../memorialForm/types';
import { Stepper } from '../../components/Stepper';

export const Route = createLazyFileRoute('/steps/personalDetails')({
    component: PersonalDetails,
})

function PersonalDetails() {
    const [state, setState] = useAppState();
    const step = 3;
    console.log(state);
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm<personalDetailsFormInput>({ defaultValues: state, mode: "onSubmit" });
    // const watchPassword = watch("password");
    const navigate = useNavigate();

    const saveData = (data) => {
        console.log("Hello")
        setState({ ...state, ...data });
        navigate({ to: '/steps/paymentDetails' });
    };

    return (
        <>
            <Stepper step={step} />
            <Form onSubmit={handleSubmit(saveData)}>
                <fieldset>
                    <legend>Personal Details</legend>
                    <Field label="First name" error={errors?.name}>
                        <Input
                            {...register("donorFirstName", { required: "First name is required" })}
                            id="donorFirstName"
                        />
                    </Field>

                    <Field label="Last name" error={errors?.donorLastName}>
                        <Input
                            {...register("donorLastname", { required: "Last name is required" })}
                            id="donorLastName"
                        />
                    </Field>

                    <Field label="Email" error={errors?.email}>
                        <Input
                            {...register("email", { required: "Email is required" })}
                            id="email"
                        />
                    </Field>

                    <Button>Continue</Button>
                </fieldset>
            </Form>
        </>
    );
}