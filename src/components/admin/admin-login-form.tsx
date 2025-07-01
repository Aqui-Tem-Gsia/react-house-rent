import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { loginSchema, type LoginFormData } from "@/schemas/login-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginAdmin } from "@/services/auth-service";
import { isAdmin } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export default function AdminLoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: loginAdmin,
    onSuccess: (data) => {
      const token = data.token;

      if (isAdmin(token)) {
        localStorage.setItem("token", token);
        navigate("/admin/home");
      } else {
        setErrorMessage("Usuário não autorizado.");
      }
    },
    onError: () => {
      setErrorMessage("Erro ao efetuar login.");
    },
  });

  const onSubmit = (data: LoginFormData) => {
    setErrorMessage("");
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          E-mail
        </Label>
        <Input
          {...register("email")}
          id="email"
          type="email"
          placeholder="seu@email.com"
          className="w-full"
          required
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      {/* Campo Senha */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
          Senha
        </Label>
        <Input
          {...register("password")}
          id="password"
          type="password"
          placeholder="Digite sua senha"
          className="w-full"
          required
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      <Button
        type="submit"
        className="w-full text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        style={{ backgroundColor: "#912C21" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#7a241c";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#912C21";
        }}
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Entrando..." : "Entrar"}
      </Button>

      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
    </form>
  );
}
