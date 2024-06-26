import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { Stepper } from '../../components/Stepper'
import { useAppState } from '../../useAppState';
import { MemorialFormInput } from '../../memorialForm/types';
import heart from '../../assets/heart.png';
import { Button } from '../../components/Button';

export const Route = createLazyFileRoute('/steps/preview')({
    component: Preview
})

export function Preview() {
    const [state] = useAppState<MemorialFormInput>();
    const step = 2;
    const navigate = useNavigate();

    function nextStep() {
        navigate({ to: '/steps/personalDetails' });
    }

    function previousStep() {
        navigate({ to: '/steps/tributeDetails' });
    }

    return (
        <>
            <Stepper step={step} />
            <div className="shadow max-w-96 aspect-[3/4] mx-auto pt-16 px-5 border rounded-lg mb-6">
                <p className="text-center text-lg">In Memory Of</p>
                <p className="text-center font-bold text-3xl">{state.honoreeName}</p>
                <p className="text-center text-lg">Have we received a donation</p>
                <img src={heart} className="w-20 mx-auto" />
                <p className="text-center">{state.message}</p>
            </div>

            <Button onClick={nextStep}>Continue</Button >
            <Button onClick={previousStep} variant="outline">Edit tribute</Button>
        </>
    )
}