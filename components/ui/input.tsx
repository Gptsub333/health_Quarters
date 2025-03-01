const cn = (...classes: (string | undefined)[]): string =>
    classes.filter(Boolean).join(" ");
  
  const Input = ({ className = "", ...props }: { className?: string } & React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
      <input
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-muted-foreground",
          className // ✅ This will always be a string now
        )}
        {...props}
      />
    );
  };
  
  export default Input;
  