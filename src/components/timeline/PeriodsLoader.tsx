import Period from './Period';
import { usePeriodsLoaderStore } from "../../store/periodsEventsLoaderStore";

const PeriodsLoader = () => {
    const { periods } = usePeriodsLoaderStore(state => state);

    return (
        <>
            {periods.map((period, index) => (
                <Period key={index} period={period} />
            ))}
        </>
    );
};

export default PeriodsLoader;