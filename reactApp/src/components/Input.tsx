import { forwardRef } from "react";

type Props = {
    id: string;
}

export const Input = forwardRef((props: Props, ref) => {
    return <input ref={ref} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} {...props} />;
});