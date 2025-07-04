import { Calendar } from "lucide-react";
import welcomeImage from "../../assets/images/welcome.svg";
export const AdminHomePage = () => {
  return (
    <div className="flex flex-col w-full h-[80%] items-center justify-between text-center space-y-4">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">
          Bem-vindo ao Dashboard Administrativo
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Revise e gerencie seus anúncios.
        </p>
      </div>

      <div className="flex items-center justify-center">
        <img src={welcomeImage} alt="welcome" className="size-[85%]" />
      </div>

      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span>
          Hoje,{" "}
          {new Date().toLocaleDateString("pt-BR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
    </div>
  );
};
