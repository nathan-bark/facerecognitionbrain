import React from "react";

const Rank = ({userName, userEntries}) => {
    return (
        <div>
            <div className="white f3 centre">
               {`${userName} your current entry count is ... ${userEntries}`}
            </div>

        
        
        </div>
    )
}

export default Rank;