import { FiUser, FiMail, FiLock } from "react-icons/fi"; // Importando ícones

const FormInput = ({ label, type, name, value, onChange, placeholder, icon, className }) => {
  return (
    <div className="flex flex-col">
      <label className="text-white mb-2">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full p-2 pl-10 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        />
      </div>
    </div>
  );
};

export default FormInput;
