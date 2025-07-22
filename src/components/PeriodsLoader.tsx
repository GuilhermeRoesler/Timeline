import { useState, useEffect } from "react";
import { type Period as PeriodType } from '../models/period';
import Period from './Period';

const PeriodsLoader = () => {
    const [periods, setPeriods] = useState<PeriodType[]>([]);
    useEffect(() => {
        const periods = localStorage.getItem('periods');
        if (periods) setPeriods(JSON.parse(periods));
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