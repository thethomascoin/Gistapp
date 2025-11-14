import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="sticky top-0 bg-white z-10 shadow-sm">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="flex items-center h-16">
          <h1 className="text-xl font-medium text-gray-900">
            {title}
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;