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
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<personalDetailsFormInput>({ defaultValues: state, mode: "onSubmit" });
    const navigate = useNavigate();

    const saveData = (data: personalDetailsFormInput) => {
        setState({ ...state, ...data });
        navigate({ to: '/steps/paymentDetails' });
    };

    return (
        <>
            <Stepper step={step} />
            <h2 className="text-xl mb-3 font-semibold">Personal details</h2>
            <Form onSubmit={handleSubmit(saveData)}>
                <fieldset>
                    <Field label="First name" error={errors?.donorFirstName}>
                        <Input
                            {...register("donorFirstName", { required: "First name is required" })}
                            id="donorFirstName"
                        />
                    </Field>

                    <Field label="Last name" error={errors?.donorLastName}>
                        <Input
                            {...register("donorLastName", { required: "Last name is required" })}
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