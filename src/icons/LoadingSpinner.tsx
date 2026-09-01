const LoadingSpinner = ({ size = 'h-12 w-12', color = 'border-indigo-600' }: { size?: string, color?: string }) => (
    <div className="flex justify-center items-center h-full">
        <div className={`animate-spin rounded-full ${size} border-b-2 ${color}`}></div>
    </div>
);

export default LoadingSpinner