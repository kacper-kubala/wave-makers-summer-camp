"use client"

import type React from "react"

// Na początku pliku, zmień importy aby używać dynamicznie ładowanych komponentów
import { useEffect, useState, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { LazyMotion, motion } from "framer-motion"
import {
  Calendar,
  MapPin,
  Users,
  Award,
  Shield,
  Phone,
  Mail,
  Waves,
  Sun,
  FishIcon as Swim,
  Sailboat,
  Mountain,
  Compass,
  Facebook,
  Instagram,
  ChevronDown,
  ChevronRight,
  Shirt,
  Footprints,
  ShowerHeadIcon as Shower,
  Backpack,
  FileText,
  Camera,
  Menu,
  X,
  Building,
  TreePine,
  Moon,
  UserCheck,
  PlayCircle,
} from "lucide-react"

// Importuj dynamiczne komponenty
import {
  DynamicCountdownTimer as CountdownTimer,
  DynamicDailySchedule as DailySchedule,
  DynamicPackingCategory as PackingCategory,
  DynamicExcursionCard as ExcursionCard,
  DynamicRegistrationPath as RegistrationPath,
  DynamicActivityCard as ActivityCard,
} from "@/components/dynamic-imports"
import { useScroll, useTransform } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
// Importuj zoptymalizowane warianty animacji
import { fadeInUpVariants, staggerContainerVariants, loadOptimizedFeatures } from "@/lib/motion-config"

// Znajdź import useIsMobile
import { useIsMobile } from "@/hooks/use-mobile"
import InstructorCard from "@/components/instructor-card"
import GalleryLightbox from "@/components/gallery-lightbox"

// Zastąp motion.div LazyMotion w głównym komponencie
export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const activitiesRef = useRef<HTMLElement>(null)
  const pricingRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)
  const missionRef = useRef<HTMLElement>(null)
  const accommodationRef = useRef<HTMLElement>(null)
  const instructorsRef = useRef<HTMLElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // Dodaj nowy ref dla sekcji rejestracji
  const registrationPathRef = useRef<HTMLElement>(null)

  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  })

  const { scrollYProgress: activitiesScrollProgress } = useScroll({
    target: activitiesRef,
    offset: ["start end", "end start"],
  })

  const aboutImageY = useTransform(aboutScrollProgress, [0, 1], [50, -50])
  const activitiesY = useTransform(activitiesScrollProgress, [0, 1], [100, 0])

  // Zoptymalizowana funkcja scrollowania
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY)
  }, [])

  // Wykrywanie i obsługa stanu scrollowania
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout
    let isCurrentlyScrolling = false

    const onScroll = () => {
      // Update scrollY position
      setScrollY(window.scrollY)

      // Only set scrolling state if not already scrolling
      if (!isCurrentlyScrolling) {
        isCurrentlyScrolling = true
        setIsScrolling(true)
        document.body.classList.add("is-scrolling")
      }

      // Clear existing timeout
      clearTimeout(scrollTimeout)

      // Set timeout to detect when scrolling stops
      scrollTimeout = setTimeout(() => {
        isCurrentlyScrolling = false
        setIsScrolling(false)
        document.body.classList.remove("is-scrolling")
      }, 200) // Increased timeout for smoother transitions
    }

    // Use passive: true for better performance
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  // Konfiguracja IntersectionObserver dla animowanych elementów
  useEffect(() => {
    const animatedElements = document.querySelectorAll(".animate-on-scroll")

    if (animatedElements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-triggered")
            // Once triggered, stop observing this element
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: "0px",
      },
    )

    animatedElements.forEach((el) => observer.observe(el))

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  // Update the activities array to focus more on general sports and recreation
  const activities = [
    {
      title: "Zajęcia sportowe",
      icon: <Users className="h-10 w-10 text-blue-500" aria-hidden="true" />,
      description: "Gry zespołowe i treningi ogólnorozwojowe dostosowane do wieku uczestników",
      color: "bg-blue-500",
    },
    {
      title: "Zabawy wodne",
      icon: <Waves className="h-10 w-10 text-cyan-500" aria-hidden="true" />,
      description: "Kajaki, rowerki wodne, pływanie na deskach SUP",
      color: "bg-cyan-500",
    },
    {
      title: "Atrakcje rekreacyjne",
      icon: <Sun className="h-10 w-10 text-yellow-500" aria-hidden="true" />,
      description: "Ognisko, podchody, dyskoteki, zabawy integracyjne",
      color: "bg-yellow-500",
    },
    {
      title: "Wycieczki",
      icon: <Mountain className="h-10 w-10 text-purple-500" aria-hidden="true" />,
      description: "Muzeum we Wdzydzach, wieża widokowa, park linowy",
      color: "bg-purple-500",
    },
    {
      title: "Pływanie w jeziorze",
      icon: <Swim className="h-10 w-10 text-green-500" aria-hidden="true" />,
      description: "Korzystanie z uroków jeziora pod okiem doświadczonych instruktorów",
      color: "bg-green-500",
    },
    {
      title: "Bezpieczeństwo",
      icon: <Shield className="h-10 w-10 text-orange-500" aria-hidden="true" />,
      description: "Doświadczona kadra wychowawców i trenerów, która czuwa nad uczestnikami przez całą dobę",
      color: "bg-orange-500",
    },
  ]

  // Update the excursions array to remove boat cruise and survival adventure, add night stalking game
  const excursions = [
    {
      title: "Muzeum we Wdzydzach",
      icon: <Building className="h-10 w-10 text-amber-600" aria-hidden="true" />,
      description: "Zwiedzanie skansenu z tradycyjną architekturą kaszubską i poznawanie lokalnej kultury",
      color: "bg-amber-600",
      image: "/images/excursions/muzeum-wdzydze.png",
    },
    {
      title: "Wieża widokowa",
      icon: <Mountain className="h-10 w-10 text-emerald-600" aria-hidden="true" />,
      description: "Podziwianie panoramy Kaszub z wysokości, doskonałe miejsce na pamiątkowe zdjęcia",
      color: "bg-emerald-600",
      image: "/images/excursions/wieza-widokowa.png",
    },
    {
      title: "Park linowy",
      icon: <TreePine className="h-10 w-10 text-green-700" aria-hidden="true" />,
      description: "Przygoda wśród drzew, pokonywanie przeszkód na różnych poziomach trudności",
      color: "bg-green-700",
      image: "/images/excursions/park-linowy.png",
    },
    {
      title: "Nocne podchody",
      icon: <Moon className="h-10 w-10 text-indigo-600" aria-hidden="true" />,
      description: "Ekscytująca zabawa w grupach, rozwijająca umiejętność współpracy i orientacji w terenie po zmroku",
      color: "bg-indigo-600",
      image: "/images/excursions/nocne-podchody.png",
    },
  ]

  // Dane trenerów
  const instructors = [
    {
      name: "Patryk Wachowiec",
      role: "Trener i kierownik obozu",
      phone: "602 323 099",
      image: "/images/instructors/patryk-wachowiec.jpg",
      bio: "Absolwent Akademii Wychowania Fizycznego w Warszawie, nauczyciel wychowania fizycznego i instruktor z wieloletnim doświadczeniem w pracy z dziećmi i młodzieżą. Posiada liczne kwalifikacje instruktorskie: pływania, windsurfingu, siłowni oraz trenera personalnego. Dodatkowo jest certyfikowanym ratownikiem wodnym, co zapewnia najwyższy poziom bezpieczeństwa podczas zajęć.",
      specializations: ["Windsurfing", "SUP", "Gry i zabawy zespołowe", "Ratownictwo wodne", "Trening personalny"],
    },
    {
      name: "Marcin Wasilczyk",
      role: "Trener z pasją, instruktor pływania i koordynator zespołu ratowników",
      phone: "",
      image: "/images/instructors/marcin-wasilczyk.jpg",
      bio: 'Związany ze sportem od najmłodszych lat. Marcin od 11 lat z zaangażowaniem prowadzi zajęcia jako instruktor pływania. Już w wieku 16 lat został ratownikiem wodnym, a od 5 lat pełni funkcję koordynatora zespołu ratowników i instruktorów na pływalni na warszawskim Mokotowie. Ukończył Akademię Wychowania Fizycznego w Warszawie na kierunku wychowanie fizyczne. Jego motto: „Wymagaj od siebie, żeby pokazać innym, że mogą osiągnąć wszystko."',
      specializations: [
        "Instruktor pływania",
        "Ratownik wodny",
        "Koordynator zespołu ratowników",
        "Sporty wodne",
        "Gry zespołowe",
      ],
    },
  ]

  const packingCategories = [
    {
      id: "clothing",
      title: "Ubrania",
      icon: <Shirt className="h-6 w-6" aria-hidden="true" />,
      items: [
        "Koszulki (min. 10 sztuk)",
        "Krótkie spodenki (min. 5 par)",
        "Długie spodnie (2-3 pary)",
        "Bluza/sweter (2-3 sztuki)",
        "Kurtka przeciwdeszczowa",
        "Strój kąpielowy (min. 2 sztuki)",
        "Bielizna (na każdy dzień + zapas)",
        "Skarpetki (na każdy dzień + zapas)",
        "Piżama",
        "Czapka z daszkiem/kapelusz",
      ],
    },
    {
      id: "footwear",
      title: "Obuwie",
      icon: <Footprints className="h-6 w-6" aria-hidden="true" />,
      items: ["Buty sportowe", "Sandały/klapki", "Buty do wody"],
    },
    {
      id: "toiletries",
      title: "Kosmetyki i higiena",
      icon: <Shower className="h-6 w-6" aria-hidden="true" />,
      items: [
        "Szczoteczka i pasta do zębów",
        "Szampon i żel pod prysznic",
        "Ręczniki (min. 2 sztuki)",
        "Krem z filtrem UV",
        "Środek na owady",
        "Grzebień/szczotka do włosów",
      ],
    },
    {
      id: "accessories",
      title: "Akcesoria",
      icon: <Backpack className="h-6 w-6" aria-hidden="true" />,
      items: [
        "Okulary przeciwsłoneczne",
        "Bidon/butelka na wodę",
        "Mały plecak na wycieczki",
        "Latarka",
        "Worek na brudne ubrania",
      ],
    },
    {
      id: "documents",
      title: "Dokumenty",
      icon: <FileText className="h-6 w-6" aria-hidden="true" />,
      items: ["Karta zdrowia uczestnika", "Informacja o ubezpieczeniu", "Lista leków (jeśli dziecko przyjmuje)"],
    },
    {
      id: "optional",
      title: "Opcjonalnie",
      icon: <Camera className="h-6 w-6" aria-hidden="true" />,
      items: ["Aparat fotograficzny", "Książka/gra planszowa", "Kieszonkowe (max. 200 zł)"],
    },
  ]

  const faqItems = [
    {
      question: "W jakim wieku dzieci mogą uczestniczyć w obozie?",
      answer:
        "Nasz obóz jest przeznaczony dla dzieci w wieku od 8 do 16 lat. Grupy są tworzone z uwzględnieniem wieku uczestników, dzięki czemu program zajęć jest dostosowany do możliwości i potrzeb dzieci.",
    },
    {
      question: "Czy moje dziecko musi umieć pływać?",
      answer:
        "Nie jest wymagana umiejętność pływania, ale podstawowa znajomość pływania jest zalecana. Dla dzieci nieumiejących pływać organizujemy dodatkowe zajęcia nauki pływania pod okiem wykwalifikowanych instruktorów. Wszystkie zajęcia wodne odbywają się pod ścisłym nadzorem i z wykorzystaniem sprzętu asekuracyjnego.",
    },
    {
      question: "Jak wygląda opieka medyczna na obozie?",
      answer:
        "Na terenie ośrodka dostępna jest całodobowa opieka medyczna. Dodatkowo, wszyscy wychowawcy posiadają przeszkolenie z zakresu pierwszej pomocy. W przypadku jakichkolwiek problemów zdrowotnych, rodzice są natychmiast informowani.",
    },
    {
      question: "Czy dzieci mogą zabrać telefony komórkowe?",
      answer:
        "Tak, dzieci mogą zabrać telefony, jednak korzystanie z nich jest ograniczone do wyznaczonych godzin (zwykle po obiedzie), aby nie zakłócać programu zajęć i integracji z rówieśnikami. Telefony są przechowywane przez wychowawców i wydawane w czasie wolnym.",
    },
    {
      question: "Jak wygląda zakwaterowanie?",
      answer:
        "Uczestnicy są zakwaterowani w komfortowych pokojach 2-4 osobowych z łazienkami. Pokoje są wyposażone w łóżka, szafy, stoliki i krzesła. Większość pokoi posiada balkony z widokiem na jezioro.",
    },
    {
      question: "Jakie posiłki są serwowane?",
      answer:
        "Zapewniamy pełne wyżywienie składające się z 3 posiłków głównych (śniadanie, obiad, kolacja) oraz podwieczorku. Posiłki są zdrowe, zbilansowane i dostosowane do potrzeb aktywnych dzieci. Uwzględniamy również specjalne diety (wegetariańska, bezglutenowa itp.) - należy zgłosić taką potrzebę przy zapisie.",
    },
    {
      question: "Co w przypadku złej pogody?",
      answer:
        "Mamy przygotowany alternatywny program zajęć na wypadek niepogody. Ośrodek dysponuje krytą salą sportową, świetlicą z grami planszowymi, stołem do ping-ponga oraz salami warsztatowymi, gdzie organizujemy zajęcia artystyczne, konkursy i zabawy integracyjne.",
    },
    {
      question: "Jak wygląda kontakt z dzieckiem podczas obozu?",
      answer:
        "Poza wyznaczonymi godzinami na rozmowy telefoniczne, codziennie publikujemy zdjęcia i relacje z życia obozowego na naszym profilu na Facebooku i Instagramie. Dodatkowo, udostępniamy codzienną foto i video relację rodzicom przez WhatsApp, dzięki czemu zawsze są na bieżąco z tym, co się u nas dzieje!",
    },
  ]

  const campStartDate = new Date("2026-07-12T00:00:00")

  // Dane galerii
  const galleryImages = [
    {
      src: "/images/zdjecia2025/20250710_114013.jpg",
      alt: "Uczestnicy obozu podczas porannych zajęć",
      description: "Poranne zajęcia pełne energii i uśmiechów!",
    },
    {
      src: "/images/zdjecia2025/20250710_114336.jpg",
      alt: "Aktywności sportowe na terenie ośrodka",
      description: "Aktywny wypoczynek w otoczeniu pięknej natury",
    },
    {
      src: "/images/zdjecia2025/20250710_171220.jpg",
      alt: "Popołudniowe atrakcje na obozie",
      description: "Popołudniowe przygody – każdy dzień przynosi nowe wyzwania!",
    },
    {
      src: "/images/zdjecia2025/20250711_122202.jpg",
      alt: "Zajęcia grupowe na obozie letnim",
      description: "Wspólna zabawa i integracja – przyjaźnie na całe życie",
    },
    {
      src: "/images/zdjecia2025/20250712_102555.jpg",
      alt: "Poranne zajęcia sportowe",
      description: "Trening pod okiem doświadczonych instruktorów",
    },
    {
      src: "/images/zdjecia2025/20250712_200432.jpg",
      alt: "Wieczorne atrakcje na obozie",
      description: "Wieczorna integracja – niezapomniane chwile przy zachodzie słońca",
    },
    {
      src: "/images/zdjecia2025/20250712_201213.jpg",
      alt: "Zabawa wieczorna uczestników obozu",
      description: "Wieczory pełne śmiechu i wspólnej zabawy",
    },
    {
      src: "/images/zdjecia2025/20250713_153328.jpg",
      alt: "Aktywności na świeżym powietrzu",
      description: "Przygody na łonie natury – sport i rekreacja w jednym",
    },
    {
      src: "/images/zdjecia2025/20250713_162531.jpg",
      alt: "Zajęcia popołudniowe na obozie",
      description: "Popołudniowe wyzwania sportowe na terenie ośrodka",
    },
    {
      src: "/images/zdjecia2025/20250713_165959.jpg",
      alt: "Uczestnicy podczas zajęć rekreacyjnych",
      description: "Radość i energia – tak wygląda każdy dzień na obozie!",
    },
    {
      src: "/images/zdjecia2025/20250713_170013.jpg",
      alt: "Grupowe zdjęcie uczestników obozu",
      description: "Nasza ekipa w komplecie – wspólnie tworzymy niezapomniane wakacje",
    },
    {
      src: "/images/zdjecia2025/20250714_105815.jpg",
      alt: "Poranne aktywności na obozie",
      description: "Każdy poranek zaczynamy od dawki pozytywnej energii!",
    },
    {
      src: "/images/zdjecia2025/20250714_172507.jpg",
      alt: "Popołudniowe zajęcia sportowe",
      description: "Sport i zabawa na najwyższym poziomie",
    },
    {
      src: "/images/zdjecia2025/20250714_192850.jpg",
      alt: "Wieczorne zajęcia integracyjne",
      description: "Wieczorna integracja przy ognisku i wspólnych grach",
    },
    {
      src: "/images/zdjecia2025/20250715_103212.jpg",
      alt: "Zajęcia wodne na obozie",
      description: "Wodne przygody – nasza ulubiona część dnia!",
    },
    {
      src: "/images/zdjecia2025/20250716_220720.jpg",
      alt: "Nocne atrakcje na obozie",
      description: "Wieczorne gry i zabawy pod gwiazdami",
    },
    {
      src: "/images/zdjecia2025/20250717_102831.jpg",
      alt: "Poranne treningi na obozie",
      description: "Treningi, które rozwijają umiejętności i budują pewność siebie",
    },
    {
      src: "/images/zdjecia2025/20250717_105848.jpg",
      alt: "Zajęcia sportowe na obozie",
      description: "Doskonalenie techniki pod czujnym okiem trenerów",
    },
    {
      src: "/images/zdjecia2025/20250717_114601.jpg",
      alt: "Aktywności rekreacyjne na obozie",
      description: "Chwila relaksu między treningami",
    },
    {
      src: "/images/zdjecia2025/20250717_190630.jpg",
      alt: "Wieczorne zajęcia na obozie",
      description: "Wieczorne przygody w otoczeniu kaszubskiej przyrody",
    },
    {
      src: "/images/zdjecia2025/20250718_101902.jpg",
      alt: "Ostatni dzień obozu",
      description: "Wspomnienia, które zostaną z nami na zawsze!",
    },
    {
      src: "/images/zdjecia2025/IMG-20250709-WA0002.jpg",
      alt: "Przyjazd uczestników na obóz",
      description: "Początek niezapomnianych wakacji – witamy na obozie!",
    },
    {
      src: "/images/zdjecia2025/IMG-20250715-WA0098.jpg",
      alt: "Uczestnicy podczas aktywności obozowych",
      description: "Tyle radości w jednym miejscu – to jest WaveMakers!",
    },
    {
      src: "/images/zdjecia2025/IMG-20250715-WA0156.jpg",
      alt: "Zabawa na obozie letnim",
      description: "Najlepsze wakacje? Tylko z WaveMakers Summer Camp!",
    },
  ]

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: "smooth",
      })
    }
  }

  // Tworzenie bardziej wydajnych wersji animacji dla sekcji
  const createSectionAnimation = (isVisible = true) => ({
    initial: { opacity: 0, y: 50 },
    animate: isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 },
    transition: {
      duration: 0.6,
      ease: "easeOut",
      type: "tween",
      willChange: "transform, opacity",
    },
    className: "hardware-accelerated",
  })

  // Funkcja do przewijania do sekcji rejestracji
  const openRegistrationModal = () => {
    scrollToSection(registrationPathRef)
  }

  // Dodaj hook useIsMobile w komponencie Home
  const isMobile = useIsMobile()

  // Zamiast standardowego motion.div użyj LazyMotion
  // Dodaj na początku komponentu:

  return (
    <LazyMotion features={loadOptimizedFeatures}>
      <div className="flex min-h-screen flex-col overflow-hidden">
        {/* Header z logo */}
        <header
          className="fixed top-0 left-0 w-full z-50 py-4 transition-all duration-300 hardware-accelerated"
          style={{
            backgroundColor: scrollY > 50 ? "rgba(255, 255, 255, 0.85)" : "transparent",
            backdropFilter: scrollY > 50 ? "blur(10px)" : "none",
            boxShadow: scrollY > 50 ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" : "none",
          }}
        >
          <div className="container px-4 md:px-6 flex justify-between items-center">
            {/* Menu desktopowe */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="relative h-12 w-48 cursor-pointer"
              aria-label="Przewiń do góry strony"
            >
              <Image
                src={scrollY > 50 ? "/images/logo-color.png" : "/images/logo-white.png"}
                alt="WaveMakers Logo"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 192px, 192px"
              />
            </button>

            {/* Menu desktopowe */}
            <nav className="hidden md:flex space-x-6" aria-label="Główna nawigacja">
              <button
                onClick={() => scrollToSection(missionRef)}
                className={`font-medium transition-colors ${scrollY > 50 ? "text-blue-700 hover:text-blue-900" : "text-white hover:text-blue-200"}`}
                aria-label="Przejdź do sekcji O nas"
              >
                O nas
              </button>
              <button
                onClick={() => scrollToSection(aboutRef)}
                className={`font-medium transition-colors ${scrollY > 50 ? "text-blue-700 hover:text-blue-900" : "text-white hover:text-blue-200"}`}
                aria-label="Przejdź do sekcji O obozie"
              >
                O obozie
              </button>
              <button
                onClick={() => scrollToSection(activitiesRef)}
                className={`font-medium transition-colors ${scrollY > 50 ? "text-blue-700 hover:text-blue-900" : "text-white hover:text-blue-200"}`}
                aria-label="Przejdź do sekcji Atrakcje"
              >
                Atrakcje
              </button>
              <button
                onClick={() => scrollToSection(instructorsRef)}
                className={`font-medium transition-colors ${scrollY > 50 ? "text-blue-700 hover:text-blue-900" : "text-white hover:text-blue-200"}`}
                aria-label="Przejdź do sekcji Trenerzy"
              >
                Trenerzy
              </button>
              <button
                onClick={() => scrollToSection(accommodationRef)}
                className={`font-medium transition-colors ${scrollY > 50 ? "text-blue-700 hover:text-blue-900" : "text-white hover:text-blue-200"}`}
                aria-label="Przejdź do sekcji Zakwaterowanie"
              >
                Zakwaterowanie
              </button>
              <button
                onClick={() => scrollToSection(pricingRef)}
                className={`font-medium transition-colors ${scrollY > 50 ? "text-blue-700 hover:text-blue-900" : "text-white hover:text-blue-200"}`}
                aria-label="Przejdź do sekcji Zapisy"
              >
                Zapisy
              </button>
              <button
                onClick={() => scrollToSection(contactRef)}
                className={`font-medium transition-colors ${scrollY > 50 ? "text-blue-700 hover:text-blue-900" : "text-white hover:text-blue-200"}`}
                aria-label="Przejdź do sekcji Kontakt"
              >
                Kontakt
              </button>
            </nav>

            {/* Przycisk menu mobilnego */}
            <button
              className="md:hidden p-2 rounded-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className={`h-6 w-6 ${scrollY > 50 ? "text-blue-700" : "text-white"}`} aria-hidden="true" />
              ) : (
                <Menu className={`h-6 w-6 ${scrollY > 50 ? "text-blue-700" : "text-white"}`} aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Menu mobilne */}
          {mobileMenuOpen && (
            <nav
              id="mobile-menu"
              className="md:hidden absolute top-full left-0 w-full z-50 bg-white shadow-lg py-4 px-6 animate-in slide-in-from-top-5"
              aria-label="Menu mobilne"
            >
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => {
                    scrollToSection(missionRef)
                    setMobileMenuOpen(false)
                  }}
                  className="font-medium text-blue-700 hover:text-blue-900 py-2 border-b border-gray-100"
                  aria-label="Przejdź do sekcji O nas"
                >
                  O nas
                </button>
                <button
                  onClick={() => {
                    scrollToSection(aboutRef)
                    setMobileMenuOpen(false)
                  }}
                  className="font-medium text-blue-700 hover:text-blue-900 py-2 border-b border-gray-100"
                  aria-label="Przejdź do sekcji O obozie"
                >
                  O obozie
                </button>
                <button
                  onClick={() => {
                    scrollToSection(activitiesRef)
                    setMobileMenuOpen(false)
                  }}
                  className="font-medium text-blue-700 hover:text-blue-900 py-2 border-b border-gray-100"
                  aria-label="Przejdź do sekcji Atrakcje"
                >
                  Atrakcje
                </button>
                <button
                  onClick={() => {
                    scrollToSection(instructorsRef)
                    setMobileMenuOpen(false)
                  }}
                  className="font-medium text-blue-700 hover:text-blue-900 py-2 border-b border-gray-100"
                  aria-label="Przejdź do sekcji Trenerzy"
                >
                  Trenerzy
                </button>
                <button
                  onClick={() => {
                    scrollToSection(accommodationRef)
                    setMobileMenuOpen(false)
                  }}
                  className="font-medium text-blue-700 hover:text-blue-900 py-2 border-b border-gray-100"
                  aria-label="Przejdź do sekcji Zakwaterowanie"
                >
                  Zakwaterowanie
                </button>
                <button
                  onClick={() => {
                    scrollToSection(pricingRef)
                    setMobileMenuOpen(false)
                  }}
                  className="font-medium text-blue-700 hover:text-blue-900 py-2 border-b border-gray-100"
                  aria-label="Przejdź do sekcji Zapisy"
                >
                  Zapisy
                </button>
                <button
                  onClick={() => {
                    scrollToSection(contactRef)
                    setMobileMenuOpen(false)
                  }}
                  className="font-medium text-blue-700 hover:text-blue-900 py-2"
                  aria-label="Przejdź do sekcji Kontakt"
                >
                  Kontakt
                </button>
              </div>
            </nav>
          )}
        </header>
        {/* Hero Section with Animated Background */}
        <section
          ref={heroRef}
          className="relative h-screen flex items-center justify-center overflow-hidden"
          aria-labelledby="hero-heading"
        >
          <div
            className="absolute inset-0 bg-gradient-to-b from-blue-600/30 to-blue-900/70 z-10 hardware-accelerated"
            style={{
              opacity: Math.min(0.7 + scrollY / 1000, 0.9),
            }}
          />

          <div className="relative h-full w-full">
            <Image
              src="/images/hero-background.jpg"
              alt="WaveMakers Summer Camp - tło"
              fill
              className="object-cover"
              priority
              sizes="100vw"
              style={{
                transform: `scale(${1 + scrollY / 5000}) translateY(${scrollY / 20}px)`,
                opacity: 0.9,
                willChange: "transform",
              }}
            />
          </div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="container px-4 md:px-6 text-center">
              <div className="space-y-4 text-white">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="inline-block bg-blue-600/80 backdrop-blur-sm px-4 py-1 rounded-full mb-4"
                >
                  <span className="text-white font-medium">Lato 2026</span>
                </motion.div>

                <motion.h1
                  id="hero-heading"
                  className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-lg hardware-accelerated"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
                >
                  WaveMakers Summer Camp
                </motion.h1>

                <motion.p
                  className="text-xl md:text-2xl font-semibold text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
                >
                  WAKACYJNA PRZYGODA PEŁNA RUCHU!
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Button
                    size="lg"
                    className="bg-white text-blue-700 hover:bg-blue-50 md:hover:scale-105 transition-transform"
                    onClick={openRegistrationModal}
                    aria-label="Zapisz dziecko na obóz"
                  >
                    Zapisz dziecko
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-white border-white hover:bg-white/10 md:hover:scale-105 transition-transform bg-blue-600/30 backdrop-blur-sm"
                    onClick={() => scrollToSection(aboutRef)}
                    aria-label="Dowiedz się więcej o obozie"
                  >
                    Dowiedz się więcej
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="mt-12"
                >
                  <div className="bg-blue-900/50 backdrop-blur-sm p-4 rounded-xl inline-block">
                    <p className="text-white font-semibold mb-3">Do rozpoczęcia obozu pozostało:</p>
                    <CountdownTimer targetDate={campStartDate} />
                  </div>

                  <div className="flex justify-center gap-4 mt-6">
                    <Link
                      href="https://www.facebook.com/profile.php?id=61574466772352"
                      target="_blank"
                      className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors"
                      aria-label="Facebook WaveMakers"
                      rel="noopener noreferrer"
                    >
                      <Facebook className="h-6 w-6 text-white" aria-hidden="true" />
                    </Link>
                    <Link
                      href="https://www.instagram.com/wave_makers_academy/"
                      target="_blank"
                      className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors"
                      aria-label="Instagram WaveMakers"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="h-6 w-6 text-white" aria-hidden="true" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <button
              className="animate-bounce cursor-pointer"
              onClick={() => scrollToSection(aboutRef)}
              aria-label="Przewiń w dół do sekcji O obozie"
            >
              <ChevronDown className="h-10 w-10 text-white" aria-hidden="true" />
            </button>
          </motion.div>
        </section>
        {/* Mission Section - NOWA SEKCJA */}
        <section ref={missionRef} className="py-16 bg-white overflow-hidden">
          <div className="container px-4 md:px-6">
            <motion.div
              className="text-center mb-12 animate-on-scroll"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUpVariants}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full mb-4">
                <Compass className="h-4 w-4" aria-hidden="true" />
                <span className="text-sm font-medium">O nas</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-800">
                WaveMakers Sports Academy
              </h2>
            </motion.div>

            <motion.div
              className="grid gap-8 md:grid-cols-2 lg:gap-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainerVariants}
            >
              <motion.div className="space-y-4 animate-on-scroll" variants={fadeInUpVariants}>
                <p className="text-gray-700">
                  WaveMakers Sports Academy to miejsce, które pozwoli na doskonałą zabawę w połączeniu z rozwojem
                  cennych życiowych umiejętności. Naszym głównym celem jest stworzenie bezpiecznej przestrzeni dla
                  dzieci oraz zachęcenie ich do rozwoju sprawności fizycznej, zdrowej rywalizacji i integracji w grupie.
                </p>
                <p className="text-gray-700">
                  Jednym z naszych najważniejszych projektów jest obóz sportowo-rekreacyjny dla dzieci, który skupia się
                  na aktywnym wypoczynku. To 10 dni, w trakcie których pod okiem wykwalifikowanej kadry trenerów i
                  wychowawców uczestnicy obozu biorą udział w zabawach wodnych, zajęciach sportowych na świeżym
                  powietrzu oraz zabawach integracyjnych.
                </p>
                <p className="text-gray-700">
                  Dołącz do nas i przeżyj wakacje pełne przygód i niezapomnianych wspomnień!
                </p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg overflow-hidden border border-blue-200"
                whileHover={{
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  y: -5,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="bg-blue-600 text-white p-4">
                  <h3 className="text-xl font-bold">WaveMakers Summer Camp 2026</h3>
                  <p className="text-sm text-blue-100">Wakacyjna przygoda pełna ruchu!</p>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                      <div className="bg-blue-500 p-3 rounded-full">
                        <Calendar className="h-8 w-8 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-800">Termin</h4>
                        <p className="text-gray-700 font-medium">12-22 lipca 2026r.</p>
                        <p className="text-xs text-gray-500 mt-1">10 dni niezapomnianych przygód</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                      <div className="bg-blue-500 p-3 rounded-full">
                        <MapPin className="h-8 w-8 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-800">Miejsce</h4>
                        <p className="text-gray-700 font-medium">Gołuń, Hotel Gołuń</p>
                        <p className="text-xs text-gray-500 mt-1">Malownicze Kaszuby nad jeziorem</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                      <div className="bg-blue-500 p-3 rounded-full">
                        <Users className="h-8 w-8 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-800">Wiek uczestników</h4>
                        <p className="text-gray-700 font-medium">8-16 lat</p>
                        <p className="text-xs text-gray-500 mt-1">Grupy dostosowane do wieku</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-5 w-5 text-blue-600" aria-hidden="true" />
                      <p className="text-blue-800 font-semibold">Cena: 3200 zł</p>
                    </div>
                    <p className="text-xs text-gray-600 mb-3 ml-7">
                      W cenie: zakwaterowanie, wyżywienie, opieka, wszystkie atrakcje
                    </p>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={openRegistrationModal}>
                      Zapisz swoje dziecko już teraz
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        {/* Main Info Section with Parallax */}
        <section ref={aboutRef} className="py-16 bg-blue-50 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-20 bg-white"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)" }}
          ></div>

          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainerVariants}
            >
              <motion.div className="space-y-4 animate-on-scroll" variants={fadeInUpVariants}>
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <span className="text-sm font-medium">12-22 lipca 2026</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-800">O naszym obozie</h2>
                <p className="text-gray-700">
                  Zapraszamy na niezapomniany obóz sportowo-rekreacyjny w malowniczym sercu Kaszub! Jeśli Twoje dziecko
                  kocha ruch, wodne przygody i dobrą zabawę, ten obóz jest dla niego idealnym wyborem! Nasz program
                  łączy treningi sportowe z aktywnym wypoczynkiem w otoczeniu pięknej natury, a wszystko odbywa się w
                  atmosferze pełnej radości i przyjaźni. To idealna okazja, by rozwinąć sportowe umiejętności, nawiązać
                  nowe znajomości i spędzić wakacje w ruchu.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <div className="flex items-center gap-2 text-blue-700 bg-blue-50 px-3 py-2 rounded-lg">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                    <span className="font-medium">Gołuń, Hotel Gołuń</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-700 bg-blue-50 px-3 py-2 rounded-lg">
                    <Users className="h-5 w-5" aria-hidden="true" />
                    <span className="font-medium">Wiek: 8-16 lat</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative h-[300px] sm:h-[400px] rounded-xl overflow-hidden shadow-xl hardware-accelerated"
                variants={fadeInUpVariants}
                animate={{ y: 0 }}
                initial={{ y: 50 }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src="/images/about-camp.png"
                  alt="Dzieci podczas zajęć pływackich przy plaży ośrodka"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <p className="font-bold text-lg">Niezapomniane przygody</p>
                    <p>Aktywny wypoczynek w otoczeniu pięknej natury</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div
            className="absolute bottom-0 left-0 w-full h-20 bg-white"
            style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0 100%)" }}
          ></div>
        </section>
        {/* Activities Section with Interactive Cards and Parallax */}
        <section ref={activitiesRef} className="py-16 bg-white relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="text-center mb-12 animate-on-scroll"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUpVariants}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full mb-4">
                <Compass className="h-4 w-4" aria-hidden="true" />
                <span className="text-sm font-medium">Atrakcje</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-800">
                Co czeka na uczestników?
              </h2>
              <p className="text-gray-700 mt-2 max-w-2xl mx-auto">
                Nasz program łączy treningi sportowe z aktywnym wypoczynkiem w otoczeniu pięknej natury. Każdy dzień
                przynosi nowe wyzwania i przygody!
              </p>
            </motion.div>

            <motion.div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainerVariants}
            >
              {activities.map((activity, index) => (
                <motion.div key={index} variants={fadeInUpVariants} className="animate-on-scroll">
                  <ActivityCard
                    title={activity.title}
                    icon={activity.icon}
                    description={activity.description}
                    color={activity.color}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Wycieczki - NOWA SEKCJA */}
            <motion.div
              className="mt-16 bg-blue-50 py-12 rounded-xl animate-on-scroll"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUpVariants}
            >
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full mb-4">
                  <Mountain className="h-4 w-4" aria-hidden="true" />
                  <span className="text-sm font-medium">Odkrywaj</span>
                </div>
                <h3 className="text-3xl font-bold text-blue-800 mb-2">Wycieczki i przygody</h3>
                <p className="text-gray-700 max-w-2xl mx-auto">
                  Podczas obozu organizujemy wiele ekscytujących wycieczek, które pozwalają poznać piękno Kaszub i
                  przeżyć niezapomniane przygody!
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 px-4 md:px-6">
                {excursions.map((excursion, index) => (
                  <motion.div key={index} variants={fadeInUpVariants} className="animate-on-scroll">
                    <ExcursionCard
                      title={excursion.title}
                      icon={excursion.icon}
                      description={excursion.description}
                      color={excursion.color}
                      image={excursion.image}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        {/* Instructors Section - NOWA SEKCJA */}
        <section ref={instructorsRef} className="py-16 bg-blue-50 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-20 bg-white"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)" }}
          ></div>

          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="text-center mb-12 animate-on-scroll"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUpVariants}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full mb-4">
                <UserCheck className="h-4 w-4" aria-hidden="true" />
                <span className="text-sm font-medium">Kadra</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-800">Poznaj naszych trenerów</h2>
              <p className="text-gray-700 mt-2 max-w-2xl mx-auto">
                Nasz zespół to doświadczeni trenerzy i wychowawcy, którzy z pasją dzielą się swoją wiedzą i
                umiejętnościami. Każdy z nich ma bogate doświadczenie w pracy z dziećmi i młodzieżą.
              </p>
            </motion.div>

            <motion.div
              className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainerVariants}
            >
              {instructors.map((instructor, index) => (
                <motion.div key={index} variants={fadeInUpVariants} className="animate-on-scroll">
                  <InstructorCard instructor={instructor} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-12 text-center animate-on-scroll"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUpVariants}
            >
              <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Shield className="h-8 w-8 text-blue-700" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-800">Bezpieczeństwo i doświadczenie</h3>
                </div>
                <p className="text-gray-700">
                  Nasi trenerzy to pasjonaci sportu z wieloletnim doświadczeniem w pracy z dziećmi i młodzieżą.
                  Posiadają odpowiednie kwalifikacje, certyfikaty oraz uprawnienia ratownicze, co zapewnia najwyższy
                  poziom bezpieczeństwa podczas wszystkich zajęć.
                </p>
              </div>
            </motion.div>
          </div>

          <div
            className="absolute bottom-0 left-0 w-full h-20 bg-white"
            style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0 100%)" }}
          ></div>
        </section>
        {/* Accommodation Section - NOWA SEKCJA */}
        <section ref={accommodationRef} className="py-16 md:py-24 bg-white relative overflow-hidden">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10">
            <motion.div
              className="text-center mb-12 md:mb-16 animate-on-scroll"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUpVariants}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full mb-4">
                <Building className="h-4 w-4" aria-hidden="true" />
                <span className="text-sm font-medium">Zakwaterowanie</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-800">Hotel Gołuń</h2>
              <p className="text-gray-700 mt-2 max-w-2xl mx-auto">
                Komfortowy ośrodek wypoczynkowy z pełnym zapleczem sportowym, idealny do aktywnego wypoczynku.
              </p>
            </motion.div>

            <motion.div
              className="grid gap-8 md:grid-cols-2 lg:gap-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainerVariants}
            >
              <motion.div variants={fadeInUpVariants} className="animate-on-scroll">
                <div className="relative h-[300px] sm:h-[400px] rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/hotel-golun.jpg"
                    alt="Hotel Gołuń - widok z lotu ptaka"
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-4 sm:p-6 text-white">
                      <p className="font-bold text-lg sm:text-xl">Hotel Gołuń</p>
                      <p className="text-sm sm:text-base">
                        Malowniczo położony nad jeziorem, z własną plażą i pomostem
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div className="space-y-8 animate-on-scroll" variants={fadeInUpVariants}>
                <div>
                  <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center">
                    <Building className="h-5 w-5 text-blue-700 mr-2 flex-shrink-0" aria-hidden="true" />
                    Wyjątkowe miejsce
                  </h3>
                  <p className="text-gray-700 pl-0 md:pl-7">
                    Hotel Gołuń to wyjątkowe miejsce, stworzone do aktywnego wypoczynku. Na ogrodzonym, monitorowanym
                    terenie, do którego wstęp mają tylko goście hotelu znajduje się prywatna plaża, boiska do siatkówki,
                    koszykówki, piłki nożnej, a także kort tenisowy oraz przystań wodna z rowerami wodnymi i kajakami,
                    które nie pozwolą nam na nudę.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center">
                    <Sailboat className="h-5 w-5 text-blue-700 mr-2 flex-shrink-0" aria-hidden="true" />
                    Komfortowe pokoje
                  </h3>
                  <p className="text-gray-700 pl-0 md:pl-7">
                    Pokoje wyposażone są w łazienki z prysznicami i telewizory z płaskim ekranem. Ze wszystkich rozciąga
                    się widok na jezioro, a większość posiada także balkon. Na terenie obiektu dostępne jest również
                    bezpłatne wi-fi.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center">
                    <Waves className="h-5 w-5 text-blue-700 mr-2 flex-shrink-0" aria-hidden="true" />
                    Wyżywienie
                  </h3>
                  <p className="text-gray-700 pl-0 md:pl-7">
                    Zapewniamy pełne wyżywienie składające się z 3 posiłków głównych (śniadanie, obiad, kolacja) oraz
                    podwieczorku. Posiłki są zdrowe, smaczne i dostosowane do potrzeb młodych sportowców, serwowane w
                    formie szwedzkiego stołu.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center">
                    <Shield className="h-5 w-5 text-blue-700 mr-2 flex-shrink-0" aria-hidden="true" />
                    Bezpieczeństwo
                  </h3>
                  <p className="text-gray-700 pl-0 md:pl-7">
                    Bezpieczeństwo uczestników jest naszym priorytetem. Teren ośrodka jest ogrodzony i monitorowany, a
                    doświadczona kadra wychowawców i trenerów czuwa nad uczestnikami przez całą dobę.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div
            className="absolute bottom-0 left-0 w-full h-20 bg-white"
            style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0 100%)" }}
          ></div>
        </section>
        <section className="py-16 bg-blue-50 relative overflow-hidden">
          <div className="container px-4 md:px-6">
            <motion.div
              className="text-center mb-12 animate-on-scroll"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full mb-4">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                <span className="text-sm font-medium">Plan dnia</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-800">
                Jak wygląda dzień na obozie?
              </h2>
              <p className="text-gray-700 mt-2 max-w-2xl mx-auto">
                Każdy dzień jest starannie zaplanowany, aby zapewnić odpowiednią równowagę między aktywnością,
                odpoczynkiem i zabawą.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
              className="animate-on-scroll"
            >
              <DailySchedule />
            </motion.div>
          </div>

          <div
            className="absolute bottom-0 left-0 w-full h-20 bg-white"
            style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0 100%)" }}
          ></div>
        </section>
        <section className="py-16 bg-white relative overflow-hidden">
          <div className="container px-4 md:px-6">
            <motion.div
              className="text-center mb-12 animate-on-scroll"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full mb-4">
                <Compass className="h-4 w-4" aria-hidden="true" />
                <span className="text-sm font-medium">Przygotowanie</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-800">Co zabrać na obóz?</h2>
              <p className="text-gray-700 mt-2 max-w-2xl mx-auto">
                Przygotowaliśmy listę najważniejszych rzeczy, które warto spakować na obóz. Odpowiednie przygotowanie
                zapewni komfort i bezpieczeństwo Twojemu dziecku podczas całego pobytu.
              </p>
            </motion.div>

            <motion.div
              className="max-w-5xl mx-auto animate-on-scroll"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
            >
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {packingCategories.map((category) => (
                  <PackingCategory
                    key={category.id}
                    title={category.title}
                    icon={category.icon}
                    items={category.items}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Video Section - Film z obozu */}
        <section className="py-16 bg-gradient-to-b from-blue-600 to-blue-800 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-20 bg-white"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)" }}
          ></div>

          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="text-center mb-8 animate-on-scroll"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full mb-4">
                <PlayCircle className="h-4 w-4" aria-hidden="true" />
                <span className="text-sm font-medium">Film</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">
                Zobacz nas w akcji!
              </h2>
              <p className="text-blue-100 mt-2 max-w-2xl mx-auto">
                Obejrzyj relację z poprzedniego obozu i przekonaj się, ile radości i przygód czeka na uczestników!
              </p>
            </motion.div>

            <motion.div
              className="max-w-4xl mx-auto animate-on-scroll"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl bg-black">
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/ykqZVkxTvtU?rel=0"
                    title="WaveMakers Summer Camp - relacja z obozu"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
              <p className="text-center text-blue-200 mt-4 text-sm">
                🎬 Relacja z obozu WaveMakers Summer Camp
              </p>
            </motion.div>
          </div>

          <div
            className="absolute bottom-0 left-0 w-full h-20 bg-blue-50"
            style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0 100%)" }}
          ></div>
        </section>

        <section className="py-16 bg-blue-50 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="text-center mb-12 animate-on-scroll"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full mb-4">
                <Camera className="h-4 w-4" aria-hidden="true" />
                <span className="text-sm font-medium">Galeria</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-800">
                Wspomnienia z poprzednich obozów
              </h2>
              <p className="text-gray-700 mt-2 max-w-2xl mx-auto">
                Zobacz, jak wyglądają nasze obozy i jakie atrakcje czekają na uczestników!
              </p>
            </motion.div>

            <motion.div
              className="max-w-5xl mx-auto animate-on-scroll"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
            >
              <Carousel className="w-full">
                <CarouselContent>
                  {galleryImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <div
                          className="relative aspect-[4/3] max-h-[70vh] rounded-xl overflow-hidden cursor-pointer group"
                          onClick={() => openLightbox(index)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
                          aria-label={`Otwórz zdjęcie: ${image.alt}`}
                        >
                          <Image
                            src={image.src || "/placeholder.svg"}
                            alt={image.alt}
                            fill
                            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                            <p className="p-4 text-white text-lg font-medium">{image.description}</p>
                          </div>
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-4">
                  <CarouselPrevious className="relative static mr-2 translate-y-0" aria-label="Poprzednie zdjęcia" />
                  <CarouselNext className="relative static ml-2 translate-y-0" aria-label="Następne zdjęcia" />
                </div>
              </Carousel>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-6">
                {galleryImages.slice(0, 8).map((image, index) => (
                  <div
                    key={`thumb-${index}`}
                    className="relative aspect-video rounded-md overflow-hidden cursor-pointer group"
                    onClick={() => openLightbox(index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
                    aria-label={`Otwórz zdjęcie: ${image.alt}`}
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={`Miniatura ${index + 1}`}
                      fill
                      className="object-cover object-top hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                    />
                  </div>
                ))}
              </div>

              {/* Foto i Video Relacja - NOWA SEKCJA */}
              <motion.div
                className="mt-12 bg-blue-50 p-6 rounded-xl animate-on-scroll"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUpVariants}
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <Camera className="h-12 w-12 text-blue-700" aria-hidden="true" />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-blue-800 mb-2">Codzienna foto i video relacja</h3>
                    <p className="text-gray-700">
                      Każdego dnia obozu robimy zdjęcia i filmy, które doskonale pokazują, jak świetnie bawimy się na
                      zajęciach i w czasie wolnym! Foto i video relację udostępniamy na:
                    </p>
                    <div className="mt-3 flex flex-col md:flex-row gap-4">
                      <a
                        href="https://www.facebook.com/profile.php?id=61574466772352"
                        target="_blank"
                        className="flex items-center gap-2 text-blue-700 hover:underline"
                        rel="noreferrer"
                        aria-label="Nasz profil na Facebooku"
                      >
                        <Facebook className="h-5 w-5" aria-hidden="true" /> Wavemakers
                      </a>
                      <a
                        href="https://www.instagram.com/wave_makers_academy/"
                        target="_blank"
                        className="flex items-center gap-2 text-blue-700 hover:underline"
                        rel="noreferrer"
                        aria-label="Nasz profil na Instagramie"
                      >
                        <Instagram className="h-5 w-5" aria-hidden="true" /> wave_makers_academy
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <GalleryLightbox
              images={galleryImages}
              currentIndex={lightboxIndex}
              isOpen={lightboxOpen}
              onClose={() => setLightboxOpen(false)}
              onNavigate={setLightboxIndex}
            />
          </div>

          <div
            className="absolute bottom-0 left-0 w-full h-20 bg-white"
            style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0 100%)" }}
          ></div>
        </section>
        <section className="pt-16 pb-24 bg-white relative overflow-hidden">
          <div className="container px-4 md:px-6">
            <motion.div
              className="text-center mb-12 animate-on-scroll"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full mb-4">
                <Award className="h-4 w-4" aria-hidden="true" />
                <span className="text-sm font-medium">Nasze atuty</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-800">
                Dlaczego warto wybrać właśnie ten obóz?
              </h2>
            </motion.div>

            <motion.div
              className="grid gap-8 md:grid-cols-2 lg:gap-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainerVariants}
            >
              <motion.div className="space-y-6 animate-on-scroll" variants={fadeInUpVariants}>
                <div className="flex gap-4 items-start group">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center shrink-0 mt-1 group-hover:scale-110 transition-transform">
                    <Sailboat className="h-6 w-6 text-blue-700" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Połączenie sportu i zabawy</h3>
                    <p className="text-gray-700">
                      Nie musisz wybierać między aktywnym wypoczynkiem a dobrą zabawą! Nasz obóz łączy aktywności
                      sportowe z atrakcjami rekreacyjnymi, dzięki czemu każdy dzień jest pełen emocji.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start group">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center shrink-0 mt-1 group-hover:scale-110 transition-transform">
                    <Swim className="h-6 w-6 text-blue-700" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Rozwój umiejętności pływackich</h3>
                    <p className="text-gray-700">
                      Pod okiem doświadczonych trenerów uczestnicy doskonalą swoje techniki pływackie, uczą się nowych
                      stylów i zyskują pewność siebie w wodzie.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start group">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center shrink-0 mt-1 group-hover:scale-110 transition-transform">
                    <Users className="h-6 w-6 text-blue-700" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Nowe przyjaźnie i integracja</h3>
                    <p className="text-gray-700">
                      Obóz to idealna okazja do poznania rówieśników o podobnych zainteresowaniach, wspólnej zabawy i
                      tworzenia niezapomnianych wspomnień.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div className="space-y-6 animate-on-scroll" variants={fadeInUpVariants}>
                <div className="flex gap-4 items-start group">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center shrink-0 mt-1 group-hover:scale-110 transition-transform">
                    <Compass className="h-6 w-6 text-blue-700" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Atrakcje nie tylko w wodzie</h3>
                    <p className="text-gray-700">
                      Oprócz pływania oferujemy gry zespołowe, zajęcia na świeżym powietrzu, zajęcia gimnastyczne i
                      siłowe dostosowane do wieku uczestników, ogniska, konkursy i wiele innych niespodzianek!
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start group">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center shrink-0 mt-1 group-hover:scale-110 transition-transform">
                    <Building className="h-6 w-6 text-blue-700" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Komfortowe warunki</h3>
                    <p className="text-gray-700">
                      Zapewniamy wygodne zakwaterowanie i pełnowartościowe posiłki, idealne dla młodych sportowców.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start group">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center shrink-0 mt-1 group-hover:scale-110 transition-transform">
                    <Shield className="h-6 w-6 text-blue-700" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Bezpieczeństwo na pierwszym miejscu</h3>
                    <p className="text-gray-700">
                      Każdy uczestnik jest pod stałą opieką wychowawców i trenerów, a wszystkie aktywności odbywają się
                      w kontrolowanych warunkach.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start group">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center shrink-0 mt-1 group-hover:scale-110 transition-transform">
                    <Award className="h-6 w-6 text-blue-700" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Najlepsza wakacyjna przygoda!</h3>
                    <p className="text-gray-700">
                      Niezależnie od poziomu zaawansowania, każdy znajdzie tu coś dla siebie i wróci z nową energią,
                      umiejętnościami i mnóstwem wspaniałych wrażeń.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        <section
          ref={pricingRef}
          className="py-16 bg-gradient-to-b from-blue-600 to-blue-800 text-white relative overflow-hidden"
        >
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="text-center mb-12 animate-on-scroll"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Koszt i zapisy</h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
              className="max-w-md mx-auto animate-on-scroll"
            >
              <div className="bg-white text-gray-900 rounded-xl overflow-hidden shadow-2xl transform transition-transform hover:scale-105">
                <div className="p-6 text-center">
                  <div className="text-5xl font-bold text-blue-700">3200 zł</div>
                  <div className="mt-2 bg-blue-50 p-2 rounded-lg">
                    <p className="text-blue-800 font-medium">Promocja: 3100 zł/os.</p>
                    <p className="text-sm text-blue-600">przy zapisie 2 osób</p>
                  </div>
                  <p className="mt-2 text-gray-600">Zapisy od 14.02.2026r.</p>
                  <div className="mt-4 text-blue-700 font-semibold">Zaliczka: 500zł</div>
                  <p className="mt-4 text-red-600 font-medium">
                    Liczba miejsc ograniczona – decyduje kolejność zgłoszeń!
                  </p>
                  <Button
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 md:hover:scale-105 transition-transform"
                    size="lg"
                    onClick={openRegistrationModal}
                  >
                    Zapisz swoje dziecko
                  </Button>
                </div>
                <div className="bg-blue-50 p-4">
                  <p className="text-center text-sm text-blue-700">
                    W cenie: zakwaterowanie, pełne wyżywienie, opieka, wszystkie atrakcje i zajęcia
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        <section ref={registrationPathRef} className="py-16 bg-white relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="text-center mb-12 animate-on-scroll"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full mb-4">
                <FileText className="h-4 w-4" aria-hidden="true" />
                <span className="text-sm font-medium">Instrukcja</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-800">
                Jak zapisać dziecko na obóz?
              </h2>
              <p className="text-gray-700 mt-2 max-w-2xl mx-auto">
                Wykonaj poniższe kroki, aby zapisać swoje dziecko na nasz obóz. Cały proces jest prosty i zajmie Ci
                tylko kilka minut.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
              className="animate-on-scroll"
            >
              <RegistrationPath />
            </motion.div>
          </div>
        </section>
        <section className="py-16 bg-blue-50 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-20 bg-white"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)" }}
          ></div>

          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="text-center mb-12 animate-on-scroll"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full mb-4">
                <Compass className="h-4 w-4" aria-hidden="true" />
                <span className="text-sm font-medium">FAQ</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-800">
                Najczęściej zadawane pytania
              </h2>
              <p className="text-gray-700 mt-2 max-w-2xl mx-auto">
                Odpowiedzi na pytania, które najczęściej zadają rodzice przed zapisaniem dziecka na obóz.
              </p>
            </motion.div>

            <motion.div
              className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden animate-on-scroll"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
            >
              <div className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-lg font-semibold hover:text-blue-700">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-700">{item.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </motion.div>
          </div>

          <div
            className="absolute bottom-0 left-0 w-full h-20 bg-white"
            style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0 100%)" }}
          ></div>
        </section>
        <section ref={contactRef} className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <motion.div
              className="text-center mb-12 animate-on-scroll"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full mb-4">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span className="text-sm font-medium">Kontakt</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-800">Zapisy i informacje</h2>
              <p className="text-gray-700 mt-2 max-w-2xl mx-auto">
                Masz pytania? Chcesz zapisać swoje dziecko? Skontaktuj się z nami już dziś!
              </p>
            </motion.div>

            <motion.div
              className="max-w-5xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainerVariants}
            >
              <div className="grid gap-6 md:grid-cols-2">
                {/* Lewa kolumna - informacje kontaktowe */}
                <div className="flex flex-col justify-between space-y-6">
                  <motion.div
                    className="bg-white rounded-xl shadow-lg p-4 md:p-6 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-on-scroll"
                    variants={fadeInUpVariants}
                  >
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                      <div className="bg-blue-100 p-4 rounded-full flex-shrink-0">
                        <Mail className="h-8 w-8 text-blue-700" aria-hidden="true" />
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="font-bold text-lg text-blue-800">E-mail</h3>
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2">
                          <a
                            href="mailto:wavemakersacademy@gmail.com"
                            className="text-blue-600 hover:underline break-all"
                          >
                            wavemakersacademy@gmail.com
                          </a>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText("wavemakersacademy@gmail.com")
                              const button = document.getElementById("copy-button-contact")
                              if (button) {
                                button.textContent = "Skopiowano!"
                                setTimeout(() => {
                                  button.textContent = "Kopiuj"
                                }, 2000)
                              }
                            }}
                            id="copy-button-contact"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-md text-xs transition-colors mt-2 sm:mt-0"
                          >
                            Kopiuj
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-white rounded-xl shadow-lg p-4 md:p-6 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-on-scroll"
                    variants={fadeInUpVariants}
                  >
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                      <div className="bg-blue-100 p-4 rounded-full flex-shrink-0">
                        <Phone className="h-8 w-8 text-blue-700" aria-hidden="true" />
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="font-bold text-lg text-blue-800">Telefon</h3>
                        <p className="text-gray-700">
                          Marcin –{" "}
                          {isMobile ? (
                            <a href="tel:+48506693787" className="text-blue-600 hover:underline">
                              506 693 787
                            </a>
                          ) : (
                            <span className="text-blue-600">506 693 787</span>
                          )}
                        </p>
                        <p className="text-gray-700">
                          Patryk –{" "}
                          {isMobile ? (
                            <a href="tel:+48602323099" className="text-blue-600 hover:underline">
                              602 323 099
                            </a>
                          ) : (
                            <span className="text-blue-600">602 323 099</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-white rounded-xl shadow-lg p-4 md:p-6 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-on-scroll"
                    variants={fadeInUpVariants}
                  >
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                      <div className="bg-blue-100 p-4 rounded-full flex-shrink-0">
                        <MapPin className="h-8 w-8 text-blue-700" aria-hidden="true" />
                      </div>
                      <div className="text-center sm:text-left">
                        <h3 className="font-bold text-lg text-blue-800">Lokalizacja</h3>
                        <p className="text-gray-700">Hotel Gołuń, Gołuń 1, 83-406 Wąglikowice</p>
                        <a
                          href="https://maps.app.goo.gl/E5VrrfGoDcKxzvYdA"
                          target="_blank"
                          className="text-blue-600 hover:underline inline-flex items-center gap-1 mt-1"
                          rel="noreferrer"
                        >
                          Zobacz na mapie <ChevronRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Prawa kolumna - CTA i social media */}
                <div className="flex flex-col h-full">
                  <motion.div
                    className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-lg p-8 text-white mb-6 flex-grow animate-on-scroll"
                    variants={fadeInUpVariants}
                  >
                    <h3 className="text-2xl font-bold mb-4">Zapisz swoje dziecko już dziś!</h3>
                    <p className="mb-3">
                      Nie przegap okazji, aby Twoje dziecko oderwało się od ekranu i przeżyło sportowe wakacje pełne
                      przygód, ruchu i niezapomnianych chwil!
                    </p>
                    <p className="mb-6">
                      Nie czekaj! Zapisz swoje dziecko już dziś i daj mu szansę na przeżycie najlepszych wakacji pełnych
                      sportu i zabawy!
                    </p>
                    <div className="flex flex-col gap-4">
                      <Button
                        size="lg"
                        className="bg-white text-blue-700 hover:bg-blue-50 w-full"
                        onClick={openRegistrationModal}
                      >
                        Zapisz dziecko
                      </Button>
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-white rounded-xl shadow-lg p-6 h-auto animate-on-scroll"
                    variants={fadeInUpVariants}
                  >
                    <h3 className="font-bold text-lg text-blue-800 mb-4">Śledź nas w mediach społecznościowych</h3>
                    <div className="flex gap-4">
                      <Link
                        href="https://www.facebook.com/profile.php?id=61574466772352"
                        target="_blank"
                        className="bg-blue-100 p-4 rounded-full hover:bg-blue-200 transition-colors"
                      >
                        <Facebook className="h-6 w-6 text-blue-700" aria-hidden="true" />
                      </Link>
                      <Link
                        href="https://www.instagram.com/wave_makers_academy/"
                        target="_blank"
                        className="bg-blue-100 p-4 rounded-full hover:bg-blue-200 transition-colors"
                      >
                        <Instagram className="h-6 w-6 text-blue-700" aria-hidden="true" />
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        <footer className="py-8 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="relative h-16 w-48 cursor-pointer"
                aria-label="Przewiń do góry strony"
              >
                <Image
                  src="/images/logo-color.png"
                  alt="WaveMakers Logo"
                  fill
                  className="object-contain"
                  loading="lazy"
                  sizes="(max-width: 768px) 192px, 192px"
                />
              </button>
              <div className="text-center md:text-right">
                <p className="text-sm text-gray-600">© 2026 WaveMakers Sports Academy. Wszystkie prawa zastrzeżone.</p>
                <div className="mt-2 flex flex-col md:flex-row justify-center md:justify-end space-y-2 md:space-y-0 md:space-x-4">
                  <Link href="#" className="text-blue-700 hover:text-blue-900 text-sm">
                    Polityka prywatności
                  </Link>
                  <Link href="#" className="text-blue-700 hover:text-blue-900 text-sm">
                    Regulamin
                  </Link>
                  <p className="text-sm text-gray-600">
                    Strona wykonana przez{" "}
                    <Link
                      href="https://hypercolor.pl"
                      target="_blank"
                      className="text-blue-700 hover:text-blue-900 hover:underline"
                      rel="noopener noreferrer"
                    >
                      HYPERCOLOR
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </LazyMotion>
  )
}
