interface SystemInfoIconProps {
  handleClick: () => void;
}

export const SystemInfoIcon = ({ handleClick }: SystemInfoIconProps) => {
  return (
    <img
      src="/favicon.png"
      alt="logo"
      className="w-6 h-6"
      onClick={() => handleClick()}
    />
  );
};
