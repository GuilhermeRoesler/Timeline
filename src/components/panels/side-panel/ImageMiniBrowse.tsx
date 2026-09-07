import { useSidePanelStore } from '../../../store/sidePanelStore';
import { getUnsplashBrowseProps } from '@/utils/responsiveImage';

const ImageMiniBrowse = () => {
    const links = useSidePanelStore((state) => state.links);

    if (links.length === 0) {
        return null;
    }

    return (
        <div className="image-mini-browse">
            {links.map((image, index) => {
                const imageProps = getUnsplashBrowseProps(image, 'thumb');
                return (
                    <img
                        key={`${image.thumb}-${index}`}
                        {...imageProps}
                        alt={`image-${index}`}
                        loading="lazy"
                        decoding="async"
                        onClick={() => useSidePanelStore.setState({ linkIndex: index })}
                    />
                );
            })}
        </div>
    );
};

export default ImageMiniBrowse;
