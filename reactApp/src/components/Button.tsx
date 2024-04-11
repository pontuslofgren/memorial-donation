import { forwardRef, useImperativeHandle, useRef } from "react";

export const Button = forwardRef(
    ({ children, variant = "primary", ...props }, ref) => {
        const buttonRef = useRef();

        useImperativeHandle(ref, () => ({
            click: () => {
                buttonRef.current?.click();
            },
        }));

        return (
            <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" {...props} ref={buttonRef}>
                {children}
            </button>
        );
    }
);