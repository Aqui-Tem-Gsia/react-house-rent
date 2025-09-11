import { Link } from 'react-router-dom';

export const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl h-full w-full flex flex-col bg-white shadow-lg overflow-hidden">
        <div className="px-6 py-5 border-b fixed bg-white w-full max-w-3xl">
          <h1 className="text-2xl font-semibold">
            Termos e Condições de Uso do Aplicativo &ldquo;Aqui Tem&rdquo;
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Vigência: <span className="font-medium">14 de Agosto de 2025</span>
          </p>
        </div>

        <div className="p-6 h-full mt-[150px] leading-relaxed text-gray-700 text-justify">
          <article>
            <section className="mb-6">
              <h2 className="text-2xl font-semibold">1. Introdução</h2>

              <p>
                Estes Termos e Condições tem o objetivo de regular o acesso e a
                utilização do aplicativo "Aqui Tem", plataforma destinada à
                divulgação de oportunidades de vendas e locação de imóveis e
                vendas em geral, com o propósito de conectar vendedores,
                locadores, imobiliárias e proprietários interessados em vender,
                adquirir ou alugar bens e propriedades.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold">2. Cadastro e Conta</h2>

              <ol>
                <li className="mb-2">
                  <strong>2.1</strong> Para publicar anúncios, é necessário
                  realizar um cadastro. O usuário declara que as informações
                  prestadas são verdadeiras, completas e atualizadas,
                  responsabilizando‑se por quaisquer omissões ou inexatidões.
                </li>

                <li>
                  <strong>2.2</strong> O usuário é responsável pela guarda e
                  confidencialidade de suas credenciais de acesso, bem como por
                  todas as ações realizadas por meio de sua conta. Em caso de
                  suspeita de uso indevido, o usuário deverá comunicar o fato
                  imediatamente ao suporte do Aplicativo.
                </li>
              </ol>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold">
                3. Publicação de Anúncios
              </h2>

              <ol>
                <li className="mb-2">
                  <strong>3.1</strong> Ao submeter um anúncio, o usuário declara
                  possuir autorização legal para ofertar o imóvel e garante a
                  veracidade das informações e imagens publicadas. Os anúncios
                  deverão conter dados claros sobre preço, localização, estado
                  de conservação e condições de negociação.
                </li>

                <li className="mb-2">
                  <strong>3.2</strong> Os anúncios poderão ser submetidos a
                  processo de moderação, a critério do Aplicativo, para
                  verificação de conformidade com estas normas.
                </li>

                <li className="mb-2">
                  <strong>3.3</strong> Caso sejam identificadas irregularidades,
                  o Aplicativo poderá solicitar correções ao anunciante e
                  suspender a veiculação até que as providências sejam adotadas.
                </li>

                <li>
                  <strong>3.4</strong> O anunciante poderá editar ou remover seu
                  anúncio nos termos previstos pela plataforma, observado o
                  cumprimento de eventuais obrigações contratuais vigentes.
                </li>
              </ol>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold">4. Conteúdo Proibido</h2>

              <p>
                É vedada a publicação de conteúdo falso, enganoso,
                discriminatório, pornográfico, ilícito ou que viole direitos de
                terceiros, inclusive direitos de propriedade intelectual. O
                Aplicativo reserva‑se o direito de bloquear ou remover anúncios
                que infrinjam estas disposições, sem prejuízo de adotar outras
                medidas legais cabíveis.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold">
                5. Pagamentos, Faturamento e Reembolsos
              </h2>

              <p className="mb-3">
                Os serviços pagos oferecidos pelo Aplicativo — tais como a
                publicação de anúncios — serão descritos em páginas específicas,
                contendo preço, periodicidade de cobrança e condições
                aplicáveis.
              </p>

              <p className="mb-3">
                A contratação de serviços pagos implica autorização para
                cobrança por meios eletrônicos indicados no momento da
                contratação. Os valores poderão ser atualizados mediante
                comunicação prévia ao usuário, respeitadas as condições
                contratuais vigentes.
              </p>

              <p className="mb-3">
                Política de reembolso: salvo disposição em contrário no momento
                da contratação, pedidos de reembolso serão analisados caso a
                caso e observadas as regras específicas do serviço contratado.
                Taxas realizadas por intermediários de pagamento, impostos ou
                encargos aplicáveis poderão não ser reembolsáveis.
              </p>

              <p>
                O Aplicativo poderá utilizar prestadores de serviços de
                pagamento de terceiros. Ao efetuar pagamentos, o usuário
                concorda em fornecer informações verdadeiras de faturamento e
                aceita os termos desses provedores. Em caso de disputa de
                cobrança (chargeback), o usuário responde por eventual perda de
                acesso ao serviço enquanto a disputa estiver em curso.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold">
                6. Tratamento de Dados Pessoais e Privacidade
              </h2>

              <p className="mb-3">
                O Aplicativo trata dados pessoais em conformidade com a sua{' '}
                <Link to="/privacy-policy" className="text-blue-600 underline">
                  Política de Privacidade
                </Link>
                , disponível na plataforma. As informações coletadas visam,
                entre outras finalidades, viabilizar o cadastro e a autenticação
                de usuários, a publicação e gestão de anúncios, o processamento
                de pagamentos e a prestação de suporte técnico.
              </p>

              <p className="mb-3">
                <strong>Tipos de dados:</strong> poderemos tratar dados de
                identificação, contato, dados do imóvel (endereço,
                características, imagens), informações de pagamento e quaisquer
                documentos necessários para verificação de identidade ou
                titularidade, quando exigidos por lei ou por razões de
                segurança.
              </p>

              <p className="mb-3">
                <strong>Bases legais e compartilhamento:</strong> o tratamento
                ocorre com base em consentimento, execução de contrato e
                atendimento a obrigações legais. Dados poderão ser
                compartilhados com prestadores de serviço (hospedagem,
                processamento de pagamento, análise antifraude) e autoridades
                competentes quando exigido por lei. Sempre que houver
                transferência internacional de dados, medidas adequadas de
                proteção serão adotadas.
              </p>

              <p className="mb-3">
                <strong>Direitos do titular:</strong> o usuário tem direito de
                acessar, corrigir, portar, limitar ou solicitar a exclusão de
                seus dados pessoais, na forma prevista na legislação aplicável.
                Solicitações poderão ser formalizadas por meio dos canais de
                contato disponibilizados no Aplicativo.
              </p>

              <p>
                <strong>Segurança:</strong> adotamos medidas técnicas e
                administrativas razoáveis para proteger os dados contra acesso
                não autorizado, perda ou divulgação indevida. Apesar disso,
                nenhum sistema é absolutamente infalível; em caso de incidente
                relevante, comunicaremos os titulares e autoridades competentes
                conforme exigido por lei.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold">
                7. Propriedade Intelectual
              </h2>

              <p>
                Todo o conteúdo, design, marcas e código do Aplicativo pertencem
                aos seus respectivos titulares. Ao submeter conteúdos (textos e
                imagens), o usuário concede ao Aplicativo uma licença não
                exclusiva, livre de royalties, para exibir, reproduzir e
                distribuir tal conteúdo enquanto o anúncio estiver ativo,
                conforme necessário para a prestação do serviço.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold">
                8. Isenção de Garantias
              </h2>

              <p>
                O Aplicativo é fornecido "no estado em que se encontra", sem
                garantias expressas ou implícitas. Não garantimos a precisão,
                integridade ou adequação dos anúncios ou a idoneidade de
                anunciantes. Recomenda‑se diligência prévia nas negociações
                entre particulares.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold">
                9. Limitação de Responsabilidade
              </h2>

              <p>
                Na extensão máxima permitida pela legislação aplicável, o
                Aplicativo não será responsável por danos indiretos, especiais,
                incidentais ou consequenciais decorrentes do uso ou da
                impossibilidade de uso da plataforma, ainda que avisado da
                possibilidade desses danos.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold">
                10. Suspensão e Encerramento
              </h2>

              <p>
                O Aplicativo poderá, a seu critério ou por ordem judicial,
                suspender ou encerrar contas e remover anúncios em caso de
                violação a estes Termos, às leis aplicáveis ou por motivos de
                segurança. Em caso de encerramento por infração, o usuário
                poderá perder o acesso a seus dados, observadas as obrigações
                legais de retenção.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold">11. Indenização</h2>

              <p>
                O usuário concorda em indenizar e isentar o Aplicativo, suas
                afiliadas e representantes de quaisquer reclamações, perdas,
                responsabilidades e despesas decorrentes do uso do serviço ou de
                violação destes Termos.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold">
                12. Alterações nos Termos
              </h2>

              <p>
                Reservamo‑nos o direito de alterar estes Termos. Mudanças
                significativas serão comunicadas por meio de notificação na
                plataforma e/ou por e‑mail. O uso continuado do Aplicativo após
                a publicação das alterações implicará aceitação das novas
                condições.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold">
                13. Lei Aplicável e Foro
              </h2>

              <p>
                Estes Termos são regidos pelas leis da República Federativa do
                Brasil. Para dirimir eventuais litígios, elegem as partes o foro
                da comarca do domicílio da parte demandada, salvo disposição
                legal em contrário.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">14. Contato</h2>

              <p>
                Dúvidas ou solicitações relacionadas a estes Termos e ao
                tratamento de dados podem ser encaminhadas por meio dos canais
                de suporte disponibilizados no Aplicativo.
              </p>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
};
