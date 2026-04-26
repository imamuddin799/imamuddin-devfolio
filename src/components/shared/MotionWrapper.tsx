'use client';

import { motion, AnimatePresence } from 'motion/react';
import { type ReactNode } from 'react';

/* ── Page transition wrapper ─────────────────────────────── */
export function PageTransition({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    );
}

/* ── Fade in up (single item) ────────────────────────────── */
interface FadeUpProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export function FadeUp({ children, delay = 0, className }: FadeUpProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay, ease: 'easeOut' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ── Stagger container ───────────────────────────────────── */
interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
    staggerMs?: number; // ms between each child
}

const staggerVariants = {
    hidden: {},
    show: (staggerMs: number) => ({
        transition: { staggerChildren: staggerMs / 1000 },
    }),
};

const itemVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    show: {
        opacity: 1, y: 0, scale: 1,
        transition: { duration: 0.4, ease: 'easeOut' as const },
    },
};

export function StaggerContainer({ children, className, staggerMs = 80 }: StaggerContainerProps) {
    return (
        <motion.div
            variants={staggerVariants}
            custom={staggerMs}
            initial="hidden"
            animate="show"
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <motion.div variants={itemVariants} className={className}>
            {children}
        </motion.div>
    );
}

/* ── Scale in (for modals, panels) ──────────────────────── */
export function ScaleIn({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ── Hover card (wraps any card) ─────────────────────────── */
export function HoverCard({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ── Re-export AnimatePresence for convenience ───────────── */
export { AnimatePresence };