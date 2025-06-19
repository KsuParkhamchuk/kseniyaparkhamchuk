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
            // layout='responsive'
                priority
                width={300} 
                height={0} 
                sizes="100vw"
                src={src}
                alt={alt || ''}
                className={isZoomedIn ? styles.zoomedInImg : styles.image}
            />
        </div>
    );
};