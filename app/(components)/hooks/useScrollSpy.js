import { useEffect, useState } from 'react';

export const useScrollSpy = (items, offset = 0) => {
    const [activeItem, setActiveItem] = useState(null);

    useEffect(() => {
        const observers = {};

        items.forEach(itemId => {
            const element = document.getElementById(itemId);
            if (element) {
                observers[itemId] = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting) {
                            setActiveItem(itemId);
                        }
                    },
                    {
                        rootMargin: `${-offset}px 0px 0px 0px`,
                        threshold: 0.5,
                    }
                );

                observers[itemId].observe(element);
            }
        });

        return () => {
            Object.values(observers).forEach(observer => {
                observer.disconnect();
            });
        };
    }, [items, offset]);

    return activeItem;
}; 