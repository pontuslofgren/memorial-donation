type Props = {
    children: React.ReactElement;
    onSubmit: () => void;
}

export const Form = ({ children, onSubmit, ...props }: Props) => {

    return (
        <form className="mb-6" onSubmit={onSubmit} {...props} noValidate>
            {children}
        </form>
    );
};