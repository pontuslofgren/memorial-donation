import { useNavigate } from '@tanstack/react-router'


export const Form = ({ children, onSubmit, nextStep, ...props }) => {
    const navigate = useNavigate();

    const onSubmitCustom = (e) => {
        e.preventDefault();
        onSubmit();
        navigate(nextStep);
    };

    return (
        <form className="mb-6" onSubmit={onSubmitCustom} {...props} noValidate>
            {children}
        </form>
    );
};