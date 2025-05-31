import Image from 'next/image';
import styles from './ImageComponent.module.css';

export const ImageComponent = ({ src, alt }: { src?: string; alt?: string }) => {
    if (!src) {
        return null;
    }

    return (
        <div className={`image-container ${styles.imageContainer}`}>
            <Image
                layout='responsive'
                width={800}
                height={450}
                objectFit='contain'
                src={src}
                alt={alt || ''} 
                loading="lazy"
            />
        </div>
    );
};