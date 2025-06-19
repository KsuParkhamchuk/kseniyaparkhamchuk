import Image from 'next/image';
import styles from './ImageComponent.module.css';
import { useState } from 'react';

export const ImageComponent = ({ src, alt }: { src?: string; alt?: string }) => {

    const [isZoomedIn, setIsZoomedIn] = useState<boolean>(false)
    
    if (!src) {
        return null;
    }

    const zoom = () => {
        setIsZoomedIn(prev => !prev)
    }

    return (
        <div className={`image-container ${isZoomedIn ? styles.zoomedInContainer : styles.imageContainer}`} onClick={zoom}>
            <Image
                layout='responsive'
                width={800}
                height={450}
                objectFit='contain'
                src={src}
                alt={alt || ''} 
                loading="lazy"
                className={isZoomedIn ? styles.zoomedInImg : ''}
            />
        </div>
    );
};