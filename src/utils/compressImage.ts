const DEFAULT_MAX_EDGE = 1200;
const DEFAULT_QUALITY = 0.8;

/** Escala proporcional para que o maior lado não ultrapasse `maxEdge`. */
export function getContainSize(
    width: number,
    height: number,
    maxEdge: number = DEFAULT_MAX_EDGE,
): { width: number; height: number } {
    if (width <= 0 || height <= 0) {
        return { width: 0, height: 0 };
    }
    const longest = Math.max(width, height);
    if (longest <= maxEdge) {
        return { width, height };
    }
    const scale = maxEdge / longest;
    return {
        width: Math.max(1, Math.round(width * scale)),
        height: Math.max(1, Math.round(height * scale)),
    };
}

function loadImageFromFile(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            URL.revokeObjectURL(url);
            resolve(img);
        };
        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Não foi possível carregar a imagem.'));
        };
        img.src = url;
    });
}

function supportsWebpEncoding(canvas: HTMLCanvasElement): boolean {
    try {
        return canvas.toDataURL('image/webp').startsWith('data:image/webp');
    } catch {
        return false;
    }
}

function canvasToDataUrl(
    canvas: HTMLCanvasElement,
    mimeType: 'image/webp' | 'image/jpeg',
    quality: number,
): Promise<string> {
    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    reject(new Error('Falha ao comprimir a imagem.'));
                    return;
                }
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.onerror = () => reject(new Error('Falha ao ler a imagem comprimida.'));
                reader.readAsDataURL(blob);
            },
            mimeType,
            quality,
        );
    });
}

/**
 * Redimensiona e comprime um arquivo de imagem para data URL WebP (JPEG se WebP
 * não for suportado), reduzindo o impacto no localStorage.
 */
export async function compressImageFile(
    file: File,
    options?: { maxEdge?: number; quality?: number },
): Promise<string> {
    const maxEdge = options?.maxEdge ?? DEFAULT_MAX_EDGE;
    const quality = options?.quality ?? DEFAULT_QUALITY;

    const img = await loadImageFromFile(file);
    const { width, height } = getContainSize(img.naturalWidth, img.naturalHeight, maxEdge);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Canvas não disponível neste navegador.');
    }

    ctx.drawImage(img, 0, 0, width, height);
    const mimeType = supportsWebpEncoding(canvas) ? 'image/webp' : 'image/jpeg';
    return canvasToDataUrl(canvas, mimeType, quality);
}
