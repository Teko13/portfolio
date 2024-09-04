import React from 'react'
import cvView from "../../(assets)/cv-view.png"

function page() {
  return (
    <div className="w-screen h-screen flex items-center gap-3 flex-col justify-center">
        <div className="lg:w-[35%] w-[90%]">
            <img src={cvView.src} alt="" />
        </div>
        <a href='/cv.pdf' download="/cv.pdf" className="bg-primary rounded-md p-2 text-bg-variant font-black">
            TELECHARGER
        </a>
        <a href="/" className="text-primary underline">Retour</a>
    </div>
  )
}

export default page