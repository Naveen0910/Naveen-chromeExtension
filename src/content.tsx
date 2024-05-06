import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"

import Modal from "~components/ModalComponent"

import useAi from "./data/icons/Vector3.svg"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = (): HTMLStyleElement => {
  const style: HTMLStyleElement = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      console.log("useEffect triggered")
      const focusedDiv: HTMLElement | null = document.querySelector(
        ".msg-form__contenteditable"
      )
      console.log("Focused div:", focusedDiv)

      if (focusedDiv) {
        const img: HTMLImageElement = document.createElement("img")
        img.src = useAi

        img.style.position = "absolute"
        img.style.bottom = "10px"
        img.style.right = "10px"
        img.style.borderRadius = "50%"
        img.style.backgroundColor = "#FFFFFF"
        img.style.padding = "5px"

        img.addEventListener("click", () => {
          setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen)
        })

        img.id = "aiImage"

        focusedDiv.appendChild(img)
      } else {
        console.error(
          "Element with class 'msg-form__contenteditable' not found."
        )
      }
    }, 2000)
  }, [])

  const closeModal = (): void => {
    setIsModalOpen(false)
  }

  return (
    <>
      {isModalOpen && (
        <div
          className="z-50 bg-white"
          style={{
            width: "452px",
            height: "100px",
            marginTop: "320px",
            marginLeft: "500px"
          }}>
          <Modal onClose={closeModal} isModalOpen={isModalOpen} />
        </div>
      )}
    </>
  )
}

export default PlasmoOverlay
