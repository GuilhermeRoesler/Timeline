import { useEffect } from "react";
import Period from './Period';
import { usePeriodsLoaderStore } from "../../store/periodsEventsLoaderStore";

const PeriodsLoader = () => {
    const periods = usePeriodsLoaderStore((state) => state.periods);
    const loadPeriodsFromLocalStorage = usePeriodsLoaderStore((state) => state.loadPeriodsFromLocalStorage);

    useEffect(() => {
        loadPeriodsFromLocalStorage();
    }, []);

    return (
        <>
            {periods.map((period, index) => (
                <Period key={index} period={period} />
            ))}
        </>
    );
};

export default PeriodsLoader;