import { motion } from "framer-motion";

const MotionWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }} // Initial state
      animate={{ opacity: 1, x: 0 }} // Animate to this state
      exit={{ opacity: 0, x: -100 }} // Exit state
      transition={{ duration: 0.5 }} // Transition duration
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;
