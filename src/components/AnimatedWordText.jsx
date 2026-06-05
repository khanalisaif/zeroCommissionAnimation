import { motion } from 'framer-motion'

export default function AnimatedWordText({ text, className }) {
  if (!text) return null
  
  const words = text.split(" ")
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.04 * i },
    }),
  }
  
  const child = {
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 } 
    },
    hidden: { 
      opacity: 0, 
      y: 30, 
      rotateX: -45,
    },
  }

  return (
    <motion.div 
      style={{ display: "inline-flex", flexWrap: "wrap", gap: "0.25em" }} 
      className={className} 
      variants={container} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: "-50px" }}
      style={{ perspective: "1000px" }}
    >
      {words.map((word, index) => (
        <motion.span 
          style={{ display: "inline-block", transformOrigin: "bottom" }}
          variants={child} 
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}
