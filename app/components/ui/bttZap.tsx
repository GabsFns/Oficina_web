import { Phone } from "lucide-react";

export default function WhatsButton() {
  const phoneNumber = "5521991131222";

  const message = encodeURIComponent(
    "Olá! Gostaria de entrar em contato com a oficina Vodorico ALM Diesel para obter mais informações sobre serviços para meu caminhão."
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="w-full bg-[#121214] border border-white/5 rounded-2xl p-5 mt-6">
      
      {/* Header com foto e nome */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src="https://ui-avatars.com/api/?name=Vodorico+ALM+Diesel&background=facc15&color=000"
          alt="Vodorico ALM Diesel"
          className="w-12 h-12 rounded-full border border-yellow-500/30"
        />

        <div>
          <h3 className="text-lg font-bold text-white">
            Vodorico ALM Diesel
          </h3>

          <p className="text-xs text-gray-500">
            Atendimento via WhatsApp
          </p>
        </div>
      </div>

      {/* Botão */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-yellow-500 text-black py-4 rounded-xl font-bold uppercase tracking-wider text-xs md:text-sm hover:bg-yellow-400 transition-all flex items-center justify-center gap-2"
      >
        <Phone size={18} />
        Iniciar Conversa
      </a>

    </div>
  );
}