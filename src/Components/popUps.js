// pop-ups
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const true_answer_popup = () => (
  <Popup trigger={<button> תודה</button>} position="right center">
    <div>Popup content here !!</div>
  </Popup>
);

