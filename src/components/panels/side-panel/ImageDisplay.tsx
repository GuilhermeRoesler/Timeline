import { useState } from 'react';
import { useSidePanelStore } from '@/store/sidePanelStore';
import { getUnsplashBrowseProps } from '@/utils/responsiveImage';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ImageDisplay = () => {
    const { links, linkIndex } = useSidePanelStore((state) => state);
    const [animation, setAnimation] = useState('');

    const handleForward = () => {
        if (animation === '') {
            setAnimation('sidePanelSwitchImage 1s ease forwards');
            setTimeout(() => {
                useSidePanelStore.setState({ linkIndex: linkIndex + 1 });
            }, 500);
            setTimeout(() => {
                setAnimation('');
            }, 1000);
        }
    };

    const handleBackwards = () => {
        if (animation === '') {
            setAnimation('sidePanelSwitchImage 1s ease forwards reverse');
            setTimeout(() => {
                useSidePanelStore.setState({ linkIndex: linkIndex - 1 });
            }, 500);
            setTimeout(() => {
                setAnimation('');
            }, 1000);
        }
    };

    const current = links.length > 0 ? links[linkIndex % links.length] : undefined;

    const handleClick = () => {
        if (!current) return;
        useSidePanelStore.setState({
            linkValue: current.regular,
            imageSelectedType: 'link',
        });
    };

    if (!current) {
        return null;
    }

    const imageProps = getUnsplashBrowseProps(current, 'display');

    return (
        <div className="image-display">
            <Button
                variant="secondary"
                size="icon-sm"
                onClick={handleBackwards}
                className="absolute top-1/2 left-2 z-10 -translate-y-1/2 bg-black/50 text-white hover:bg-black/60"
            >
                <ChevronLeft className="h-5 w-5" />
            </Button>
            <img
                {...imageProps}
                alt="Image display"
                loading="lazy"
                decoding="async"
                style={{ animation: animation }}
            />
            <Button
                variant="secondary"
                size="icon-sm"
                onClick={handleForward}
                className="absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-black/50 text-white hover:bg-black/60"
            >
                <ChevronRight className="h-5 w-5" />
            </Button>
            {!animation && (
                <Button
                    variant="secondary"
                    onClick={handleClick}
                    className="absolute bottom-0 left-1/2 z-5 -translate-x-1/2 -translate-y-1 bg-black/50 text-white hover:bg-black/60"
                >
                    Selecionar
                </Button>
            )}
        </div>
    );
};

export default ImageDisplay;
