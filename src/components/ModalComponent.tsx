import React, { useEffect, useRef, useState } from "react"

import vector from "../data/icons/vector.png"
import regen from "../data/icons/Vector2.png"
import insert from "../data/icons/Vector4.svg"

type ModalCloseFunction = () => void

interface ModalProps {
  onClose: ModalCloseFunction
  isModalOpen: boolean
}

const Modal: React.FC<ModalProps> = ({ onClose, isModalOpen }) => {
  const [prompt, setPrompt] = useState<string>("")
  const [prompNdResponseList, setPromptNdResponseList] = useState<
    { prompt: string; res: string }[]
  >([])
  const [randomString, setRandomString] = useState<string>("")

  function selectDadJoke(): string {
    const dadJokes: string[] = [
      "Why don't skeletons fight each other? They don't have the guts.",
      "Did you hear about the restaurant on the moon? Great food, no atmosphere.",
      "I'm reading a book on anti-gravity. It's impossible to put down!",
      "Want to hear a joke about construction? I'm still working on it.",
      "Why did the scarecrow win an award? Because he was outstanding in his field!"
    ]
    const randomIndex = Math.floor(Math.random() * dadJokes.length)
    return dadJokes[randomIndex]
  }

  const onClickGenerate = (): void => {
    console.log("clickedinsife")
    if (prompt.length > 0) {
      const res = selectDadJoke()
      setPromptNdResponseList((prevState) => [...prevState, { prompt, res }])
      setPrompt("")
    } else {
    }
  }

  const onClickInsert = (): void => {
    const container = document.querySelector(".msg-form__contenteditable")
    const sendButton = document.querySelector(".msg-form__send-button")

    if (container) {
      const placeholder = document.querySelector(".msg-form__placeholder")
      const pTag = container.querySelector("p")

      if (pTag) {
        pTag.textContent = prompNdResponseList[0].res
        placeholder?.classList.remove("msg-form__placeholder")
        sendButton?.removeAttribute("disabled")
        onClose()
      }
    }
  }

  return (
    <div
      className="ai-modal flex flex-col p-7 gap-7 border border-b-gray-200 shadow-xl rounded-lg"
      style={{ backgroundColor: "#F9FAFB" }}>
      <div>
        {prompNdResponseList.length > 0 &&
          prompNdResponseList.map((item) => (
            <React.Fragment key={item.prompt}>
              <div className="flex justify-end">
                <p className=" w-3/4 text-start text-gray-500 bg-gray-100 text-2xl mb-2 pr-2 pl-4 p-2 rounded-xl ">
                  {item.prompt}
                </p>
              </div>
              <div className="flex justify-start">
                <p
                  className=" text-start text-gray-500 text-2xl mb-2 w-3/4 pl-4 p-2  rounded-xl"
                  style={{ backgroundColor: "#DBEAFE" }}>
                  {item.res}
                </p>
              </div>
            </React.Fragment>
          ))}
      </div>
      <input
        className="border border-gray-400 h-16 rounded-lg pl-4 text-xl"
        placeholder="Your prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="flex justify-end w-full">
        {prompNdResponseList.length > 0 ? (
          <div className="flex flex-row gap-2">
            <button
              className="w-44 border border-gray-500 text-gray-500 flex flex-row justify-center items-center p-2"
              onClick={onClickInsert}
              style={{
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: 600,
                textAlign: "end"
              }}>
              <img
                src={insert}
                className="mr-2 px-1"
                style={{ width: "18px", height: "16px" }}
                alt="insert"
                data-testid="insert-button"
              />
              Insert
            </button>
            <button
              className="bg-blue-500 w-44 flex flex-row justify-center items-center p-2"
              onClick={onClickGenerate}
              style={{
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: 600,
                color: "white",
                textAlign: "end"
              }}>
              <img
                src={regen}
                className="mr-2 px-1"
                style={{ width: "22px", height: "18px" }}
                alt="regen"
                data-testid="regenerate button"
              />
              Regenerate
            </button>
          </div>
        ) : (
          <button
            className="bg-blue-500 w-44 flex flex-row justify-center items-center p-2"
            onClick={onClickGenerate}
            style={{
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: 600,
              color: "white",
              textAlign: "end"
            }}>
            <img
              src={vector}
              className="mr-2 px-1"
              style={{ width: "22px", height: "18px" }}
              alt="vector"
              data-testid="Generate button"
            />
            Generate
          </button>
        )}
      </div>
    </div>
  )
}
export default Modal
