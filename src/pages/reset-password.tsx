import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { resetPassword } from '@/services/auth-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import z from 'zod';
import logo from '../assets/images/logo-aqui-tem.svg';

const schema = z
  .object({
    password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas precisam ser iguais',
    path: ['confirmPassword'],
  });

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setLoading(true);

    try {
      await resetPassword(data.password, token!);

      toast.success('Senha redefinida com sucesso!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        typeof error.response.data.message === 'string'
          ? error.response.data.message
          : error.response.data.message?.[0] ??
            'Ocorreu um erro ao redefinir a senha.';

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-col items-center justify-center pt-8 pb-4">
        <div className="flex items-center space-x-3 mb-2">
          <img src={logo} alt="Workflow" className="size-40" />
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Redefina sua senha
                </h2>
                <p className="text-sm text-gray-600">
                  Insira uma nova senha para redefinir sua senha
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Senha
                  </Label>

                  <Input
                    {...register('password')}
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

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Confirmar senha
                  </Label>

                  <Input
                    {...register('confirmPassword')}
                    id="confirmPassword"
                    type="password"
                    placeholder="Digite sua senha novamente"
                    className="w-full"
                    required
                  />
                  {errors.confirmPassword && (
                    <span className="text-red-500 text-sm">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer"
                  style={{ backgroundColor: '#912C21' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#7a241c';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#912C21';
                  }}
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Redefinir senha'}
                </Button>
              </form>
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
};
