import Image from "next/image";

type LogoProps = {
  size?: "base" | "large";
};

const classes = {
  base: "w-16 h-auto",
  large: "w-32 h-auto mb-14",
};

export const Logo = ({ size = "base" }: LogoProps) => {
  return (
    <Image
      src="/Uninassau_Logo.jpeg"
      alt="Logo da Uninassau"
      width={200}
      height={200}
      className={classes[size]}
    />
  );
};