import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Component() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-pink-500 to-orange-500 flex flex-col items-center justify-center p-4 text-white">
      <motion.h1 
        className="text-6xl md:text-8xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        2023 트렌드
      </motion.h1>
      <motion.p 
        className="text-xl md:text-2xl mb-12 text-center max-w-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        최신 웹 디자인 트렌드를 반영한 아름답고 현대적인 디자인으로 당신의 브랜드를 돋보이게 하세요.
      </motion.p>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 hover:bg-opacity-30 transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-4">그라데이션</h2>
          <p>부드럽고 다채로운 색상 전환으로 시각적 깊이를 더합니다.</p>
        </div>
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 hover:bg-opacity-30 transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-4">대담한 타이포그래피</h2>
          <p>강렬한 메시지 전달을 위한 대담하고 눈에 띄는 글꼴 사용.</p>
        </div>
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 hover:bg-opacity-30 transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-4">미니멀리즘</h2>
          <p>불필요한 요소를 제거하고 핵심에 집중하는 깔끔한 디자인.</p>
        </div>
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 hover:bg-opacity-30 transition-all duration-300">
          <h2 className="text-2xl font-semibold mb-4">마이크로 인터랙션</h2>
          <p>작은 애니메이션으로 사용자 경험을 향상시키는 디테일한 요소.</p>
        </div>
      </motion.div>
      <motion.button
        className="group bg-white text-purple-700 font-semibold py-3 px-6 rounded-full text-lg flex items-center transition-all duration-300 hover:bg-opacity-90"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        자세히 알아보기
        <ArrowRight className={`ml-2 transition-all duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
      </motion.button>
    </div>
  )
}
