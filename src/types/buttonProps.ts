import { ReactNode } from "react";

//Props for the reusable Button component.
export interface ButtonProps {
    onClick?: () => void;
    type?: "submit" | "reset" | "button";
    isOpen?: boolean;
    label?: string;
    className?: string;
    icon?: ReactNode;
    title?: string; 
}