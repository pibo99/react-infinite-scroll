import { useEffect, useRef, useState } from "react";

interface Props {
  onBottomHit: () => void;
  isLoading: boolean;
  loadOnMount: boolean;
  children: any;
}

function hasHitBottom(ref: React.RefObject<HTMLDivElement>) {
  if (!ref.current) {
    return false;
  }
  return ref.current.getBoundingClientRect().bottom <= window.innerHeight;
}

function InfiniteScroll({
  onBottomHit,
  isLoading,
  loadOnMount,
  children,
}: Props) {
  const [initialLoad, setInitialLoad] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loadOnMount && initialLoad) {
      onBottomHit();
      setInitialLoad(false);
    }
  }, [onBottomHit, loadOnMount, initialLoad]);

  useEffect(() => {
    const onScroll = () => {
      if (!isLoading && hasHitBottom(contentRef)) {
        onBottomHit();
      }
    };
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, [onBottomHit, isLoading]);

  return <div ref={contentRef}>{children}</div>;
}

export default InfiniteScroll;
