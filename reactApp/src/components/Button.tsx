import { ReactElement } from "react";

type Props = {
    children: ReactElement | string;
    variant?: string;
    onClick?: () => void;
}

export const Button = (
    ({ children, variant = "primary", ...props }: Props) => {


        const primary = "w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2";
        const secondary = "w-full text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2";

        return (
            <button className={variant === "primary" ? primary : secondary} {...props}>
                {children}
            </button>
        );
    }
);