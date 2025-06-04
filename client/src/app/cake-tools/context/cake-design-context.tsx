"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface DesignElement {
  id: string
  type: string
  src: string
  x: number
  y: number
  width: number
  height: number
  rotation: number
  scaleX: number
  scaleY: number
}

interface CanvasSize {
  width: number
  height: number
}

interface CakeDesignContextType {
  elements: DesignElement[]
  selectedElementId: string | null
  cakeBase: HTMLImageElement | null
  canvasSize: CanvasSize
  setSelectedElementId: (id: string | null) => void
  addElement: (element: DesignElement) => void
  removeElement: (id: string) => void
  updateElementPosition: (id: string, x: number, y: number) => void
  updateElementProperty: (id: string, property: keyof DesignElement, value: any) => void
  duplicateElement: (id: string) => void
  moveElementUp: (id: string) => void
  moveElementDown: (id: string) => void
  setCakeBase: (image: HTMLImageElement) => void
  setCanvasSize: (size: CanvasSize) => void
}

const CakeDesignContext = createContext<CakeDesignContextType | undefined>(undefined)

export function CakeDesignProvider({ children }: { children: ReactNode }) {
  const [elements, setElements] = useState<DesignElement[]>([])
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null)
  const [cakeBase, setCakeBase] = useState<HTMLImageElement | null>(null)
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: 400, height: 400 })

  const addElement = (element: DesignElement) => {
    setElements([...elements, element])
    setSelectedElementId(element.id)
  }

  const removeElement = (id: string) => {
    setElements(elements.filter((el) => el.id !== id))
    if (selectedElementId === id) {
      setSelectedElementId(null)
    }
  }

  const updateElementPosition = (id: string, x: number, y: number) => {
    setElements(elements.map((el) => (el.id === id ? { ...el, x, y } : el)))
  }

  const updateElementProperty = (id: string, property: keyof DesignElement, value: any) => {
    setElements(elements.map((el) => (el.id === id ? { ...el, [property]: value } : el)))
  }

  const duplicateElement = (id: string) => {
    const elementToDuplicate = elements.find((el) => el.id === id)
    if (elementToDuplicate) {
      const newElement = {
        ...elementToDuplicate,
        id: `${elementToDuplicate.type}-${Date.now()}`,
        x: elementToDuplicate.x + 20,
        y: elementToDuplicate.y + 20,
      }
      setElements([...elements, newElement])
      setSelectedElementId(newElement.id)
    }
  }

  const moveElementUp = (id: string) => {
    const index = elements.findIndex((el) => el.id === id)
    if (index < elements.length - 1) {
      const newElements = [...elements]
      const temp = newElements[index]
      newElements[index] = newElements[index + 1]
      newElements[index + 1] = temp
      setElements(newElements)
    }
  }

  const moveElementDown = (id: string) => {
    const index = elements.findIndex((el) => el.id === id)
    if (index > 0) {
      const newElements = [...elements]
      const temp = newElements[index]
      newElements[index] = newElements[index - 1]
      newElements[index - 1] = temp
      setElements(newElements)
    }
  }

  return (
    <CakeDesignContext.Provider
      value={{
        elements,
        selectedElementId,
        cakeBase,
        canvasSize,
        setSelectedElementId,
        addElement,
        removeElement,
        updateElementPosition,
        updateElementProperty,
        duplicateElement,
        moveElementUp,
        moveElementDown,
        setCakeBase,
        setCanvasSize,
      }}
    >
      {children}
    </CakeDesignContext.Provider>
  )
}

export function useCakeDesign() {
  const context = useContext(CakeDesignContext)
  if (context === undefined) {
    throw new Error("useCakeDesign must be used within a CakeDesignProvider")
  }
  return context
}
