import { MessageCircle, Headphones, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { env } from "@/env";

export default function SupportPage() {
  const emailSuporte = "quitemgsia@gmail.com";

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
          {/* Logo */}
          <div className="flex justify-center mb-8 ">
            <div className="w-20 h-20 bg-[#912C21] rounded-xl flex items-center justify-center">
              <Headphones className="w-10 h-10 text-primary-foreground " />
            </div>
          </div>

          {/* Título */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">
              Central de Suporte
            </h1>
            <p className="text-muted-foreground text-pretty">
              Estamos aqui para ajudar você. Escolha uma opção abaixo para
              entrar em contato.
            </p>
          </div>

          {/* Botões */}
          <div className="space-y-4">
            <a
              href={`https://wa.me/${env.VITE_SUPPORT_01}?text=Olá, preciso de suporte no app Aqui Tem`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                size="lg"
                className="w-full gap-3 h-14 text-base font-medium bg-[#912C21] hover:bg-[#912C21]/90 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                Atendimento 01
              </Button>
            </a>

            <a
              href={`https://wa.me/${env.VITE_SUPPORT_02}?text=Olá, preciso de suporte no app Aqui Tem`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                size="lg"
                variant="outline"
                className="w-full gap-3 h-14 text-base font-medium bg-background hover:bg-accent cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                Atendimento 02
              </Button>
            </a>

            <a
              href={`mailto:${emailSuporte}?subject=Solicitação no App Aqui Tem`}
              className="block"
            >
              <Button
                size="lg"
                variant="outline"
                className="w-full gap-3 h-14 text-base font-medium bg-background hover:bg-accent cursor-pointer"
              >
                <Mail className="w-5 h-5" />
                Suporte por Email
              </Button>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
