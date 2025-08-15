import { Link } from 'react-router-dom';

export const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl h-full w-full flex flex-col bg-white shadow-lg overflow-hidden">
        <header className="px-6 py-5 border-b fixed bg-white w-full max-w-3xl">
          <h1 className="text-2xl font-semibold">
            Política de Privacidade - Aqui Tem
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Vigência: <span className="font-medium">14 de Agosto de 2025</span>
          </p>
        </header>

        <main className="p-6 h-full mt-[150px] leading-relaxed text-gray-700 text-justify">
          <article>
            <p className="mb-4">
              Esta Política de Privacidade descreve as práticas adotadas pelo
              aplicativo "Aqui Tem" (doravante "Aplicativo" ou "Nós") relativas
              à coleta, uso, tratamento, armazenamento, compartilhamento e
              proteção de dados pessoais dos usuários (doravante "Você" ou
              "Usuário"). Ao utilizar o Aplicativo, o Usuário declara ter lido e
              concordado com os termos desta Política.
            </p>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold">1. Âmbito de Aplicação</h2>

              <p className="mt-2">
                <strong>1.1.</strong> Esta Política aplica‑se a todos os
                Serviços prestados pelo Aplicativo, incluindo, sem limitação,
                funcionalidades de cadastro, publicação e gestão de anúncios,
                busca e visualização de anúncios, comunicação entre usuários e
                contratação de serviços pagos disponibilizados na plataforma.
              </p>

              <p className="mt-2">
                <strong>1.2.</strong> A Política complementa, sem prejuízo, os{' '}
                <Link to="/terms" className="text-blue-600 underline">
                  Termos e Condições de Uso
                </Link>{' '}
                do Aplicativo. Em caso de conflito, prevalecerão as disposições
                expressas em normas aplicáveis e, subsidiariamente, os Termos e
                Condições.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold">
                2. Categorias de Dados Coletados
              </h2>
              <p className="mt-2">
                <strong>2.1.</strong> Podemos coletar as seguintes categorias de
                dados pessoais:
              </p>
              <ul className="list-disc list-inside mt-2">
                <li>
                  <strong>Dados de identificação:</strong> nome completo,
                  CPF/CNPJ quando exigido;
                </li>

                <li>
                  <strong>Dados de contato:</strong> e‑mail, telefone, endereço
                  postal;
                </li>

                <li>
                  <strong>Dados de autenticação:</strong> e-mail e senha;
                </li>

                <li>
                  <strong>Dados do imóvel:</strong> endereço, características,
                  fotos, vídeos, plantas e demais informações necessárias para a
                  criação do anúncio;
                </li>

                <li>
                  <strong>Dados de pagamento:</strong> informações necessárias
                  para cobrança e faturamento, tais como dados de cartão de
                  pagamento (quando aplicável) ou informações fornecidas a
                  provedores de pagamento;
                </li>

                <li>
                  <strong>Dados sensíveis:</strong> apenas quando estritamente
                  necessários e com amparo legal específico, respeitando a
                  legislação aplicável.
                </li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold">
                3. Finalidades do Tratamento
              </h2>

              <p className="mt-2">
                <strong>3.1.</strong> Os dados pessoais são tratados para as
                seguintes finalidades:
              </p>

              <ul className="list-disc list-inside mt-2">
                <li>
                  viabilizar o cadastro, autenticação e gerenciamento da conta
                  do Usuário;
                </li>

                <li>
                  permitir a criação, publicação, edição e remoção de anúncios
                  imobiliários;
                </li>

                <li>
                  processar pagamentos, faturamento e gestão de serviços pagos
                  contratados pelo Usuário;
                </li>

                <li>
                  fornecer suporte, atendimento ao cliente e comunicação
                  referente a serviços e transações;
                </li>

                <li>
                  manter a segurança da plataforma, prevenir fraudes e abuso, e
                  realizar análises de risco;
                </li>

                <li>cumprir obrigações legais, regulatórias e fiscais;</li>

                <li>
                  enviar comunicações relativas a mudanças nos serviços, termos,
                  políticas e avisos operacionais;
                </li>

                <li>
                  aprimorar a experiência do Usuário, por meio de análises e
                  estatísticas agregadas de uso.
                </li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold">
                4. Bases Legais para o Tratamento
              </h2>

              <p className="mt-2">
                <strong>4.1.</strong> O Aplicativo realiza o tratamento de dados
                com fundamento nas bases legais aplicáveis, incluindo, sem
                limitação:
              </p>

              <ul className="list-disc list-inside mt-2">
                <li>
                  <strong>Execução de contrato:</strong> quando o tratamento for
                  necessário para a prestação do serviço solicitado pelo
                  Usuário;
                </li>

                <li>
                  <strong>Consentimento:</strong> quando o tratamento depender
                  de autorização prévia do titular (por exemplo, marketing
                  direto);
                </li>

                <li>
                  <strong>Cumprimento de obrigação legal:</strong> quando
                  exigido por legislação, ordem judicial ou autoridade
                  competente;
                </li>

                <li>
                  <strong>Legítimo interesse:</strong> para fins de segurança,
                  prevenção a fraudes, e melhoria de produtos e serviços, desde
                  que respeitados os direitos e liberdades fundamentais do
                  titular.
                </li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold">
                5. Compartilhamento de Dados
              </h2>

              <p className="mt-2">
                <strong>5.1.</strong> Os dados pessoais poderão ser
                compartilhados com:
              </p>

              <ul className="list-disc list-inside mt-2">
                <li>
                  <strong>Prestadores de serviços:</strong> empresas contratadas
                  para hospedagem, processamento de pagamento, serviços de
                  nuvem, serviços de análise de dados, provedores de comunicação
                  e atendimento, empresas de verificação e antifraude, e outros
                  fornecedores necessários à operação do Aplicativo;
                </li>

                <li>
                  <strong>Autoridades competentes:</strong> para atendimento a
                  ordens judiciais, solicitações de autoridades administrativas
                  ou cumprimento de obrigações legais;
                </li>

                <li>
                  <strong>Parceiros comerciais:</strong> quando o Usuário
                  contratar serviços de terceiros disponibilizados por meio da
                  plataforma, observado o consentimento e os termos específicos
                  aplicáveis;
                </li>

                <li>
                  <strong>Eventuais sucessores e afiliadas:</strong> em hipótese
                  de reorganização societária, fusão, aquisição ou venda de
                  ativos, nos termos permitidos por lei.
                </li>
              </ul>

              <p className="mt-2">
                <strong>5.2.</strong> Todos os compartilhamentos serão feitos
                observando-se o padrão de necessidade e proporcionalidade, e
                quando aplicável, mediante instrumentos que assegurem nível de
                proteção compatível ao previsto na legislação.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold">
                6. Transferência Internacional de Dados
              </h2>

              <p className="mt-2">
                Quando necessário, o Aplicativo poderá transferir dados pessoais
                para outros países. Tais transferências serão realizadas com
                base em garantias adequadas, tais como cláusulas contratuais
                padrão, decisões de adequação ou outras salvaguardas
                reconhecidas pela legislação aplicável.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold">7. Retenção de Dados</h2>

              <p className="mt-2">
                <strong>7.1.</strong> Os dados pessoais serão conservados pelo
                período necessário ao cumprimento das finalidades para as quais
                foram coletados, observadas obrigações legais e prazos fiscais e
                regulatórios.
              </p>

              <p className="mt-2">
                <strong>7.2.</strong> Após decurso do prazo de retenção
                aplicável, os dados serão eliminados ou anonimizados, salvo
                quando sua conservação for exigida ou autorizada por lei.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold">
                8. Segurança e Medidas de Proteção
              </h2>

              <p className="mt-2">
                <strong>8.1.</strong> Adotamos medidas técnicas e
                administrativas razoáveis destinadas a proteger os dados
                pessoais contra acesso não autorizado, alteração, divulgação ou
                destruição.
              </p>

              <p className="mt-2">
                <strong>8.2.</strong> Essas medidas incluem criptografia,
                controles de acesso, processos de segurança da informação e
                auditorias periódicas. Apesar dos esforços, nenhum procedimento
                elimina totalmente o risco de acesso indevido; por esse motivo,
                eventuais incidentes serão tratados conforme previsto na
                legislação e com comunicação aos titulares e autoridades quando
                aplicável.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold">
                9. Direitos dos Titulares
              </h2>

              <p className="mt-2">
                <strong>9.1.</strong> O Usuário titular dos dados pessoais terá,
                conforme aplicável e na forma da legislação vigente, os
                seguintes direitos:
              </p>

              <ul className="list-disc list-inside mt-2">
                <li>acesso aos dados;</li>

                <li>
                  correção de dados incompletos, inexatos ou desatualizados;
                </li>

                <li>
                  anonimização, bloqueio ou eliminação de dados desnecessários,
                  excessivos ou tratados em desconformidade com a lei;
                </li>

                <li>
                  revogação do consentimento, quando o tratamento estiver
                  baseado no consentimento;
                </li>

                <li>oposição ao tratamento, quando cabível;</li>

                <li>
                  informação sobre entidades públicas e privadas com as quais o
                  controlador tenha compartilhado dados.
                </li>
              </ul>

              <p className="mt-2">
                <strong>9.2.</strong> Para exercer seus direitos, o Usuário
                poderá utilizar os canais de contato previstos no Aplicativo. As
                solicitações serão atendidas em prazo razoável, observadas as
                exceções legais.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold">
                10. Tratamento de Dados de Crianças e Adolescentes
              </h2>

              <p className="mt-2">
                <strong>10.1.</strong> O Aplicativo não se destina ao uso por
                crianças menores de 18 (dezoito) anos sem a supervisão de pais
                ou responsáveis legais. Não coletamos intencionalmente dados
                pessoais de menores de idade sem o consentimento verificável dos
                pais ou responsáveis.
              </p>

              <p className="mt-2">
                <strong>10.2.</strong> Caso tomemos conhecimento de coleta
                inadvertida de dados de menores sem autorização, adotaremos
                medidas para a exclusão dos referidos dados, conforme a
                legislação aplicável.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold">
                11. Disposições sobre Encarregado (DPO)
              </h2>

              <p className="mt-2">
                Quando aplicável, o Aplicativo indicará um Encarregado pelo
                Tratamento de Dados (DPO) ou contato responsável por receber
                comunicações relacionadas à proteção de dados. As informações de
                contato serão disponibilizadas por e-mail.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold">
                12. Alterações desta Política
              </h2>

              <p className="mt-2">
                <strong>12.1.</strong> Reservamo‑nos o direito de alterar esta
                Política periodicamente. Mudanças significativas serão
                notificadas através de avisos na plataforma ou por e‑mail,
                conforme apropriado.
              </p>

              <p className="mt-2">
                <strong>12.2.</strong> A continuidade do uso do Aplicativo após
                a publicação das alterações implica na aceitação da versão
                atualizada.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">13. Contato</h2>

              <p className="mt-2">
                Para dúvidas, solicitações relativas aos seus dados pessoais ou
                exercício de direitos previstos nesta Política, entre em contato
                por meio dos canais disponibilizados no Aplicativo.
              </p>
            </section>

            <footer className="mt-6 text-sm text-gray-600">
              Última atualização: 14 de Agosto de 2025
            </footer>
          </article>
        </main>
      </div>
    </div>
  );
};
