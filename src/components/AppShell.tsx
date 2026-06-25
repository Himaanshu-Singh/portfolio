"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Preloader from "./Preloader";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Only show the preloader on the client — avoids server/client HTML mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  // On server (and first client paint before useEffect), render children fully visible
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      {!loaded && <Preloader onComplete={handleComplete} />}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
