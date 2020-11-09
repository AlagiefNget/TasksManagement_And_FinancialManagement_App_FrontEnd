import React from 'react';
import swal from "sweetalert";

export default class Utils {
   

    static getToday = () => {

        let date = new Date();
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        let yyyy = date.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        return yyyy + "-" + mm + "-" + dd;
    };

    static displayMessage = (icon, title, text) => {
        return swal({
            title: title,
            text: text,
            icon: icon,
            timer: 4000,
            buttons: false
        });
    };

}
