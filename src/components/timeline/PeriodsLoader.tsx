import Period from './Period';
import { usePeriodsStore } from "../../store/periodsStore";

const PeriodsLoader = () => {
    const { periods } = usePeriodsStore(state => state);

    return (
        <>
            {periods.map((period, index) => (
                <Period key={index} period={period} />
            ))}
        </>
    );
};

export default PeriodsLoader;