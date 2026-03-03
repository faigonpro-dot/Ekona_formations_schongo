
import React from 'react';
import { EducationPath } from '../types';

interface MenuButtonProps {
  path: EducationPath;
  onClick: (path: EducationPath) => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ path, onClick }) => {
  return (
    <button
      onClick={() => onClick(path)}
      className="group relative flex flex-col items-center justify-center p-8 bg-white/10 border-2 border-white/20 rounded-3xl backdrop-blur-md shadow-2xl transition-all duration-300 hover:bg-white/20 hover:scale-[1.02] active:scale-95 text-white h-full min-h-[160px] text-center"
    >
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight group-hover:text-yellow-300 transition-colors uppercase">
          {path.title}
        </h2>
        <div className="h-1 w-12 bg-white/40 mx-auto rounded-full group-hover:w-24 transition-all duration-500"></div>
        <p className="text-lg md:text-xl font-medium opacity-90 leading-tight">
          {path.subtitle}
        </p>
      </div>
      
      {/* Decorative corner */}
      <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-100 transition-opacity">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </div>
    </button>
  );
};

export default MenuButton;
