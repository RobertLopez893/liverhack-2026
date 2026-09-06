import { Facebook, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full">
      {/* Main footer section */}
      <div className="bg-[#6B6B6B] text-white px-4 md:px-8 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Servicios Liverpool */}
            <div>
              <h3 className="font-semibold text-sm md:text-base mb-3 md:mb-4">Servicios Liverpool</h3>
              <ul className="space-y-2 text-xs md:text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Crédito
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Tiempo aire
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Concursos y promociones
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Diseño de interiores
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Ventas corporativas
                  </a>
                </li>
              </ul>
            </div>

            {/* Acerca de Liverpool */}
            <div>
              <h3 className="font-semibold text-sm md:text-base mb-3 md:mb-4">Acerca de Liverpool</h3>
              <ul className="space-y-2 text-xs md:text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Portal de carrera
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    ¿Quiénes somos?
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Relación con inversionistas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Sostenibilidad
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact info */}
            <div className="md:col-span-2 lg:col-span-1">
              <h3 className="font-semibold text-sm md:text-base mb-3 md:mb-4">Ventas por teléfono 555262-9999</h3>
              <p className="text-xs md:text-sm mb-2">Desde tu celular *7171</p>
              <p className="text-xs md:text-sm">Contáctanos vía Whatsapp o por teléfono al 5552629999</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="bg-[#3D3D3D] text-white px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <p className="text-xs md:text-sm text-center md:text-left">
              Comentarios y Sugerencias:
              <a href="mailto:atencion@liverpool.com.mx" className="hover:underline ml-1">
                atencion@liverpool.com.mx
              </a>
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-xs md:text-sm">
              <a href="#" className="hover:underline">
                Términos y condiciones
              </a>
              <span className="hidden md:inline">/</span>
              <a href="#" className="hover:underline">
                Aviso de privacidad
              </a>
              <span className="hidden md:inline">/</span>
              <a href="#" className="hover:underline">
                Mapa del sitio
              </a>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold">TIENDA DIGITAL</span>
              <a href="#" className="hover:opacity-80" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:opacity-80" aria-label="X">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="hover:opacity-80" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="border-t border-gray-600 pt-4">
            <p className="text-xs text-center text-gray-400">
              Precio en rojo aplica el descuento más alto, las promociones pueden diferir de las publicadas en tienda
            </p>
            <p className="text-xs text-center text-gray-400 mt-2">
              Las imágenes mostradas son para fines ilustrativos, las piezas se venden por separado
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
