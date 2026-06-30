import { motion } from "framer-motion";
import type { Children } from "../interfaces/auth";

export default function PageTransition ({ children }: Children) {

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            >
            {children}
        </motion.div>
    )
}