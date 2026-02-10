"use client"

import { useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryImage {
    src: string
    alt: string
    description: string
}

interface GalleryLightboxProps {
    images: GalleryImage[]
    currentIndex: number
    isOpen: boolean
    onClose: () => void
    onNavigate: (index: number) => void
}

export default function GalleryLightbox({
    images,
    currentIndex,
    isOpen,
    onClose,
    onNavigate,
}: GalleryLightboxProps) {
    const goToPrevious = useCallback(() => {
        onNavigate(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
    }, [currentIndex, images.length, onNavigate])

    const goToNext = useCallback(() => {
        onNavigate(currentIndex === images.length - 1 ? 0 : currentIndex + 1)
    }, [currentIndex, images.length, onNavigate])

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "Escape":
                    onClose()
                    break
                case "ArrowLeft":
                    goToPrevious()
                    break
                case "ArrowRight":
                    goToNext()
                    break
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        // Prevent body scroll when modal is open
        document.body.style.overflow = "hidden"

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
            document.body.style.overflow = ""
        }
    }, [isOpen, onClose, goToPrevious, goToNext])

    if (!isOpen) return null

    const currentImage = images[currentIndex]

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-[110] bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-full transition-colors"
                        aria-label="Zamknij galerię"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    {/* Image counter */}
                    <div className="absolute top-4 left-4 z-[110] bg-white/10 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium">
                        {currentIndex + 1} / {images.length}
                    </div>

                    {/* Previous button */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-2 sm:left-4 z-[110] bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-colors"
                        aria-label="Poprzednie zdjęcie"
                    >
                        <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
                    </button>

                    {/* Next button */}
                    <button
                        onClick={goToNext}
                        className="absolute right-2 sm:right-4 z-[110] bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-colors"
                        aria-label="Następne zdjęcie"
                    >
                        <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
                    </button>

                    {/* Image container */}
                    <motion.div
                        key={currentIndex}
                        className="relative z-[105] w-[90vw] h-[80vh] sm:w-[85vw] sm:h-[85vh] flex flex-col items-center justify-center"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src={currentImage.src}
                                alt={currentImage.alt}
                                fill
                                className="object-contain"
                                sizes="90vw"
                                priority
                            />
                        </div>

                        {/* Description */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6 rounded-b-xl">
                            <p className="text-white text-base sm:text-lg font-medium text-center">
                                {currentImage.description}
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
