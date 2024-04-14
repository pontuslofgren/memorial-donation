import { forwardRef } from "react";

type Props = {
    id: string;
}

export const Textarea = forwardRef((props: Props, ref) => {
    return <textarea rows={4} ref={ref} className="text-base border border-gray-300 text-gray-900 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" {...props} />;
});