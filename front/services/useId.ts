import { useParams } from 'react-router';

export default function useId() {
  const { id: idString } = useParams<{ id: string }>();
  if (!idString || Number.isNaN(+idString)) {
    return undefined;
  }
  return +idString;
}