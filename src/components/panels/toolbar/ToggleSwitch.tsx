const ToggleSwitch = ({
    id,
    checked,
    onChange,
}: {
    id: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <label htmlFor={`cb-${id}`} className="relative inline-flex cursor-pointer items-center">
            <input
                id={`cb-${id}`}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-green-500 peer-checked:after:translate-x-5" />
        </label>
    );
};

export default ToggleSwitch;
