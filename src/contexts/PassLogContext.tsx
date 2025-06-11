import React, { createContext, useContext, useEffect, useState } from 'react';
import { checkPassLogHealthCheck } from '../apis/passApi';

export interface PassLogContextType {
  isPassLogAvailable: boolean;
  hasCheckedAvailability: boolean; 
  checkAccessLogAvailability: () => Promise<boolean>;  
  setIsPassLogAvailable: React.Dispatch<React.SetStateAction<boolean>>;
  setHasCheckedAvailability: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PassLogContext = createContext<PassLogContextType>({
  isPassLogAvailable: true, 
  hasCheckedAvailability: false, 
  checkAccessLogAvailability: async () => false,
  setIsPassLogAvailable: () => {},
  setHasCheckedAvailability: () => {},
});

export const PassLogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPassLogAvailable, setIsPassLogAvailable] = useState(false);
  const [hasCheckedAvailability, setHasCheckedAvailability] = useState(false); 

  const checkAccessLogAvailability = async (): Promise<boolean> => {
    try {
      await checkPassLogHealthCheck();
      setIsPassLogAvailable(true);
      setHasCheckedAvailability(true);
      return true;
    } catch (error) {
      console.error('<---출입 로그 사용 불가--->:', error);
      setIsPassLogAvailable(false);
      setHasCheckedAvailability(true);
      return false;
    }
  };

  useEffect(() => {
    const reloaded = sessionStorage.getItem('reloaded');
    
    if (reloaded === 'true') {
      console.log('새로고침 후 checkAccessLogAvailability 실행');
      checkAccessLogAvailability();
      sessionStorage.removeItem('reloaded');
    }

    const intervalId = setInterval(() => {
      checkAccessLogAvailability();
    }, 5000);

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'accessToken') {
        const token = event.newValue;
        if (token) {
          console.log('로그인 후 checkAccessLogAvailability 실행');
          checkAccessLogAvailability();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <PassLogContext.Provider
      value={{ 
        isPassLogAvailable, 
        hasCheckedAvailability,    
        checkAccessLogAvailability,
        setIsPassLogAvailable, 
        setHasCheckedAvailability,
      }}>
      {children}
    </PassLogContext.Provider>
  );
};

export const usePassLogContext = () => useContext(PassLogContext);