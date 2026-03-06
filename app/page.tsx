"use client";
import { useState } from "react";
import { Menu, X, ArrowRight, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import  WhatsButton  from "./components/ui/bttZap"
 
// Configuração de animação que REPETE ao subir e descer a página
const motionProps = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" as const }
};

export default function LandingPage() {



  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-[#0a0a0b] text-white selection:bg-yellow-500 selection:text-black font-sans scroll-smooth">
      
      {/* NAVBAR */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed w-full z-50 flex justify-between items-center px-6 md:px-10 py-5 backdrop-blur-md border-b border-white/5 bg-[#0a0a0b]/80"
      >
        <div className="text-lg md:text-xl font-black tracking-tighter uppercase italic">
          Vodorico<span className="text-yellow-500">ALM</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <a href="#servicos" className="hover:text-yellow-500 transition-colors">Serviços</a>
          <a href="#contato" className="hover:text-yellow-500 transition-colors">Contato</a>
          <a href="/secure" className="text-white border-l border-white/10 pl-8 hover:text-yellow-500">Área</a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-yellow-500" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#0a0a0b] border-b border-white/5 flex flex-col p-8 gap-6 md:hidden animate-in slide-in-from-top duration-300">
            <a href="#servicos" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold uppercase italic">Serviços</a>
            <a href="#contato" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold uppercase italic">Contato</a>
            <a href="/secure" className="text-xl font-bold uppercase italic text-yellow-500">Área</a>
          </div>
        )}
      </motion.nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center px-6 md:px-20 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 1.5 }}
            src="https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1260" 
            className="w-full h-full object-cover grayscale"
            alt="Truck Background"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0a0a0b] via-[#0a0a0b]/90 to-transparent"></div>
        </div>

      <div className="relative z-10 max-w-9xl w-full">

  <motion.h2
    {...motionProps}
    transition={{ delay: 0.3 }}
    className="text-yellow-500 text-xs md:text-sm font-bold tracking-[0.35em] uppercase mb-4"
  >
    Potência sob controle
  </motion.h2>

  <motion.h1
    {...motionProps}
    transition={{ delay: 0.5 }}
    className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[1] uppercase italic mb-8"
  >
    Problemas com seu Caminhão?
    <br />

    <span className="text-white bg-white/5 backdrop-blur-sm border-t border-b border-white/20 inline-block mt-3 px-4 py-2">
      Nós Temos a Solução.
    </span>
  </motion.h1>

  <motion.p
    {...motionProps}
    transition={{ delay: 0.7 }}
    className="text-gray-400 text-sm md:text-lg lg:text-xl max-w-3xl mb-10 font-light leading-relaxed"
  >
    Especialistas em mecânica diesel pesada em Nova Iguaçu.
    Diagnóstico eletrônico avançado, manutenção e reparos
    realizados com tecnologia, precisão e confiança para
    manter seu caminhão sempre na estrada.
  </motion.p>

  <motion.div
    {...motionProps}
    transition={{ delay: 0.9 }}
    className="flex flex-col sm:flex-row gap-4"
  >
    <button className="bg-yellow-500 text-black px-10 py-5 font-black uppercase text-sm md:text-base hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 group">
      Solicitar Orçamento
      <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
    </button>
  </motion.div>

</div>
      </section>
      

      {/* SERVICES GRID */}
      <section id="servicos" className="py-20 px-6 md:px-10 bg-[#0f0f11]">
        <motion.div {...motionProps} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black uppercase italic">Nossa Expertise</h2>
            <div className="w-16 h-1 bg-yellow-500 mt-2"></div>
          </div>
          <p className="text-gray-500 max-w-xs text-sm uppercase tracking-widest font-bold md:text-right">
            Diagnóstico avançado e precisão técnica.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          <ServiceCard num="01" title="Injeção Eletrônica" desc="Calibragem e reparo de bicos e bombas injetoras Common Rail." delay={0.1} />
          <ServiceCard num="02" title="Mecânica Pesada" desc="Revisão completa de motores, câmbio e diferenciais de alto rendimento." delay={0.2} />
          <ServiceCard num="03" title="Turbinas" desc="Manutenção especializada em sistemas de turboalimentação." delay={0.3} />
        </div>
      </section>

      {/* LOCATION & CONTACT */}
      <section id="contato" className="py-20 px-6 md:px-10 border-t border-white/5 relative overflow-hidden">
        <div className="hidden lg:block italic font-black text-[12rem] uppercase leading-none opacity-[0.02] absolute -bottom-10 left-0 pointer-events-none select-none">
          VODORICO
        </div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          <motion.div {...motionProps} className="order-2 lg:order-1">
            <h2 className="text-2xl md:text-3xl font-black uppercase mb-8 italic text-yellow-500 flex items-center gap-3">
              <MapPin className="text-white" /> Localização
            </h2>
            
            <div className="aspect-video w-full border border-white/10 overflow-hidden rounded-2xl grayscale contrast-125 hover:grayscale-0 transition-all duration-700">
              <iframe
                width="100%" height="100%" style={{ border: 0 }} loading="lazy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18457.15258270152!2d-43.47798916044922!3d-22.7308158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9967c141e88c63%3A0x843540430f01a788!2sVodorico%20ALM%20Diesel!5e1!3m2!1spt-BR!2sbr!4v1772739270598!5m2!1spt-BR!2sbr"
              ></iframe>
            </div>

            <p className="mt-6 text-gray-400 text-sm flex items-start gap-2 italic leading-relaxed">
              <span className="text-yellow-500 font-bold">ENDEREÇO:</span> 
              Rua Ouvidor (em frente ao nº 69), Esquina com R. Manoel Martins Pereira <br />
              Vila Abolição, Nova Iguaçu - RJ, 26022-650
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 bg-[#121214] p-8 md:p-12 rounded-[2rem] border border-white/5 shadow-2xl"
          >
            <h2 className="text-2xl md:text-3xl font-black uppercase mb-2">Fale Conosco</h2>
            <p className="text-gray-500 mb-8 font-light text-sm">Agende sua revisão pelo WhatsApp.</p>
            
            <form className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-1">Nome Completo</label>
                <input type="text" className="w-full bg-black/50 border border-white/5 p-4 rounded-xl outline-none focus:border-yellow-500 transition-all text-sm"/>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-1">Placa ou Modelo</label>
                <input type="text" className="w-full bg-black/50 border border-white/5 p-4 rounded-xl outline-none focus:border-yellow-500 transition-all text-sm font-mono tracking-widest"/>
              </div>
              {/* <button className="w-full bg-yellow-500 text-black py-5 font-black uppercase tracking-widest text-xs md:text-sm hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 mt-4">
                <Phone size={18} /> Iniciar Conversa
              </button> */}
              <WhatsButton/>
            </form>
          </motion.div>
        </div>
      </section>

      <footer className="py-10 text-center border-t border-white/5 text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-gray-600 px-6">
        © 2026 Vodorico ALM Diesel — High Performance Trucks
      </footer>
    </div>
  );
}

function ServiceCard({ title, desc, num, delay }: { title: string, desc: string, num: string, delay?: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5, delay: delay }}
      className="bg-[#0f0f11] p-8 md:p-12 hover:bg-yellow-500 group transition-all duration-500 cursor-pointer border border-white/5 md:border-none"
    >
      <div className="text-yellow-500 group-hover:text-black font-black text-xl mb-6 transition-colors tracking-tighter">
        {num}
      </div>
      <h3 className="text-xl md:text-2xl font-black uppercase italic mb-4 group-hover:text-black transition-colors">
        {title}
      </h3>
      <p className="text-gray-500 group-hover:text-black/70 font-light leading-relaxed text-sm">
        {desc}
      </p>
    </motion.div>
  );
}