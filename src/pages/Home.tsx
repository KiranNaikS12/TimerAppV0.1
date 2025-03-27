import { useCallback, useEffect, useState } from 'react';
import { Plus, Clock } from 'lucide-react';
import { TimerList } from '../components/timers/TimerList';
import { Toaster } from 'sonner';
import Button from '../components/ui/Button';
import { ToastPosition } from '../types/positionProps';
import useThorttle from '../hooks/useThrottle';
import TimerModal from '../components/modals/TimerModal';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [position, setPosition] = useState<ToastPosition>(ToastPosition.TopRight); //Toast position..


  // Adds a scroll event listener to detect when the page exceeds 50px scroll, 
  const handleScroll = useThorttle(() => {
    setScrolled(window.scrollY > 50)
  }, 300)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // clear event
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  
  // Handling responsive toast position
  useEffect(() => {
    const updatePosition = () => {
      requestAnimationFrame(() => {
        setPosition(window.innerWidth < 768 ? ToastPosition.BottomRight : ToastPosition.TopRight);
      });
    };
    updatePosition()
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition)
    }
  }, [])
  

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev)
  }, [])

  

  return (
    <div className="min-h-screenbg-gradient-to-br from-gray-50 to-gray-100">

      {/* Made toast position responsive based on devices */}
      <Toaster richColors position={position} />
      <div className="container px-4 py-8 mx-auto">

        {/* Made the container sticky when content exceeds the viewport height*/}
        <div className={`sticky z-50 flex justify-between top-0 px-4 transition-all duration-300 ${scrolled ? "bg-white py-4" : "bg-white py-4"}`}>
          <div className="flex items-center gap-1 md:gap-3">
            <Clock className="text-blue-600 h-7 w-7 md:h-8 md:w-8" />
            <h1 className="text-xl font-bold text-gray-900 md:text-3xl">Timer</h1>
          </div>
          <Button onClick={toggleModal}
            title='Add Timer'
            label='Add Timer'
            className="flex items-center gap-2 px-3 py-2 text-white transition-colors bg-blue-600 rounded-lg shadow-md md:py-2 hover:bg-blue-700 hover:shadow-lg md:px-4"
            icon={<Plus className="w-5 h-5" />}
          />
        </div>

        <TimerList />

        <TimerModal
          isOpen={isModalOpen}
          onClose={toggleModal}
          mode="add" 
        />
      </div>
    </div>
  );
}

export default Home;