import React from 'react';
//import CV from '../../(assets)/cv.pdf'

const CTA = () => {
    return (
        <div className='cta'>
            <a href="/cv.pdf" download className='btn btn-primary'>Télécharger mon CV</a>
            <a href="#footer" className='btn'>Mes Coordonnées</a>
        </div>
    );
};

export default CTA;
