import { env } from '@/env';
import QRCode from 'react-qr-code';

export const ListingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-xl w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Baixe nosso app para ver este anúncio
        </h2>

        <div className="flex flex-col gap-4 mb-6">
          <a
            href={env.GOOGLE_PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <img
              src="/google-play-badge.png"
              alt="Baixar na Google Play"
              className="w-full max-w-[200px] mx-auto hover:opacity-90 transition"
            />
          </a>

          <a
            href={env.APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <img
              src="/app-store-badge.svg"
              alt="Baixar na App Store"
              className="w-full max-w-[200px] mx-auto hover:opacity-90 transition"
            />
          </a>
        </div>

        <div className="mt-6 hidden md:block">
          <p className="text-sm text-gray-600 mb-4">
            Escaneie o QR Code para baixar no celular
          </p>
          <div className="flex items-center justify-center gap-8">
            <div className="flex flex-col items-center">
              <div className="p-2 bg-white rounded-lg border shadow">
                <QRCode
                  value={env.GOOGLE_PLAY_URL || window.location.href}
                  size={128}
                />
              </div>
              <span className="text-xs text-gray-500 mt-2">Google Play</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="p-2 bg-white rounded-lg border shadow">
                <QRCode
                  value={env.APP_STORE_URL || window.location.href}
                  size={128}
                />
              </div>
              <span className="text-xs text-gray-500 mt-2">App Store</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
