import React, { useState } from 'react';
import Popup from 'reactjs-popup';
//

const FalsePopup = (state, true_answer) => {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    return (
        <div>
            <button type="button" className="button" onClick={() => setOpen(o => !o)}>
                ?
            </button>
            <Popup
                open={open} 
                closeOnDocumentClick
                onClose={closeModal}
                modal
                onKeyPress={closeModal}
                onMouseDown={closeModal}
            >
            <span>
                התשובה הנכונה היא {true_answer}
            </span>
            </Popup>
        </div>
    );
};

export default FalsePopup;