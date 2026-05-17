import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    Search,
    Send,
    Check,
    Scissors,
    User,
    Sparkles,
    Waves
} from "lucide-react";
import { cn } from "../lib/utils";

function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

export interface Action {
    id: string;
    label: string;
    icon: React.ReactNode;
    description?: string;
    price?: string;
}

const serviceActions: Action[] = [
    {
        id: "1",
        label: "Signature Haircut",
        icon: <Scissors className="h-4 w-4 text-primary" />,
        description: "Standard Fade/Cut",
        price: "PKR 3500",
    },
    {
        id: "2",
        label: "Royal Hot Towel Shave",
        icon: <User className="h-4 w-4 text-primary" />,
        description: "Classic Razor",
        price: "PKR 2500",
    },
    {
        id: "3",
        label: "Beard Sculpt & Trim",
        icon: <Sparkles className="h-4 w-4 text-primary" />,
        description: "Line Up",
        price: "PKR 1500",
    },
    {
        id: "4",
        label: "Charcoal Face Mask",
        icon: <Waves className="h-4 w-4 text-primary" />,
        description: "Deep Cleanse",
        price: "PKR 1200",
    },
    {
        id: "5",
        label: "Full Grooming Package",
        icon: <Check className="h-4 w-4 text-primary" />,
        description: "Hair + Beard + Shave",
        price: "PKR 6500",
    },
];

interface ActionSearchBarProps {
    onSelect: (action: Action) => void;
    selectedValue?: string;
}

export function ActionSearchBar({ onSelect, selectedValue }: ActionSearchBarProps) {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState<{ actions: Action[] } | null>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [selectedAction, setSelectedAction] = useState<Action | null>(
        serviceActions.find(a => a.label === selectedValue) || null
    );
    const debouncedQuery = useDebounce(query, 200);

    useEffect(() => {
        if (!isFocused) {
            setResult(null);
            return;
        }

        if (!debouncedQuery) {
            setResult({ actions: serviceActions });
            return;
        }

        const normalizedQuery = debouncedQuery.toLowerCase().trim();
        const filteredActions = serviceActions.filter((action) => {
            const searchableText = action.label.toLowerCase();
            return searchableText.includes(normalizedQuery);
        });

        setResult({ actions: filteredActions });
    }, [debouncedQuery, isFocused]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const container = {
        hidden: { opacity: 0, height: 0 },
        show: {
            opacity: 1,
            height: "auto",
            transition: {
                height: {
                    duration: 0.4,
                },
                staggerChildren: 0.05,
            },
        },
        exit: {
            opacity: 0,
            height: 0,
            transition: {
                height: {
                    duration: 0.3,
                },
                opacity: {
                    duration: 0.2,
                },
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 10 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.2,
            },
        },
        exit: {
            opacity: 0,
            y: -5,
            transition: {
                duration: 0.2,
            },
        },
    };

    const handleSelect = (action: Action) => {
        setSelectedAction(action);
        setQuery(action.label);
        setIsFocused(false);
        onSelect(action);
    };

    return (
        <div className="w-full relative">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search for a service..."
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                    className="w-full bg-transparent border-b border-white/10 py-3 pr-10 focus:outline-none focus:border-primary transition-all text-on-surface placeholder:text-white/20"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <AnimatePresence mode="popLayout">
                        {query.length > 0 ? (
                            <motion.div
                                key="send"
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 10, opacity: 0 }}
                            >
                                <Check className="w-4 h-4 text-primary" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="search"
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 10, opacity: 0 }}
                            >
                                <Search className="w-4 h-4 opacity-40" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <AnimatePresence>
                {isFocused && result && (
                    <motion.div
                        className="absolute top-full left-0 w-full z-[100] mt-2 glass rounded-xl border border-white/10 shadow-2xl overflow-hidden"
                        variants={container}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                    >
                        <div className="max-h-60 overflow-y-auto scrollbar-hide py-2">
                            {result.actions.length > 0 ? (
                                result.actions.map((action) => (
                                    <motion.div
                                        key={action.id}
                                        className={cn(
                                            "px-4 py-3 flex items-center justify-between cursor-pointer transition-colors",
                                            selectedAction?.id === action.id ? "bg-primary/20" : "hover:bg-white/5"
                                        )}
                                        variants={item}
                                        layout
                                        onClick={() => handleSelect(action)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center">
                                                {action.icon}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium">{action.label}</div>
                                                <div className="text-[10px] opacity-40 uppercase tracking-widest">{action.description}</div>
                                            </div>
                                        </div>
                                        <div className="text-xs font-mono text-primary">{action.price}</div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="px-4 py-8 text-center text-xs opacity-40">No services found</div>
                            )}
                        </div>
                        <div className="px-4 py-2 border-t border-white/5 bg-black/40 flex justify-between items-center">
                            <span className="text-[9px] uppercase tracking-widest opacity-40">Select your style</span>
                            <span className="text-[9px] uppercase tracking-widest opacity-40">ESC to Close</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
