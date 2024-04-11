import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useAppState } from '../useAppState'
import { Field } from '../components/Field';
import { Input } from '../components/Input';
import { useForm } from 'react-hook-form';
import { Form } from '../components/Form'
import { Button } from '../components/Button';

export const Route = createLazyFileRoute('/personalDetails')({
    component: PersonalDetails,
})

function PersonalDetails() {
    const [state, setState] = useAppState();
    console.log(state);
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
        navigate({ to: '/about' });
    };

    return (
        <Form onSubmit={handleSubmit(saveData)}>
            <fieldset>
                <legend>Contact</legend>
                <Field label="Name" error={errors?.name}>
                    <Input
                        {...register("name", { required: "Name is required" })}
                        id="name"
                    />
                </Field>

                <Field label="Email" error={errors?.email}>
                    <Input
                        {...register("email", { required: "Email is required" })}
                        id="email"
                    />
                </Field>

                <Button>Next {">"}</Button>
            </fieldset>
        </Form>
    );
}