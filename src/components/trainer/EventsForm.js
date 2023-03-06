import { useEffect, useContext, useState } from 'react';
const EventsForm = (props) => {
    const [eventData, setEventData] = useState([]);
    const addAData = (e) => {
        let newdata = [...eventData, { year: "", award: "" }];
        setEventData(newdata);
    };
    return (
        <>
            <h1>Manage Events<i
                    className="fa fa-plus-circle text-success Adddetails"
                    onClick={addAData}
                /></h1>
        </>
    );
}
export default EventsForm;