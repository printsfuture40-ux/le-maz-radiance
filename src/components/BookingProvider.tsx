import {
  createContext,
  lazy,
  Suspense,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const BookingDialog = lazy(() => import("./BookingDialog"));

type BookingContextValue = {
  open: (preselect?: string[]) => void;
};

const BookingContext = createContext<BookingContextValue>({ open: () => {} });

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [preselect, setPreselect] = useState<string[]>([]);

  const open = useCallback((services: string[] = []) => {
    setPreselect(services);
    setIsOpen(true);
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      {isOpen && (
        <Suspense fallback={null}>
          <BookingDialog open={isOpen} onOpenChange={setIsOpen} preselect={preselect} />
        </Suspense>
      )}
    </BookingContext.Provider>
  );
};
