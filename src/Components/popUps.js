import React, { useState } from 'react';
import Popup from 'reactjs-popup';
//

function FalsePopup(event,true_answer) {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    return (
        <Popup
            open={setOpen(o => event)}
            modal
            onKeyPress={closeModal}
            onMouseDown={closeModal}
        >
            <span>
                התשובה הנכונה היא {true_answer}
            </span>
        </Popup>
    );
};

export default FalsePopup;