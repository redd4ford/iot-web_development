import React from 'react';
import { useDispatch } from 'react-redux';
import { toast, Toaster } from 'react-hot-toast';

import { addItem } from "../../../../api/store/Actions.js";

import "./PurchaseItemButton.css";

export default function PurchaseItemButton(props) {

    const dispatch = useDispatch();

    return (
        <>
        <button onClick={() => { dispatch(addItem(props));
                                    toast.success('Added to cart!');}}
                   className="item-purchase">Purchase</button>
                   <Toaster position="bottom-left" reverseOrder={false}
                   toastOptions={{
                        style: {
                          minWidth: '120px',
                        },
                        success: {
                          duration: 3500
                   }}}
                    />
        </>
        );
}
