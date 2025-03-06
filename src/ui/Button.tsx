

interface ButtonProps {
  title: string;
  icon?: React.ReactNode
  onClick: () => void;
  className?: string;
}

const Button = ({ title, icon, onClick, className }: ButtonProps) => {
  return (
    <section>
        <button
          onClick={onClick}
          className={`text-[#fff] dark:text-[#ccc] flex items-center gap-x-1 p-2 ${className}`}
        >
         {title}
         {icon && <span>{icon}</span>}
        </button>
    </section>
  );
};

export default Button;
