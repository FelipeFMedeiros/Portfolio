import type { ImgHTMLAttributes } from 'react';
import { responsiveImages } from '@/generated/images';

export default function ResponsiveImage({ src, sizes = '100vw', ...props }: ImgHTMLAttributes<HTMLImageElement> & { src: string }) {
    const image = responsiveImages[src];
    return <img {...props} src={image?.src ?? src} srcSet={image?.srcSet ?? props.srcSet} sizes={sizes}
        width={props.width ?? image?.width} height={props.height ?? image?.height} decoding={props.decoding ?? 'async'} />;
}
