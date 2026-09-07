import { describe, expect, it } from 'vitest';
import {
    getResponsiveImageProps,
    getUnsplashBrowseProps,
    isUnsplashUrl,
    withUnsplashWidth,
    type UnsplashImage,
} from './responsiveImage';

const sample = 'https://images.unsplash.com/photo-123?crop=entropy&fm=jpg&q=80&w=400';

describe('isUnsplashUrl', () => {
    it('reconhece host Unsplash', () => {
        expect(isUnsplashUrl(sample)).toBe(true);
        expect(isUnsplashUrl('https://example.com/a.jpg')).toBe(false);
        expect(isUnsplashUrl('data:image/jpeg;base64,abc')).toBe(false);
        expect(isUnsplashUrl('not-a-url')).toBe(false);
    });
});

describe('withUnsplashWidth', () => {
    it('define w, fm=webp e q', () => {
        const result = withUnsplashWidth(sample, 800);
        const params = new URL(result).searchParams;
        expect(params.get('w')).toBe('800');
        expect(params.get('fm')).toBe('webp');
        expect(params.get('q')).toBe('80');
    });
});

describe('getResponsiveImageProps', () => {
    it('só retorna src para data URL', () => {
        expect(getResponsiveImageProps('data:image/webp;base64,xx')).toEqual({
            src: 'data:image/webp;base64,xx',
        });
    });

    it('monta srcSet para Unsplash', () => {
        const props = getResponsiveImageProps(sample, {
            widths: [400, 800],
            sizes: '100%',
        });
        expect(props.src).toContain('w=400');
        expect(props.src).toContain('fm=webp');
        expect(props.srcSet).toContain('400w');
        expect(props.srcSet).toContain('800w');
        expect(props.sizes).toBe('100%');
    });
});

describe('getUnsplashBrowseProps', () => {
    const image: UnsplashImage = {
        thumb: 'https://images.unsplash.com/thumb',
        small: 'https://images.unsplash.com/small',
        regular: 'https://images.unsplash.com/regular',
    };

    it('usa thumb para miniaturas', () => {
        expect(getUnsplashBrowseProps(image, 'thumb')).toEqual({
            src: image.thumb,
            srcSet: `${image.thumb} 200w, ${image.small} 400w`,
            sizes: '56px',
        });
    });

    it('usa small/regular no display', () => {
        const props = getUnsplashBrowseProps(image, 'display');
        expect(props.src).toBe(image.small);
        expect(props.srcSet).toContain(image.regular);
    });
});
