import { motion } from "framer-motion";

const MotionWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} // Initial state
      animate={{ opacity: 1, y: 0 }} // Animate to this state
      exit={{ opacity: 0, y: -10 }} // Exit state
      transition={{ duration: 0.2 }} // Transition duration
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;
