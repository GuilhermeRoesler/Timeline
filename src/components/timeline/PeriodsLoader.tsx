import Period from './Period';
import { usePeriodsStore } from '../../store/periodsStore';

const PeriodsLoader = () => {
    const periods = usePeriodsStore((state) => state.periods);

    return (
        <>
            {periods.map((period, index) => (
                <Period key={period.id} period={period} entranceIndex={index} />
            ))}
        </>
    );
};

export default PeriodsLoader;
