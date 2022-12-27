import React, { useState, useEffect } from 'react';
import Utils from './../Utils';
import axios from 'axios';

const Footer = () => {
    const [list, setList] = useState({ loading: false, error: false, pageInfo: {}, data: [] });

    const fetchList = () => {
        setList({ ...list, loading: true })
        axios.get(Utils.apiUrl('sociallink/list'), Utils.apiHeaders())
            .then(res => {
                if (res.data.success) {
                    setList({ ...list, loading: false, error: false, pageInfo: res.data.pageInfo, data: res.data.data });
                } else {
                    setList({ ...list, loading: false, error: res.data.message, pageInfo: {}, data: [] });
                }
            })
    };

    useEffect(fetchList, []);

    return (<>
        <footer className="footer footerFixed">
            <div className="container-fluid">
                <ul className="footerLeft">
                    <li>Copyright © 2022 AUTODIDACT</li>
                    <li><a href={`${process.env.REACT_APP_PUBLIC_URL}/term-conditions`}>Terms</a></li>
                    <li><a href={`${process.env.REACT_APP_PUBLIC_URL}/privacy-policy`}>Privacy Policy</a></li>
                    <li><a href={`${process.env.REACT_APP_PUBLIC_URL}/cookie-policy`}>Cookie Policy</a></li>
                </ul>
                <ul className="footerRight">
                {list.data.map((record, idx) => <li key={idx}>
                    <a href={`${record.link}`} target="blank"><i className={`${record.class}`}></i></a>           
                </li>)}
                </ul>
            </div>
        </footer>

    </>

    );
};

export default Footer;