"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Mail, FileText, CheckCircle, Camera } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function RegistrationInstructions({ onClose }: { onClose: () => void }) {
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
    <div className="bg-white rounded-xl shadow-xl max-w-4xl mx-auto overflow-hidden">
      <div className="bg-blue-600 p-4 md:p-6 text-white">
        <h2 className="text-xl md:text-2xl font-bold">Jak zapisać dziecko na obóz WaveMakers Summer Camp 2026</h2>
        <p className="mt-2 text-sm md:text-base">Wykonaj poniższe kroki, aby zapisać swoje dziecko na nasz obóz</p>
      </div>

      <div className="p-4 md:p-6 space-y-6 md:space-y-8">
        {/* Krok 1 */}
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
          <CardContent className="p-0">
            <div className="bg-blue-50 p-4 md:p-6 flex flex-col md:flex-row items-start gap-4 md:gap-6">
              <div className="bg-blue-100 text-blue-700 p-3 md:p-4 rounded-full flex-shrink-0 self-center md:self-start">
                <Download className="h-6 w-6 md:h-8 md:w-8" />
              </div>
              <div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <div className="bg-blue-600 text-white text-xs md:text-sm font-bold px-2 md:px-3 py-1 rounded-full">
                    Krok 1
                  </div>
                  <h3 className="font-bold text-lg md:text-xl text-blue-800">Pobierz dokumenty obozowe</h3>
                </div>
                <p className="text-gray-700 mb-4 text-sm md:text-base">
                  Pobierz oficjalną kartę kwalifikacyjną uczestnika wypoczynku oraz regulamin obozu, wydrukuj je i
                  wypełnij kartę odręcznie. Karta oraz regulamin muszą być podpisane przez rodzica/opiekuna prawnego.
                </p>
                <Button onClick={handleDownloadPDF} className="flex items-center gap-2 text-sm">
                  <Download className="h-4 w-4" />
                  Pobierz dokumenty obozowe
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Krok 2 */}
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
          <CardContent className="p-0">
            <div className="bg-blue-50 p-4 md:p-6 flex flex-col md:flex-row items-start gap-4 md:gap-6">
              <div className="bg-blue-100 text-blue-700 p-3 md:p-4 rounded-full flex-shrink-0 self-center md:self-start">
                <FileText className="h-6 w-6 md:h-8 md:w-8" />
              </div>
              <div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <div className="bg-blue-600 text-white text-xs md:text-sm font-bold px-2 md:px-3 py-1 rounded-full">
                    Krok 2
                  </div>
                  <h3 className="font-bold text-lg md:text-xl text-blue-800">
                    Wypełnij kartę i zapoznaj się z regulaminem
                  </h3>
                </div>
                <p className="text-gray-700 mb-4 text-sm md:text-base">
                  Wypełnij wszystkie wymagane pola w karcie kwalifikacyjnej. Dokładnie zapoznaj się z regulaminem obozu
                  i podpisz go. Zwróć szczególną uwagę na:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1 text-sm md:text-base">
                  <li>Dane osobowe dziecka</li>
                  <li>Dane kontaktowe rodziców/opiekunów</li>
                  <li>Informacje o stanie zdrowia dziecka</li>
                  <li>Podpis rodzica/opiekuna prawnego na karcie kwalifikacyjnej</li>
                  <li>Podpis rodzica/opiekuna prawnego na regulaminie obozu</li>
                  <li>Zasady uczestnictwa w obozie opisane w regulaminie</li>
                </ul>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-yellow-800 text-sm md:text-base">
                  <p className="font-medium">Ważne!</p>
                  <p className="text-sm">
                    Dokładne wypełnienie karty i zapoznanie się z regulaminem jest niezbędne dla zapewnienia
                    bezpieczeństwa Twojego dziecka podczas obozu.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Krok 3 */}
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
          <CardContent className="p-0">
            <div className="bg-blue-50 p-4 md:p-6 flex flex-col md:flex-row items-start gap-4 md:gap-6">
              <div className="bg-blue-100 text-blue-700 p-3 md:p-4 rounded-full flex-shrink-0 self-center md:self-start">
                <Camera className="h-6 w-6 md:h-8 md:w-8" />
              </div>
              <div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <div className="bg-blue-600 text-white text-xs md:text-sm font-bold px-2 md:px-3 py-1 rounded-full">
                    Krok 3
                  </div>
                  <h3 className="font-bold text-lg md:text-xl text-blue-800">Zeskanuj lub zrób zdjęcie dokumentów</h3>
                </div>
                <p className="text-gray-700 mb-4 text-sm md:text-base">
                  Po wypełnieniu i podpisaniu karty oraz regulaminu, zeskanuj je lub zrób wyraźne zdjęcie każdej strony.
                  Upewnij się, że:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1 text-sm md:text-base">
                  <li>Cała treść jest dobrze widoczna</li>
                  <li>Zdjęcie jest ostre i dobrze oświetlone</li>
                  <li>Wszystkie strony są uwzględnione</li>
                </ul>
                <p className="text-gray-700 text-sm md:text-base">
                  Zapisz skan/zdjęcie w formacie PDF lub jako pliki JPG/PNG.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Krok 4 */}
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
          <CardContent className="p-0">
            <div className="bg-blue-50 p-4 md:p-6 flex flex-col md:flex-row items-start gap-4 md:gap-6">
              <div className="bg-blue-100 text-blue-700 p-3 md:p-4 rounded-full flex-shrink-0 self-center md:self-start">
                <Mail className="h-6 w-6 md:h-8 md:w-8" />
              </div>
              <div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <div className="bg-blue-600 text-white text-xs md:text-sm font-bold px-2 md:px-3 py-1 rounded-full">
                    Krok 4
                  </div>
                  <h3 className="font-bold text-lg md:text-xl text-blue-800">Wyślij dokumenty e-mailem</h3>
                </div>
                <p className="text-gray-700 mb-4 text-sm md:text-base">
                  Wyślij wypełnioną kartę kwalifikacyjną oraz podpisany regulamin na adres email:
                </p>
                <div className="bg-white p-3 md:p-4 rounded-lg border border-blue-200 mb-3 md:mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="font-mono text-blue-700 font-medium text-sm md:text-base break-all">
                    wavemakersacademy@gmail.com
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("wavemakersacademy@gmail.com")
                      const button = document.getElementById("copy-button-instructions")
                      if (button) {
                        button.textContent = "Skopiowano!"
                        setTimeout(() => {
                          button.textContent = "Kopiuj"
                        }, 2000)
                      }
                    }}
                    id="copy-button-instructions"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs transition-colors mt-2 md:mt-0 w-fit self-end md:self-auto"
                  >
                    Kopiuj
                  </button>
                </div>
                <p className="text-gray-700 mb-4 text-sm md:text-base">
                  W temacie wiadomości wpisz:{" "}
                  <span className="font-medium">Zgłoszenie - [Imię i Nazwisko dziecka]</span>
                </p>
                <p className="text-gray-700 mb-4 text-sm md:text-base">
                  W treści e-maila podaj swój numer telefonu oraz ewentualne dodatkowe informacje lub pytania.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Krok 5 */}
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
          <CardContent className="p-0">
            <div className="bg-blue-50 p-4 md:p-6 flex flex-col md:flex-row items-start gap-4 md:gap-6">
              <div className="bg-blue-100 text-blue-700 p-3 md:p-4 rounded-full flex-shrink-0 self-center md:self-start">
                <CheckCircle className="h-6 w-6 md:h-8 md:w-8" />
              </div>
              <div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <div className="bg-blue-600 text-white text-xs md:text-sm font-bold px-2 md:px-3 py-1 rounded-full">
                    Krok 5
                  </div>
                  <h3 className="font-bold text-lg md:text-xl text-blue-800">Potwierdzenie i płatność</h3>
                </div>
                <p className="text-gray-700 mb-4 text-sm md:text-base">
                  Po otrzymaniu Twojego zgłoszenia, skontaktujemy się z Tobą w ciągu 2 dni roboczych, aby:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1 text-sm md:text-base">
                  <li>Potwierdzić otrzymanie zgłoszenia</li>
                  <li>Przekazać informacje o płatności zaliczki (500 zł)</li>
                  <li>Odpowiedzieć na ewentualne pytania</li>
                </ul>
                <div className="bg-green-50 border-l-4 border-green-400 p-4 text-green-800 text-sm md:text-base">
                  <p className="font-medium">Gratulacje!</p>
                  <p className="text-sm">
                    Po wpłacie zaliczki, miejsce Twojego dziecka na obozie będzie zarezerwowane. 
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-6 md:mt-8">
          <Button onClick={onClose} variant="outline" className="mx-auto text-sm">
            Zamknij instrukcję
          </Button>
        </div>
      </div>
    </div>
  )
}

