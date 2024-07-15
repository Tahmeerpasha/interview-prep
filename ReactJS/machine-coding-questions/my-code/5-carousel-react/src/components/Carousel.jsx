import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const Carousel = ({
    isLoading = false,
    LoadingComponent = () => { return <div>Loading...</div> },
    images = [],
    imageLimit = 1,
    imageClick = () => { },
    defaultCurrentImageIndex = 0

}) => {
    const [currImgIndex, setCurrImgIndex] = useState(0);
    const [imgWidth, setImgWidth] = useState(null);
    const imgRef = useRef(null);
    const goToPrev = () => {
        setCurrImgIndex((index) => {
            return index === 0 ? images.length - 1 : index - 1;
        })
    }

    const goToNext = () => {
        setCurrImgIndex((index) => {
            return index === images.length - 1 ? 0 : index + 1;
        })
    }

    useEffect(() => {
        if (images.length > 0)
            setCurrImgIndex(defaultCurrentImageIndex);
    }, [images, defaultCurrentImageIndex])

    return (
        isLoading ? <LoadingComponent /> :
            <div className="carousel" style={{ width: imageLimit * imgWidth }}>
                <div
                    className="image-container"
                    style={{ transform: `translateX(-${currImgIndex * imgWidth}px)` }}
                >
                    {images
                        .map((image, index) => {
                            return (
                                <img
                                    onLoad={() => { setImgWidth(imgRef?.current?.offsetWidth) }}
                                    ref={imgRef}
                                    key={image.id || index}
                                    src={image.url || ''}
                                    alt={image.title}
                                    onClick={() => imageClick(image, index)}
                                    className="image"
                                />)
                        })}
                </div>
                <button className="btn prev" onClick={goToPrev}>Prev</button>
                <button className="btn next" onClick={goToNext}>Next</button>
            </div>
    )
}

Carousel.propTypes = {
    images: PropTypes.array,
    imageClick: PropTypes.func,
    isLoading: PropTypes.bool,
    LoadingComponent: PropTypes.element,
    imageLimit: PropTypes.number,
    defaultCurrentImageIndex: PropTypes.number,
};


export default Carousel