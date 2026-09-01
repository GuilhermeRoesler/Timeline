import { useState } from "react";

export const useEventsDetails = () => {
    const [isHovered, setIsHovered] = useState(false);

    return { isHovered, setIsHovered };
}