import { Switch } from '@/components/ui/switch';

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
        <Switch
            id={id}
            checked={checked}
            onCheckedChange={(value) => {
                onChange({
                    target: { checked: value },
                } as React.ChangeEvent<HTMLInputElement>);
            }}
        />
    );
};

export default ToggleSwitch;
