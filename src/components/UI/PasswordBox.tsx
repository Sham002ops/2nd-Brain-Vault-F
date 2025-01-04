import  { useState } from 'react';

interface InputProps {
    placeholder: string;
    reference?: React.RefObject<HTMLInputElement>;
}

export function PasswordBox({ reference, placeholder }: InputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative">
            <input
                ref={reference}
                placeholder={placeholder}
                type={showPassword ? 'text' : 'password'}
                className="text-gray-700 outline-none bg-transparent border-2 border-purple-700 rounded-lg py-2 px-4 text-xl placeholder-gray-500 w-full"
            />
            <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            >
                {showPassword ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.372a9.993 9.993 0 0116.04 0m-1.4 7.256a9.992 9.992 0 01-13.24 0M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.372a9.993 9.993 0 0116.04 0m-1.4 7.256a9.992 9.992 0 01-13.24 0M9.75 15a3.001 3.001 0 004.5 0"
                        />
                    </svg>
                )}
            </button>
        </div>
    );
}
