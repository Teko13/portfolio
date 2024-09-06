"use client";
import React, { useState } from 'react'
import cvView from "../../(assets)/cv-view.png"
import cvLightView from "../../(assets)/cv-light-view.png"
function page() {
    const cvcolorPdfPath = "/CV_TEKO_FOLLY_BLUE.pdf";
    const cvLightPdfPath = "/CV_TEKO_FOLLY_LIGHT.pdf"
    const [cvDarkTheme, setCvTheme] = useState(true);

  return (
    <div className="w-screen h-screen flex items-center gap-3 flex-col justify-center">
        <div className="lg:w-[25%] w-[90%]">
            <img src={cvDarkTheme && cvView.src || cvLightView.src} alt="Mon cv" />
        </div>
        <a href={cvDarkTheme && cvcolorPdfPath || cvLightPdfPath} download className="bg-primary rounded-md p-2 text-bg-variant font-black">
            TELECHARGER
        </a>
        <div className="flex items-center p-1 rounded-lg px-[3rem] bg-bg gap-10">
            <button onClick={() => {setCvTheme(true)}} className={`w-[5rem] flex flex-col justify-center items-center text-sm p-3 ${cvDarkTheme && "border-primary rounded-lg border-solid border-[2px]"}`}>
                <img src={cvView.src} alt="" />
                <span>Couleur</span>
            </button>
            <button onClick={() => {setCvTheme(false)}} className={`w-[5rem] justify-center flex flex-col items-center text-sm p-3 ${!cvDarkTheme && "border-primary border-solid rounded-lg border-[2px]"}`}>
                <img src={cvLightView.src} alt="" />
                <span>Sans Couleur</span>
            </button>
        </div>
        <a href="/" className="text-primary underline">Retour</a>
    </div>
  )
}

export default page