import { useCallback, useState } from 'react';
import { Plus, Clock } from 'lucide-react';
import { TimerList } from '../components/timers/TimerList';
import { AddTimerModal } from '../components/modals/AddTimerModal';
import { Toaster } from 'sonner';
import Button from '../components/ui/Button';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev)
  },[])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" />
      <div className="container px-4 py-8 mx-auto">
        <div className='flex justify-between'>
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