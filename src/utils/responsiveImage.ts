/** Variantes de uma foto Unsplash para srcset / seleção. */
export type UnsplashImage = {
    thumb: string;
    small: string;
    regular: string;
};

const UNSPLASH_HOST = 'images.unsplash.com';

export function isUnsplashUrl(url: string): boolean {
    try {
        return new URL(url).hostname === UNSPLASH_HOST;
    } catch {
        return false;
    }
}

/** Ajusta largura e força WebP na CDN do Unsplash. */
export function withUnsplashWidth(url: string, width: number): string {
    const parsed = new URL(url);
    parsed.searchParams.set('w', String(width));
    parsed.searchParams.set('fm', 'webp');
    parsed.searchParams.set('q', '80');
    return parsed.toString();
}

type ResponsiveImageProps = {
    src: string;
    srcSet?: string;
    sizes?: string;
};

/**
 * Monta `src` / `srcSet` / `sizes` para URLs Unsplash.
 * Data URLs e links externos retornam só `src`.
 */
export function getResponsiveImageProps(
    url: string,
    options?: { widths?: number[]; sizes?: string },
): ResponsiveImageProps {
    if (!url || url.startsWith('data:') || !isUnsplashUrl(url)) {
        return { src: url };
    }

    const widths = options?.widths ?? [400, 800, 1080];
    const srcSet = widths.map((width) => `${withUnsplashWidth(url, width)} ${width}w`).join(', ');

    return {
        src: withUnsplashWidth(url, widths[0]!),
        srcSet,
        sizes: options?.sizes ?? '100vw',
    };
}

/** Props de srcset a partir das variantes já retornadas pela API. */
export function getUnsplashBrowseProps(
    image: UnsplashImage,
    kind: 'thumb' | 'display',
): ResponsiveImageProps {
    if (kind === 'thumb') {
        return {
            src: image.thumb,
            srcSet: `${image.thumb} 200w, ${image.small} 400w`,
            sizes: '56px',
        };
    }

    return {
        src: image.small,
        srcSet: `${image.small} 400w, ${image.regular} 1080w`,
        sizes: '(max-width: 640px) 90vw, 320px',
    };
}
