export const getYearStep = (scale: number) => {
    if (scale >= 0.6) return 1;
    if (scale >= 0.4) return 2;
    if (scale >= 0.15) return 5;
    if (scale >= 0.08) return 10;
    if (scale >= 0.04) return 20;
    if (scale >= 0.03) return 25;
    if (scale >= 0.016) return 50;
    if (scale >= 0.007) return 100;
    if (scale >= 0.003) return 200;
    if (scale >= 0.0015) return 500;
    if (scale >= 0) return 1000;
    return 1;
};

export const getMarkerStep = (yearStep: number) => {
    if (yearStep <= 10) return yearStep;
    if (yearStep === 20) return 10;
    if (yearStep === 25) return 5;
    if (yearStep === 50) return 5;
    if (yearStep === 100) return 10;
    return 1;
};
