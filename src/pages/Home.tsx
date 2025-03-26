import { useCallback, useEffect, useState } from 'react';
import { Plus, Clock } from 'lucide-react';
import { TimerList } from '../components/timers/TimerList';
import { AddTimerModal } from '../components/modals/AddTimerModal';
import { Toaster } from 'sonner';
import Button from '../components/ui/Button';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  // Adds a scroll event listener to detect when the page exceeds 50px scroll, 
  // making the navbar sticky with a background change for better visibility.
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev)
  },[])

  return (
    <div className="min-h-screenbg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" />
      <div className="container px-4 py-8 mx-auto">

        {/* Made the container sticky when content exceeds the viewport height*/}
        <div className={`sticky z-50 flex justify-between top-0 px-4 py-3 transition-all duration-300 ${scrolled ? "bg-white shadow-lg py-5" : "bg-transparent"}`}>
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Timer</h1>
          </div>
          <Button onClick={toggleModal}
            title='Add Timer'
            label='Add Timer'
            className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg"
            icon={<Plus className="w-5 h-5"  />}
          />
        </div>

        <TimerList />

        <AddTimerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}

export default Home;