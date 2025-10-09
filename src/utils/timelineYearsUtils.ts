export const getYearStep = (scale: number) => {
    if (scale >= .6) return 1;
    if (scale >= .4) return 2;
    if (scale >= .15) return 5;
    if (scale >= .08) return 10;
    if (scale >= .04) return 20;
    if (scale >= .03) return 25;
    if (scale >= .016) return 50;
    if (scale >= .007) return 100;
    if (scale >= .003) return 200;
    if (scale >= .0015) return 500;
    if (scale >= 0) return 1000;
    return 1;
}

export const getMarkerStep = (yearStep: number) => {
    if (yearStep <= 10) return yearStep;
    if (yearStep === 20) return 10;
    if (yearStep === 25) return 5;
    if (yearStep === 50) return 5;
    if (yearStep === 100) return 10;
    return 1;
}