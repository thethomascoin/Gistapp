import React from 'react';
import { X, Sparkles, Check } from 'lucide-react';

interface UpgradeModalProps {
  onClose: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center animate-slide-in-up">
        <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="text-white h-8 w-8" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800">Go Pro with Gist</h2>
        <p className="text-gray-600 mt-2">Unlock your full potential and never miss a thing.</p>

        <ul className="text-left space-y-3 mt-6 text-gray-700">
          <li className="flex items-center">
            <Checkmark /> Unlimited connected accounts
          </li>
          <li className="flex items-center">
            <Checkmark /> Unlimited Priority slots
          </li>
          <li className="flex items-center">
            <Checkmark /> Unlimited Library saves
          </li>
           <li className="flex items-center">
            <Checkmark /> Advanced AI search
          </li>
        </ul>

        <div className="mt-6 flex flex-col gap-2">
            <button className="w-full bg-brand-primary text-white font-medium py-3 rounded-full hover:opacity-90 transition-all shadow-lg shadow-indigo-500/30">
              Upgrade Now
            </button>
            <button onClick={onClose} className="w-full text-brand-primary font-medium py-3 rounded-full hover:bg-brand-primary/10 transition-colors">
              Maybe Later
            </button>
        </div>
      </div>
    </div>
  );
};

const Checkmark: React.FC = () => (
    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
        <Check className="w-3.5 h-3.5 text-green-600" strokeWidth={3} />
    </div>
);


export default UpgradeModal;