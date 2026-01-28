"use client"

import { Button } from "@/components/ui/button"
import { Download, Mail, FileText, CheckCircle, Camera } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function RegistrationPath() {
  const { toast } = useToast()

  const handleDownloadPDF = () => {
    // Bezpośrednie pobieranie pliku PDF
    window.open("/dokumenty-obozowe.pdf", "_blank")

    toast({
      title: "Pobieranie dokumentów obozowych",
      description: "Karta kwalifikacyjna i regulamin obozu zostaną pobrane na Twoje urządzenie.",
    })
  }

  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-0">
      <div className="relative">
        {/* Kroki */}
        <div className="space-y-8 md:space-y-24 relative">
          {/* Linia ścieżki - widoczna tylko na większych ekranach */}
          <div className="absolute left-8 md:left-10 top-12 bottom-[140px] w-1 bg-blue-200 hidden md:block"></div>

          {/* Krok 1 */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-center">
            <div className="flex-shrink-0 z-10 flex flex-col items-center">
              <div className="bg-blue-600 text-white w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg">
                <Download className="h-6 w-6 md:h-8 md:w-8" />
              </div>
              <div className="bg-blue-600 text-white text-xs md:text-sm font-bold px-2 md:px-3 py-1 rounded-full mt-2">
                Krok 1
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 md:ml-6 flex-grow transform transition-all duration-300 hover:shadow-xl">
              <h3 className="text-lg md:text-xl font-bold text-blue-800 mb-2 md:mb-3">Pobierz dokumenty obozowe</h3>
              <p className="text-gray-700 mb-3 md:mb-4 text-sm md:text-base">
                Pobierz oficjalną kartę kwalifikacyjną uczestnika wypoczynku oraz regulamin obozu, wydrukuj je i
                wypełnij kartę odręcznie. Karta oraz regulamin muszą być podpisane przez rodzica/opiekuna prawnego.
              </p>
              <Button onClick={handleDownloadPDF} className="flex items-center gap-2 text-sm">
                <Download className="h-4 w-4" />
                Pobierz dokumenty obozowe
              </Button>
            </div>
          </div>

          {/* Krok 2 */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-center">
            <div className="flex-shrink-0 z-10 flex flex-col items-center">
              <div className="bg-blue-600 text-white w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg">
                <FileText className="h-6 w-6 md:h-8 md:w-8" />
              </div>
              <div className="bg-blue-600 text-white text-xs md:text-sm font-bold px-2 md:px-3 py-1 rounded-full mt-2">
                Krok 2
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 md:ml-6 flex-grow transform transition-all duration-300 hover:shadow-xl">
              <h3 className="text-lg md:text-xl font-bold text-blue-800 mb-2 md:mb-3">
                Wypełnij kartę i zapoznaj się z regulaminem
              </h3>
              <p className="text-gray-700 mb-3 md:mb-4 text-sm md:text-base">
                Wypełnij wszystkie wymagane pola w karcie kwalifikacyjnej. Dokładnie zapoznaj się z regulaminem obozu i
                podpisz go. Zwróć szczególną uwagę na:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-4 space-y-1 text-sm md:text-base">
                <li>Dane osobowe dziecka</li>
                <li>Dane kontaktowe rodziców/opiekunów</li>
                <li>Informacje o stanie zdrowia dziecka</li>
                <li>Podpis rodzica/opiekuna prawnego na karcie kwalifikacyjnej</li>
                <li>Podpis rodzica/opiekuna prawnego na regulaminie obozu</li>
                <li>Zasady uczestnictwa w obozie opisane w regulaminie</li>
              </ul>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 md:p-4 text-yellow-800 text-sm md:text-base">
                <p className="font-medium">Ważne!</p>
                <p className="text-sm">
                  Dokładne wypełnienie karty i zapoznanie się z regulaminem jest niezbędne dla zapewnienia
                  bezpieczeństwa Twojego dziecka podczas obozu.
                </p>
              </div>
            </div>
          </div>

          {/* Krok 3 */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-center">
            <div className="flex-shrink-0 z-10 flex flex-col items-center">
              <div className="bg-blue-600 text-white w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg">
                <Camera className="h-6 w-6 md:h-8 md:w-8" />
              </div>
              <div className="bg-blue-600 text-white text-xs md:text-sm font-bold px-2 md:px-3 py-1 rounded-full mt-2">
                Krok 3
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 md:ml-6 flex-grow transform transition-all duration-300 hover:shadow-xl">
              <h3 className="text-lg md:text-xl font-bold text-blue-800 mb-2 md:mb-3">
                Zeskanuj lub zrób zdjęcie dokumentów
              </h3>
              <p className="text-gray-700 mb-3 md:mb-4 text-sm md:text-base">
                Po wypełnieniu i podpisaniu karty oraz regulaminu, zeskanuj je lub zrób wyraźne zdjęcie każdej strony.
                Upewnij się, że:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-4 space-y-1 text-sm md:text-base">
                <li>Cała treść jest dobrze widoczna</li>
                <li>Zdjęcie jest ostre i dobrze oświetlone</li>
                <li>Wszystkie strony są uwzględnione</li>
              </ul>
              <p className="text-gray-700 text-sm md:text-base">
                Zapisz skan/zdjęcie w formacie PDF lub jako pliki JPG/PNG.
              </p>
            </div>
          </div>

          {/* Krok 4 */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-center">
            <div className="flex-shrink-0 z-10 flex flex-col items-center">
              <div className="bg-blue-600 text-white w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg">
                <Mail className="h-6 w-6 md:h-8 md:w-8" />
              </div>
              <div className="bg-blue-600 text-white text-xs md:text-sm font-bold px-2 md:px-3 py-1 rounded-full mt-2">
                Krok 4
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 md:ml-6 flex-grow transform transition-all duration-300 hover:shadow-xl">
              <h3 className="text-lg md:text-xl font-bold text-blue-800 mb-2 md:mb-3">Wyślij dokumenty e-mailem</h3>
              <p className="text-gray-700 mb-3 md:mb-4 text-sm md:text-base">
                Wyślij wypełnioną kartę kwalifikacyjną oraz podpisany regulamin na adres email:
              </p>
              <div className="bg-blue-50 p-3 md:p-4 rounded-lg border border-blue-200 mb-3 md:mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="font-mono text-blue-700 font-medium text-sm md:text-base break-all">
                  wavemakersacademy@gmail.com
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("wavemakersacademy@gmail.com")
                    const button = document.getElementById("copy-button")
                    if (button) {
                      button.textContent = "Skopiowano!"
                      setTimeout(() => {
                        button.textContent = "Kopiuj"
                      }, 2000)
                    }
                  }}
                  id="copy-button"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs transition-colors mt-2 md:mt-0 w-fit self-end md:self-auto"
                >
                  Kopiuj
                </button>
              </div>
              <p className="text-gray-700 mb-3 md:mb-4 text-sm md:text-base">
                W temacie wiadomości wpisz: <span className="font-medium">Zgłoszenie - [Imię i Nazwisko dziecka]</span>
              </p>
              <p className="text-gray-700 mb-3 md:mb-4 text-sm md:text-base">
                W treści e-maila podaj swój numer telefonu oraz ewentualne dodatkowe informacje lub pytania.
              </p>
            </div>
          </div>

          {/* Krok 5 */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-center">
            <div className="flex-shrink-0 z-10 flex flex-col items-center">
              <div className="bg-blue-600 text-white w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="h-6 w-6 md:h-8 md:w-8" />
              </div>
              <div className="bg-blue-600 text-white text-xs md:text-sm font-bold px-2 md:px-3 py-1 rounded-full mt-2">
                Krok 5
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 md:ml-6 flex-grow transform transition-all duration-300 hover:shadow-xl">
              <h3 className="text-lg md:text-xl font-bold text-blue-800 mb-2 md:mb-3">Potwierdzenie i płatność</h3>
              <p className="text-gray-700 mb-3 md:mb-4 text-sm md:text-base">
                Po otrzymaniu Twojego zgłoszenia, skontaktujemy się z Tobą w ciągu 2 dni roboczych, aby:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-4 space-y-1 text-sm md:text-base">
                <li>Potwierdzić otrzymanie zgłoszenia</li>
                <li>Przekazać informacje o płatności zaliczki (500 zł)</li>
                <li>Odpowiedzieć na ewentualne pytania</li>
              </ul>
              <div className="bg-green-50 border-l-4 border-green-400 p-3 md:p-4 text-green-800 text-sm md:text-base">
                <p className="font-medium">Gratulacje!</p>
                <p className="text-sm">
                  Po wpłacie zaliczki, miejsce Twojego dziecka na obozie będzie zarezerwowane. Pozostałą kwotę należy
                  wpłacić najpóźniej do 15 czerwca 2026r.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

