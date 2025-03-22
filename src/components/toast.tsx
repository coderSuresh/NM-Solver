'use client'

import React, { useEffect, useState } from 'react'
import { FaBell } from 'react-icons/fa'

const Toast = ({ title, is_danger, onHide }: { title: string, is_danger: boolean, onHide: () => void }) => {

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShow(false);
                onHide();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [show, onHide]);

    useEffect(() => {
        if (!title) setShow(false);
        else setShow(true);
    }, [title]);

    return (
        <button
            onClick={onHide}
            className={`
                fixed ${is_danger ? 'bg-red-800' : 'bg-green-800'}
                ${show ? 'right-4' : '-right-full'}
                 text-white px-6 py-4 border-0 rounded bottom-4 z-50 transition-all`}
        >
            <span className="text-xl inline-block mr-5 align-middle">
                <FaBell />
            </span>
            <span className="inline-block align-middle mr-8">
                <b className="capitalize">{title}</b>
            </span>
            <div className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none">
                <span>x</span>
            </div>
        </button>
    )
}

export { Toast }
