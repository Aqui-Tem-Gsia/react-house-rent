import AdminLoginForm from "@/components/admin/admin-login-form";
import logo from "../../assets/images/logo-with-name.svg";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-col items-center justify-center pt-8 pb-4">
        <div className="flex items-center space-x-3 mb-2">
          <img src={logo} alt="Workflow" className="size-60" />
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Faça seu login
                </h2>
                <p className="text-sm text-gray-600">
                  Entre com suas credenciais para acessar sua conta
                </p>
              </div>

              <AdminLoginForm />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4 text-xs text-gray-500">
        © {new Date().getFullYear()} Aqui Tem | Aluguel e Vendas. Todos os
        direitos reservados.
      </div>
    </div>
  );
}
