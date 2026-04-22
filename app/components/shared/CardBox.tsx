"use client";
import { Card } from "../ui/card";

interface MyAppProps {
  children: React.ReactNode;
  className?: string;
}
const CardBox: React.FC<MyAppProps> = ({ children, className }) => {
  return (
    <Card className={`card border border-border ${className}`}
      style={{
        borderRadius: `7px`,
      }}
    >
      {children}
    </Card>
  );

};

export default CardBox;
