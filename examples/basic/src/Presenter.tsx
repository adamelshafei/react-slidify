import { Deck, PresenterConsole } from 'react-slidify';

// Open this page in another tab/window to act as the presenter view.
export default function Presenter() {
  return (
    <Deck>
      <PresenterConsole />
    </Deck>
  );
}

